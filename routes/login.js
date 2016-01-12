/**
 * Created by Alex on 1/7/2016.
 */

var TOKEN = "163143750:AAHtdMlXL5Moq5Cx64tYm46JzKP-F892XaQ";

var telegram = require("node-telegram-bot-api");

var bot = new telegram(TOKEN, {polling: true});

module.exports = function (socket, dataSource)
{

    socket.on('/login', function (data)
    {
        console.log(data);
        dataSource.login(data.username, data.password, function (err, telegramID, code)
        {
            if (!err)
            {
                bot.sendMessage(telegramID, code);
                socket.server_user = data.username;
                socket.emit("/setOneOK", {'result': true});
                return;
            }
            socket.emit("/setOneOK", {"result": false});
        });
    });

    socket.on('/twofactor', function (data)
    {
        console.log("text:" + data.code);
        dataSource.verifySecondFactor(socket.server_user, data.code, function (err, accessCode)
        {
            if (!err)
            {
                socket.emit("/AccessCode", {"access_code": accessCode});
            }
        });
    });

    socket.on('disconnect', function (data)
    {
        console.log('Disconnected from: ' + socket.handshake.address);
        dataSource.logout();
    });
};