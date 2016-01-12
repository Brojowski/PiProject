/**
 * Created by Alex on 1/11/2016.
 */
(function(){
    var app = angular.module("LoginScreen");

    app.factory("service",[function(){
        var socket = io.connect();
        return {
            login:function(user,pass){
                socket.emit('/login',{"username":user,"password":pass});
            },
            twoFA:function(code){
                socket.emit('/twofactor',{"code":code});
            }
        }
    }]);
})();