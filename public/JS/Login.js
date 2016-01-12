/**
 * Created by rossc on 1/8/2016.
 */

(function(){
    var app = angular.module('LoginScreen',[]);

    app.controller('LoginController', function(){

        this.loginScreen = true;

        this.username = "asdf";
        this.password = "test";
        this.twoFactorID = "";

        this.loginButtonClick = function(){
            console.log(this.username + " " + this.password);

            //TODO: Check to make sure the username and password is valid
            //For now assume its true

            this.loginScreen = false;
        }

        this.twoFactorIDButtonClick = function(){
            console.log(this.twoFactorID);

            //TODO: Check to make sure 2FA is correct
            //For now assume its true
        }
    });



})();
