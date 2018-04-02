$(document).ready(function () {
    webSocket();
    $('.signin').click(function () {
        let login = $('#inputEmail').val();
        let password = $('#inputPassword').val();

        let struct = {
            IdMessage: counterMessage,
            Table: "auth",
            Mode: "in",
            Values: [login,password],
            Type: "SELECT",
            Limit: 1
        };

        MSG.send( {
            table: [struct], handler: { auth: MSG.get.SessionHash} //получаю сессию
        } );
    });

    MSG.get.SessionHash = function (data) {
        console.log("i recive Session info:",data);
        if(data[0]){
            let hash;
            if(data[0].hash) {
                hash = data[0].hash;
            }
            else if(data[0][0].hash){
                hash = data[0][0].hash;
            }
            if(hash) {
                $.cookie('session_hash',hash);
                window.location.href='../html/index.html';
            }

        }else {
            alert("Ошибка аавторизации","Неверный логин или пароль");
        }
    };
});


