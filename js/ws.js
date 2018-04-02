let SESSION_INFO = {};
let counterMessage = 10;
var SESSION_HASH = $.cookie('session_hash');
let isLoginPage = window.location.href.indexOf("login") > -1;
let SHOW_LOG_MSG = true,
    STOP_socket = false,
    socket_URL = "ws://localhost:8081",
    socket,
    msg,
    LOCAL = true,
    countM = 1000,
    TIMEOUT_RECONNECT = 5000; // время переподключения к сокетам


if(window.location.href.indexOf("localhost") > -1) {
    socket_URL = "ws://localhost:8081";
    LOCAL = true;
}
else if(window.location.href.indexOf("89.31.33.164") > -1){
    socket_URL = "ws://89.31.33.164:8081";
    LOCAL = false;
}

function checkSession() {
    if(!$.cookie('session_hash') && !isLoginPage) {
        SESSION_INFO = {};
        window.location.href='../html/login.html';
    }
}
function webSocket() {
    if (STOP_socket) {
        return;
    }
    socket = new WebSocket(socket_URL);
    socket.onerror = function (...e) {
        console.error('socket ERROR::', e);
    };
    socket.onclose = function (...e) {
        console.info('%csocket CLOSE', 'color: #ff0910', '\nevent', e);
        setTimeout(webSocket, TIMEOUT_RECONNECT);
    };
    socket.onmessage = function (msg) {
        if (SHOW_LOG_MSG) {
            console.groupCollapsed('MSG IN', msg.data.length);
            console.log(msg.data);
            console.groupEnd();
        }
        msg = JSON.parse(msg.data);
        if (msg.Query === "SystemUpdate") { // обновление данных
            MSG.onUpdate(msg);
        } else if (msg.Error.Code !== 0) { // ошибка
            MSG.onError(msg);
        } else {
            MSG.onMessage(msg);
        }
    };
    socket.onopen = function () {
        console.info('socket OPENED', socket_URL);
        if(SESSION_HASH && !isLoginPage) MSG.request.SessionInfo();
    };

    socket.stop = function (time) {
        STOP_socket = true;
    }
}
let getIDMsg = ++countM;
let MSG = {
    get: {}, request: {}, close: {}, set: {}
    , handlersList: {} // storage handlers
    , errorHandlerList: {} // storage handlers
    , storeMSG: {}
    , promiseList: {}
    , clean: function (IdMessage) {
        delete MSG.handlersList[IdMessage];
        delete MSG.errorHandlerList[IdMessage];
        delete MSG.storeMSG[IdMessage];
    }, onUpdate: function (msg) {
        for (let i in msg.Tables) {
            MSG.update(msg.Tables[i]);
        }
    }, onError: function (msg) {

        console.group('%cMSG ERROR::><><%c' + msg.Error.title, 'color: red', 'color: #017200');
        console.groupCollapsed('ERROR: full text');
        console.groupEnd();
        delete MSG.promiseList[msg.IdMessage];
        MSG.clean(msg.IdMessage);
        switch (msg.Error.Code){
            case 1: alert("Неверный логин или пароль"); break;
            default: break;
        }

    }, onMessage: function (msg) {

        let promises = [];
        if (MSG.handlersList[msg.IdMessage]) {
            let table = msg.Tables, _table = {}, j, i;
            for (i in table) {
                if (!_table[table[i].Name]) {
                    _table[table[i].Name] = [];
                }

                _table[table[i].Name].push(table[i].Data);


            }
            for (i in _table) {
                if (MSG.handlersList[msg.IdMessage][i]) {
                    promises = promises.concat(MSG.handlersList[msg.IdMessage][i](_table[i]));
                }
            }
        }

        if (MSG.promiseList[msg.IdMessage]) {
            if (promises.length !== 0) {
                Promise.all(promises)
                    .then(function () {
                        MSG.promiseList[msg.IdMessage].resolve(msg);
                        delete MSG.promiseList[msg.IdMessage];
                    })
            } else {
                MSG.promiseList[msg.IdMessage].resolve(msg);
                delete MSG.promiseList[msg.IdMessage];
            }
        }

        if (SHOW_LOG_MSG) {
            console.groupEnd();
        }

        MSG.clean(msg.IdMessage);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    , send: function (option, promise) {
        checkSession();

        let IDMsg = counterMessage++ , i;

        let JSONstruct = JSON.stringify(option.table);
        if (SHOW_LOG_MSG) {
            console.group("%cMSG SEND::::>>>>%c" + IDMsg, 'color: blue', 'color: #444100');
            console.log('option', option.table);
            console.info(JSONstruct);
            console.groupEnd();
        }

        try {
            socket.send(JSONstruct);
            MSG.storeMSG[IDMsg] = {send: option.table, stack: new Error().stack};
        } catch (error) {
            console.error('ОШИБКА', error.message);
        }


        if (option.handler) {
            MSG.handlersList[IDMsg] = {};
            for (i in option.handler) {
                MSG.handlersList[IDMsg][i] = option.handler[i];
            }
        }

        MSG.errorHandlerList[IDMsg] = option.errorHandler;
        MSG.promiseList[IDMsg] = promise;

        // setTimeout(_checkClean, 2000, IDMsg);  // TEST LINE(S) ////////////////////////
    }
};

