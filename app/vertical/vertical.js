'use strict';

angular.module('myApp.vertical', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/vertical', {
    templateUrl: 'vertical/vertical.html',
    controller: 'VerticalCtrl'
  });
}])
.controller('VerticalCtrl',function(){


});

function SchemaClass(){

}
