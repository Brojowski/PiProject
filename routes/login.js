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
        dataSource.login(data.username, data.password, socket.id, function (err, telegramID, code)
        {
            if (!err)
            {
                bot.sendMessage(telegramID, code);
                socket.server_user = data.username;
                socket.emit("/setOneOK", {'result': true});
            }
            else
            {
                socket.emit("/setOneOK", {"result": false});
                dataSource.logBadLogin(socket.id,data.username,data.password);
            }
        });
    });

    socket.on('/twofactor', function (data)
    {
        console.log("text:" + data.code);
        dataSource.verifySecondFactor(socket.server_user, data.code, function (err, accessCode)
        {
            if (!err)
            {
                socket.emit("/AccessCode", {"err": false, "access_code": accessCode});
            }
            else
            {
                socket.emit("/AccessCode", {"err": true});
                dataSource.logBad2FA(socket.id,socket.server_user,data.code);
            }
        });
    });

    socket.on('disconnect', function (data)
    {
        console.log('Disconnected from: ' + socket.handshake.address);
        dataSource.logout();
    });
};