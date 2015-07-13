/**
 * Created by ved on 10/7/15.
 */


var app = angular.module('posApp');
app.controller('splashCtrl',['$scope','$timeout','$state', function ($scope,$timeout,$state) {
    $scope.top_margin = (window.screen.availHeight/2) ;// + (152);

    $timeout(function () {
        $state.go('home');
    },4000)
}
]);