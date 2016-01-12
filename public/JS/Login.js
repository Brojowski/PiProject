/**
 * Created by rossc on 1/8/2016.
 */

(function ()
{
    var app = angular.module('LoginScreen', []);

    app.controller('LoginController', ['$scope',"service", function ($scope,service)
    {
        $scope.loginScreen = true;

        $scope.username = "Broj";
        $scope.password = "blowme";
        $scope.twoFactorID = "";
        $scope.loginError=false;
        $scope.twoFactorIDError=false;

        $scope.loginButtonClick = function ()
        {
            //Check to make sure the username and password is valid
            if ($scope.username != null && $scope.password != null)
            {
                service.login($scope.username, $scope.password, function (data)
                {
                    if (data.result)
                    {
                        //turns off the login screen and shows two factor auth
                        console.log("Login Success");
                        $scope.loginScreen = false;
                        $scope.$apply();
                    }else
                    {
                        console.log("Login Failed");
                        //TODO(Chris): Show an error message
                        $scope.loginError=true;
                    }
                });
            }
        };

        $scope.twoFactorIDButtonClick = function ()
        {
            //Check to make sure 2FA is correct
            if($scope.twoFactorID != null)
            {
                service.twoFA($scope.twoFactorID,function(data)
                {
                    if (!data.err)
                    {
                        //TODO(Alex): continue on, login success
                        console.log('2nd Factor Success');
                    }else
                    {
                        //TODO(Chris): show 2FA failed
                        console.log('2nd Factor Failed');
                        $scope.twoFactorIDError=false;
                    }
                });
            }
        };
    }]);
})();
