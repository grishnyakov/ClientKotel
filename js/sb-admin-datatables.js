// Call the dataTables jQuery plugin
var tableDevices;
var tableMessages;

$(document).ready(function() {
   tableDevices = $('#dataTable').DataTable({
        language: {
            "url": "../vendor/datatables/Russian.json"
        },
        columns: [
            { title: "Номер устройства" },
            { title: "Тип" },
            { title: "Доступность" },
            { title: "Уведомления" },
            { title: "Действие" }
        ],

    });

    tableMessages = $('#dataTableMessages').DataTable({
        language: {
            "url": "../vendor/datatables/Russian.json"
        },
        columns: [
            { title: "Номер устройства" },
            { title: "Тип" },
            { title: "Дата Время" },
            { title: "Показание 1" },
            { title: "Показание 2" },
            { title: "Показание 3" },
            { title: "Показание 4" },
            { title: "Показание 5" },
            { title: "Показание 6" },
        ],

    });
});
