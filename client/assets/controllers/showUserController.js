app.controller('showUserController', ['userFactory', 'itemFactory', '$scope', '$location', '$cookies', '$routeParams', function(userFactory, itemFactory, $scope, $location, $cookies, $routeParams){

  console.log('show user controller loaded');

  $scope.users = {};

  var index = function(){
    var cookies = $cookies.getAll();
    // console.log('cookies: ', cookies);
    if (!('uid' in cookies)){
      $location.url('/')
      console.log('user not logged in');
    } else {
      var userCookie = $cookies.get('uid');
      // console.log(userCookie);
      var showUser = function(id){
        userFactory.show(id, function(data){
          $scope.user = data.data;
          // console.log('data is:', data.data);
        })
      };

      var showItems = function(id){
        itemFactory.index(id, function(data){
          $scope.items = data.data.items;
          console.log('all the items:', data.data.items);
        });
        if ($routeParams.id == $cookies.get('uid')){
          $scope.notUser = false;
          console.log($scope.notUser);
        } else {
          $scope.notUser = true;
          console.log($scope.notUser);
        }
      }


      showUser($routeParams.id);
      showItems($routeParams.id);
    }
  }

  index();

  $scope.updateItem = function(id){
    // console.log(id);
    itemFactory.update(id, function(data){
      $scope.item = data.data;
      console.log('data is: ', data.data);
    })
    index();
  }

  $scope.logoutUser = function(){
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) { $cookies.remove(k); });
    $location.url('/');
  }

}])
