app.directive('companySearch' , function(){
    return {
        templateUrl: "components/companySearch/dir-company-search.html",
        link: function(scope, element, attrs) {
            scope.companysearchdata = attrs.data;
        }
    };
});
