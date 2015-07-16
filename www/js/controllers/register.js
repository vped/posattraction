angular.module('posApp')
       .controller('signupCtrl',['$scope','$state','$ionicPopup','$http', function ($scope,$state,$ionicPopup, $http) {

            $scope.pageTitle='screen One';
            $scope.user = {};

            $scope.submit = function(user) {

                $http({
                    method: 'POST',
                    url: 'http://localhost:3030/api/users',
                    crossDomain: true,
                    data: "user="+ JSON.stringify(user),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
                    success(function (data, status, headers, config) {
                        console.log("Loaded user",data);
                        var popup = $ionicPopup.alert({
                            title: 'Welcome',
                            template: 'Welcome to PosAttraction. Login to access your account'
                        });
                        $state.go('login');
                    }).
                    error(function (data, status, headers, config) {
                        console.log(data);
                        $scope.findData = data;
                        //$scope.user = "Hello user";
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };

        $scope.goBack = function () {
            $state.go('home');
        }
        $scope.gosignIn = function () {
            $state.go('login');
        }
}
]);
