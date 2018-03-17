
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

