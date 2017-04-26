app.controller('loginController', ['userFactory','$scope','$location', '$cookies', '$routeParams', function(userFactory, $scope, $location, $cookies, $routeParams) {
  console.log('in login controller');

  $scope.loginUser = function(){
    console.log('user entered info:', $scope.user);
    if ($scope.user == undefined) {
      $scope.login_error = "Enter a name";
    } else {
      $scope.login_error = "";
      userFactory.login($scope.user, function(data){
        // console.log('data is', data);
        if(data.data.errors){
          $scope.login_error = data.data.errors.name.message;
        } else if (data.data == null) {
          $scope.login_error = 'something went wrong'
        } else {
          $cookies.put('uid', data.data._id);
          var userCookie = $cookies.get('uid');
          console.log('user id in cookie:', userCookie);
          $scope.user = {};
          $location.url('/dashboard');
        }
      })
    }
  }

}]);
