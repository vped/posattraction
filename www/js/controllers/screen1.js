angular.module('posApp')
       .controller('screenOneCtrl',['$scope', function ($scope) {

            $scope.pageTitle='screen One';
            $scope.user = {};

            $scope.submit = function(user) {
              console.log('User Data', user);
            };
}
]);
