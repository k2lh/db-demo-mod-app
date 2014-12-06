app.factory('companyService', function($http){
  return {
      get: function(duns) {
        return $http.get('/direct1-proxy/company/' +  duns);
      }
   }
});
