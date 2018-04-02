/**
 * Created by Sergio on 02.04.2018.
 */

MSG.request.SessionInfo = function () {
    let message_toserver = {
        IdMessage: counterMessage,
        Table: "auth",
        Mode: "check",
        Values: [SESSION_HASH],
        Type: "SELECT",
        Limit: 1
    };

    MSG.send( {
        table: [message_toserver] , handler: { auth: MSG.get.SessionInfo}
    } );

};
MSG.get.SessionInfo = function (data) {
    if(data[0].code == 0){
        SESSION_INFO = data[0];
        console.log(data);
    }
    else { //ошибка сессии
        $.cookie("session_hash","");
        checkSession();
    }
};