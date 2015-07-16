angular.module('posApp')
       .controller('signupCtrl',['$scope','$state','$ionicPopup', function ($scope,$state,$ionicPopup) {

            $scope.pageTitle='screen One';
            $scope.user = {};

            $scope.submit = function(user) {
              console.log('User Data', user);
                var popup = $ionicPopup.alert({
                    title: 'Welcome',
                    template: 'Welcome to PosAttraction. Login to access your account'
                });
                $state.go('login');
            };

        $scope.goBack = function () {
            $state.go('home');
        }
        $scope.gosignIn = function () {
            $state.go('login');
        }
}
]);
