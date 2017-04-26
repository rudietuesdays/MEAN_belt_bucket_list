app.factory('userFactory', ['$http', function($http) {
  console.log('in user factory');
  var users = [];
  var user = {};
  var factory = {};

  factory.login = function(user, callback){
    $http.post('/login', user)
    .then(function(returned_data){
      if(typeof(callback)== 'function'){
        callback(returned_data);
        if(returned_data.errors){
          console.log('ERRORS: ', returned_data.data);
        } else {console.log('returned data: ', returned_data);}
      }
    })
  }

  factory.show = function(uid, callback){
    $http.get('/users/' + uid)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
      }
    })
  }

  factory.index = function(callback){
    $http.get('/users')
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
        // console.log(returned_data);
      }
    })
  }

  return factory;
}]);
