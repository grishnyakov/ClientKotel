/**
 * Created by Sergio on 02.04.2018.
 */
var devices; //устройства юзера
function Device(id,type) {
    this.id = id;
    this.type = type;
}

Device.list = [];



MSG.request.request_devices = function () {
    let message_toserver = {
        IdMessage: counterMessage,
        Table: "devices",
        Mode: "IdUsersArray",
        Values: [SESSION_INFO.user_id],
        Type: "SELECT",
        Limit: 100
    };

    MSG.send( {
        table: [message_toserver], handler: { devices: MSG.get.devices}
    } );
};
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


MSG.set.register_device = function (number,password) {
    checkSession();
    let message_toserver = {
        IdMessage: counterMessage,
        Table: "devices",
        Mode: "register",
        Values: [SESSION_INFO.user_id,number,password],
        Type: "UPDATE",
        Limit: 100
    };

    MSG.send( {
        table: [message_toserver] , handler: { devices: MSG.get.register_device}
    } );

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