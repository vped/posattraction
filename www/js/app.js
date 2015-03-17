// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'posApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('posApp', ['ionic','ui.router','homeApp','loginApp','screen1App','screen2App','screen3App','screen4App','screen5App'])

app.run(function($ionicPlatform) {
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
});
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

      .state('/', {
        url: "/",
        templateUrl: "templates/posattraction.html",
        controller:'posCtrl'
      })

      .state('one', {
        url: "/one",
        templateUrl: "templates/screen1.html",
        controller:'screenOneCtrl'
      })

      .state('two', {
        url: "/two",
        templateUrl: "templates/screen2.html",
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

      .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller:'loginCtrl'
      });

  $urlRouterProvider.otherwise("/");

})


//app.config(function($stateProvider, $urlRouterProvider) {
//
//  // Ionic uses AngularUI Router which uses the concept of states
//  // Learn more here: https://github.com/angular-ui/ui-router
//  // Set up the various states which the app can be in.
//  // Each state's controller can be found in controllers.js
//  $stateProvider
//
//  // setup an abstract state for the tabs directive
//
//    .state('posattraction', {
//    url: "/",
//     //template:'<h1>heelooo there</h1>'
//    templateUrl: "templates/posattraction.html",
//    controller:'posCtrl'
//  })
//
//  //.state('login', {
//  //  url: "/login",
//  //      template:'<h1>heelo there</h1>',
//  //  //templateUrl: "templates/login.html",
//  //  controller:'loginCtrl'
//  //})
//  //
//  //.state('home', {
//  //  url: "/home",
//  //  abstract: true,
//  //  templateUrl: "templates/home.html",
//  //  controller:'homeCtrl'
//  //});
//
//  $urlRouterProvider.otherwise('/');
//
//});
