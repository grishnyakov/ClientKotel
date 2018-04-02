/**
 * Created by Sergio on 02.04.2018.
 */

var messages;
function Message(params) {
    this.params = params;
}

Message.list = [];

MSG.request.messages = function () {
    let array_devices = [];
    for(let index in Device.list) {
        array_devices.push(Device.list[index].params.id);
    }

    let message_toserver = {
        IdMessage: counterMessage,
        Table: "messages",
        Mode: "IdDeviceArray",
        Values: array_devices,
        Type: "SELECT",
        Limit: 100
    };
    MSG.send( {
        table: [message_toserver], handler: { messages: MSG.get.messages}
    } );
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