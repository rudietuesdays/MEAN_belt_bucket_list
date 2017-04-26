app.controller('dashboardController', ['userFactory', 'itemFactory', '$scope', '$location', '$cookies', '$routeParams', function(userFactory, itemFactory, $scope, $location, $cookies, $routeParams){

  console.log('dashboard controller loaded');

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

      var showUsers = function(){
        userFactory.index(function(data){
          $scope.users = data.data.users;
          console.log('all the users:', data.data.users);
        })
      }

      var showItems = function(id){
        itemFactory.index(id, function(data){
          $scope.items = data.data.items;
          console.log('all the items:', data.data.items);
        });
      }


      showUser(userCookie);
      showUsers();
      showItems($cookies.get('uid'));
    }
  }

  index();

  $scope.createItem = function(id){

    itemFactory.create(id, $scope.newItem, function(data){
      if (data.data.errors){
        console.log('errors: ', data.data);
        $scope.errors = data.data.errors;
        $scope.newItem = {};
      } else {
        $scope.errors = ""
        $scope.newItem = {};
        console.log('new item created: ', data);
        $location.url('/dashboard');
      }
    })
    index()
  }

  $scope.updateItem = function(id){
    // console.log(id);
    itemFactory.update(id, function(data){
      $scope.item = data.data;
      console.log('data is: ', data.data);
    })
  }

  $scope.logoutUser = function(){
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) { $cookies.remove(k); });
    $location.url('/');
  }

}])
