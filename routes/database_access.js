/**
 * Created by Alex on 1/7/2016.
 */
//var usersJSON = require(__dirname + "\\..\\users.json");

var mysql = require("mysql");
var sql = mysql.createConnection({
    host: 'localhost',
    user: 'server_admin',
    password: 'banana',
    database: 'server_logins'
});
sql.connect();

function generateCode()
{
    var code = "";
    for (var i = 1; i <= 5; i++)
    {
        code += String.fromCharCode((Math.random() * 26 ) + 97);
    }
    return code;
}

module.exports = {
    login: function (username, password, socket_id, callback)
    {
        //login logic
        sql.query('SELECT * FROM users', function (err, rows, data)
            {
                if (!err)
                {
                    for (var i = 0; i < rows.length; i++)
                    {
                        if (rows[i].username === username && rows[i].password === password)
                        {
                            //save login to sql
                            console.log('login: ' + username);
                            var code = generateCode();
                            callback(false, rows[i].telegramID, code);
                            //save code for reply
                            sql.query('INSERT INTO logins VALUES (?,?,NOW(),?)', [username, code, socket_id], function (err, results)
                            {
                                if (err)
                                {
                                    console.log(err);
                                }
                            });
                            return;
                        }
                    }
                }
                callback(true);
            }
        )
        ;

    },
    verifySecondFactor: function (username, code, callback)
    {
        sql.query('SELECT * FROM logins WHERE sent>DATE_SUB(NOW(),INTERVAL 10 MINUTE)', function (err, rows)
        {
            if (!err)
            {
                for (var i = 0; i < rows.length; i++)
                {
                    if (rows[i].username === username && rows[i].code === code)
                    {
                        console.log("OK");
                        callback(false, "AccessCode");
                        return;
                    }
                }
                console.log("Failed Login");
            }
            callback(true);
        });
    },
    logout: function (username)
    {

    },
    logVisitor: function (socket_id, ip)
    {
        sql.query('INSERT INTO visitors values (?,?,NOW())', [socket_id, ip], function (err)
        {
            if (err)
            {
                console.log(err);
            }
        });
    },
    logBadLogin: function (socket_id, user, pass)
    {
        sql.query('INSERT INTO failed_logins VALUES (?,?,?,NOW())', [socket_id, user, pass], function (err)
        {
            if (err)
            {
                console.log(err);
            }
        });
    },
    logBad2FA: function (socket_id, user, input_key)
    {
        sql.query('INSERT INTO failed_2fa VALUES (?,?,?,NOW())', [socket_id, user, input_key], function (err)
        {
            if (err)
            {
                console.log(err);
            }
        });
    }
};