/**
 * Created by DELL on 3/9/2015.
 */

angular.module('posApp').controller('homeCtrl',['$scope','$state', function ($scope,$state) {
    $scope.slides = [
        {
            id: 1,
            label: '',
            image: 'img/ved.jpg'
        },
        {
            id: 2,
            label: '',
            image: 'img/arun.jpg'
        },
        {
            id: 3,
            label: '',
            image: 'img/chris.jpg'
        },
        {
            id: 4,
            label: '',
            image: 'img/rick.jpg'
        }
    ];

    $scope.register = function (){
        $state.go('signup');
    };
    $scope.login = function (){
        $state.go('login')
    }
}
]);