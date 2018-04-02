/**
 * Created by Sergio on 02.04.2018.
 */

var messages;
function Message(id,dev_id) {
    this.id = id;
    this.dev_id = dev_id;

}

Message.list = [];

MSG.request.request_messages = function () {
    let array_devices = [1234567890];
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