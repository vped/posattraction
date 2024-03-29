// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'posApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('posApp', ['ionic','ui.router','ionic.service.push','ionic.service.core']);

app.run(function($ionicPlatform,$state,$ionicViewService,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
    $ionicPlatform.registerBackButtonAction(function (event) {

        if (($state.$current.name == "home")) {
            alert('hi');

            var confirmPopup = $ionicPopup.confirm({
                title: 'PosAttraction',
                template: 'Exit APP?',
                okText: 'Yes',
                cancelText: 'No'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    navigator.app.exitApp();
                } else {
                    return false;
                }
            });
        }
    })
});

app.config(['$ionicAppProvider', function($ionicAppProvider) {
    // Identify app
    $ionicAppProvider.identify({
        // The App ID (from apps.ionic.io) for the server
        app_id: '',
        // The public API key all services will use for this app
        api_key: '',

        // Set the app to use development pushes
        dev_push: true

        // The GCM project number
        //gcm_id: ''

    });
}]);


app.config(function( $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

      .state('/', {
          url: "/",
          templateUrl: "templates/splash.html",
          controller:'splashCtrl'
      })

      .state('login', {
          url: "/login",
          templateUrl: "templates/login.html",
          controller:'loginCtrl'
      })

      .state('dash', {
          url: "/dashboard",
          templateUrl: "templates/posattraction.html",
          controller:'posCtrl'

      })

      .state('signup', {
        url: "/signup",
        templateUrl: "templates/sign-up.html",
        controller:'signupCtrl'
      })

      .state('profile', {
        url: "/two",
        templateUrl: "templates/profile.html",
        controller:'screenTwoCtrl'
      })

      .state('three', {
        url: "/three",
        templateUrl: "templates/screen3.html",
        controller:'screenThreeCtrl'
      })

      .state('four', {
        url: "/four",
        templateUrl: "templates/screen4.html",
        controller:'screenFourCtrl'
      })

      .state('five', {
        url: "/five",
        templateUrl: "templates/screen5.html",
        controller:'screenFiveCtrl'
      })

      .state('home', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller:'homeCtrl'
      })


  $urlRouterProvider.otherwise("/");

});
