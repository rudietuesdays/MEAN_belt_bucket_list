var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
  .when('/index', { templateUrl: 'partials/login.html'})
	.when('/dashboard', {templateUrl:'partials/dashboard.html'})
  .when('/users/:id', {templateUrl:'partials/user.html'})
  .otherwise({
    redirectTo: '/index'
  });
// Routes to load your new and edit pages with new and edit controllers attached to them!
});
