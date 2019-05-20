(function () {
    'use strict';

    angular.module('app')
        .config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/', {redirectTo: '/signin'})
                .when('/dashboard/:nomeJogador', {templateUrl: 'dashboard/dashboard.html', controller: 'DashboardCtrl', controllerAs : "vm"})
                .when('/signin', {templateUrl: 'auth/signin.html', controller: 'AuthCtrl', controllerAs : "vm"})
                .when('/forgot-password', {templateUrl: 'auth/forgot-password.html', controller: 'AuthCtrl'})
                .when('/signup', {templateUrl: 'auth/signup.html', controller: 'AuthCtrl'})
                .when('/404', {templateUrl: 'shared/404.html'})
                .otherwise({ redirectTo: '/404'});

        }]
    );

})(); 