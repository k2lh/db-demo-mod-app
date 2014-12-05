app.directive('incomeStatements' , function(){
    return {
        templateUrl: "components/incomeStatements/dir-income-statements.html",
        link: function(scope, element, attrs) {
            scope.incomestatementdata = attrs.data;
        }
    }
});
