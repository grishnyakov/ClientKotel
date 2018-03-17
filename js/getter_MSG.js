var devices; //устройства юзера
var messages;

MSG.get.devices = function (data) {
    console.log("i recive devices:",data);
    devices = data[0];
    tableDevices.data().clear()
    if(devices) {
        for(let dev in devices){
            let row = [devices[dev].id,devices[dev].id_type,'-','-','-'];
            tableDevices.row.add(row).draw(false)
        }
    }


};

MSG.get.messages = function (data) {
    messages = data[0];
    if(messages) {

        tableMessages.data().clear();

            for(let i in messages){
                let row = [
                    messages[i].id_dev,
                    0,
                    messages[i].dt,
                    messages[i].data1,
                    messages[i].data2,
                    messages[i].data3,
                    messages[i].data4,
                    messages[i].data5,
                    messages[i].data6
                    ];
                tableMessages.row.add(row).draw(false)
            }

    }
    console.log("i recive messages:",data)
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

MSG.get.register_device = function (data) {
    data = data[0];
    console.log(data);
    if(data.status === "ERROR")
    {
        alert(data.description);
    }
    else if(data.status === "OK"){
        alert("Устройство успешно привязано к пользователю");
        $("#addDeviceModal").modal('hide');
        MSG.request.request_devices();
    }
};

