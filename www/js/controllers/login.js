/**
 * Created by DELL on 3/9/2015.
 */

angular.module('posApp').controller('loginCtrl',['$scope','$location','$http','$state', function ($scope, $location, $http,$state) {
    $scope.pageTitle='LOGIN PAGE';
    $scope.user = {};
    $scope.findData = {};

    $scope.login = function(user){
        $http({
                method: 'POST',
                url: 'http://localhost:3030/login',
                data: "user="+ JSON.stringify(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                success(function (data, status, headers, config) {
                    console.log("Loaded user",data);
                     $scope.findData = data;
                     $location.path('/dashboard');
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    $scope.findData = data;
                    //$scope.user = "Hello user";
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        //ChatsFac.chatLogin($scope.user).
        //    success(function (data) {
        //        console.log('hi',data);
        //
        //    }).
        //    error(function (data) {
        //        console.log('error',data);
        //    });


        if(user.passw === 'sahni'){
            $location.path('/dashboard');
        }
    };

    $scope.goBack = function () {
        $state.go('home');
    }
    $scope.gosignIn = function () {
        $state.go('signup');
    }

}
]);
