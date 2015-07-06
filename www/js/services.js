
angular.module('posApp').factory('ChatsFac', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
    var chatFactory = {};

    chatFactory.chatLogin = function (req,res) {
        return $http.post('http://localhost:3000/auth/signin', req);
    };

    return chatFactory;

    //$http({
    //    method: 'POST',
    //    url: 'http://localhost:3000/auth/signin',
    //    data: "username=" + 'bharat'+"&password=" + 'bharat123',
    //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //}).
    //    success(function (data, status, headers, config) {
    //        console.log(data);
    //        $scope.user = data;
    //        // this callback will be called asynchronously
    //        // when the response is available
    //    }).
    //    error(function (data, status, headers, config) {
    //        console.log(data);
    //        $scope.user = "Hello user";
    //        // called asynchronously if an error occurs
    //        // or server returns response with an error status.
    //    });
});
