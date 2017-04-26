angular.module('descubraManaus')
.config(function ($stateProvider, $urlRouterProvider) {
    // setup states
    $stateProvider
            .state('app', {
                url : '/app',
                templateUrl : 'partials/menu.html',
                abstract: true,
                controller: 'menuCtrl'
            })
            .state('welcome', {
                url: "/welcome",
                templateUrl: "partials/welcome.html",
                controller: 'welcomeCtrl'
            })
            .state('app.listagem', {
                url : '/listagem',
                views : {
                    'menuContent' : {
                        templateUrl: "partials/listagem.html",
                        controller: 'listagemCtrl'
                    }
                }
            })
            .state('app.dashboard', {
                url : '/dashboard',
                views : {
                    'menuContent' : {
                        templateUrl: "partials/dashboard.html",
                        controller: 'dashboardCtrl'
                    }
                }
            })
            .state('app.detalhes', {
                url : '/detalhes',
                views : {
                    'menuContent' : {
                        templateUrl: "partials/detalhes.html",
                        controller: 'detalheCtrl'
                    }
                }
            });
    // default route           
    $urlRouterProvider.otherwise("/welcome");

});