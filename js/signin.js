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
        let hash = data[0][0].hash;
        if(hash != undefined){
            $.cookie('session_hash',data[0][0].hash);
            window.location.href='../html/index.html';
        }

    }else {
        alert("Ошибка аавторизации","Неверный логин или пароль");
    }
};