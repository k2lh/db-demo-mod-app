/*global angular: false, alert: false*/

var app = angular.module('app', [
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'ui.router',
    'ngAnimate',
    'ngRoute',
    'ngStorage',
    'Scope.onReady'
    ])
.config(function($routeProvider) {
    $routeProvider
        .when('/financialSummary', {
            templateUrl: 'pages/financialSummary/financialSummary.html',
            controller: 'financialSummaryCtrl'
        })
        .when('/callPrep', {
            templateUrl: 'pages/callPrep/callPrep.html',
            controller: 'callPrepCtrl'
        })
        .when('/companyInsight', {
            templateUrl: 'pages/companyInsight/companyInsight.html',
            controller: 'companyInsightCtrl'
        });

})
.run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
]);

// declaring globals because hack hack hack hack demo
var map;
var coName;
var apiBaseUrl = '/';





