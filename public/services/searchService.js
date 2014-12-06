app.factory('searchService', function($http){
  return {
      get: function(duns) {
        return $http.get('/direct1-proxy/search/company/' +  duns);
      }
   }
});
