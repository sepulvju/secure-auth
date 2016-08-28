var arya = angular.module('arya', ['ngMaterial']);

arya.service('showAlertSrvc', ['$timeout', function($timeout) {
  return function(delay) {
    var result = {hidden:true};
    $timeout(function() {
      result.hidden=false;
    }, delay);
    return result;
  };
}]);

arya.controller('messageController', ['$scope','showAlertSrvc',function($scope, showAlertSrvc){
   $scope.message = showAlertSrvc(5000);
   $scope.err = showAlertSrvc(5000);
}]);

arya.controller('redirectController', ['$scope',function($scope){
   $scope.gotoURL = function(){
     window.location.pathname = "/users/register";
   };
}]);

arya.controller('formController', ['$scope',function($scope){
  $scope.remember = {is:"false"};
  $scope.isRemember = function(){
    if($scope.remember.is == "false"){
      $scope.remember.is = "true";
    }else{
      $scope.remember.is = "false";
    }
  };
}]);
