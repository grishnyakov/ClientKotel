webSocket();

// отправить сообщение из формы
$('#refreshDevicesBtn').click(function () {
    MSG.request.request_devices();
});
$('#refreshMessagesBtn').click(function () {
    MSG.request.request_messages();
});


$('.add_new_device').click(function () {
    let login = $('#InputNumberDevice').val();
    let pass = $('#InputPassDevice').val();
    if(login !== "")
        MSG.set.register_device(login, pass);
});


$('#signOut').click(function () {

    let struct = {
        IdMessage: counterMessage,
        Table: "auth",
        Mode: "out",
        Values: [SESSION_HASH],
        Type: "SELECT",
        Limit: 1
    };

    MSG.send( {
        table: [struct]
    } );
    SESSION_HASH = "";
    SESSION_INFO = {};
    window.location.href = "../html/login.html";
});



function refreshMessages() {
    let dev_id = $('#dev_id')[0].valueAsNumber;
    MSG.request.request_messages();
};

// показать сообщение в div#subscribe
function showMessage(message, mode) {
    if (mode == 'error') alert("ОШИБКА!: " + message);
    else alert(message);
}

$('.nav-link').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');

    $('.main-content').empty(); //чистка

    switch (+this.id) {
        case 1:
            openMyDevices();
            break;
        case 2:
            openMessages();
            break;
    }
});

function openMyDevices() {

}   //показать настройки мои устройства
function openMessages() {
    console.log("Messages");
    let content = `

    <input type="number" id="dev_id" value="" placeholder="1234567890">    
    <input type="button" id="messagesBtn" value="Обновить показатели датчиков" onclick="refreshMessages()">    
        <div class="row">
                        <div class="col-12">
                            <div class="">
                            <table class="table table-striped messagesTable">
                                <thead>
                                <tr>
                                    <th>Устройство</th>
                                    <th>Значение 1</th>
                                    <th>Значение 2</th>
                                    <th>Значение 3</th>
                                    <th>Значение 4</th>
                                    <th>Время</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>`;
    $('.main-content').append(content);
}    //показать сообщений от устройств
