app.factory('itemFactory', ['$http', function($http){

  var items = [];
  var item = {};
  var factory = {};

  factory.create = function(id, newItem, callback){
    console.log(id, newItem);
    $http.post('/'+id+'/items', newItem)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
      }
    })
  }

  factory.index = function(id, callback){
    $http.get('/'+ id +'/items')
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
        // console.log(returned_data);
      }
    })
  };

  factory.update = function(id, callback){
    console.log(id);
    $http.put('/items/' + id)
    .then(function(returned_data){
      if(typeof(callback) == 'function'){
        callback(returned_data);
        // console.log(returned_data);
      }
    })
  }

  return factory;
}])
