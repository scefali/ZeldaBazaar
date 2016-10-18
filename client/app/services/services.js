angular.module('zeldaBazaar.services', [])

.factory('Store', function ($http) {
  var getItems = function() {

    return $http({
      method: 'GET',
      url: '/api/store'
    })
    .then( function (resp) {
      console.log('data', resp.data);
      return resp.data;
    }, function (err) {
      console.log('getItems error', err);
    });
  };

  var getInvetory = function() {
    return $http({
      method: 'GET',
      url: '/api/invetory'
    })
    .then( function (resp) {
      console.log('invetory data', resp.data);
      return resp.data;
    }, function (err) {
      console.log('getInvetory error', err);
    });
  }

  var buyOne = function(itemName) {
    return $http({
      method: 'POST',
      url: '/api/store',
      data: {name: itemName}
    })
    .then(function(resp) {
      return resp;
    });
  };

  var getWallet = function() {
    return $http({
      method: 'GET',
      url: '/api/wallet'
    })
    .then( function (resp) {
      console.log('wallet data', resp.data);
      return resp.data.rupees;
    }, function (err) {
      console.log('getWallet error', err);
    });
  }

  return {
    getItems: getItems,
    buyOne: buyOne,
    getInvetory: getInvetory,
    getWallet: getWallet
  };
  // Your code here
})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.zeldaBazaar');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.zeldaBazaar');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
