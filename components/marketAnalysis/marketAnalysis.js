app.directive('marketAnalysis' , function(){
    return {
        templateUrl: "components/marketAnalysis/dir-market-analysis.html",
        link: function(scope, element, attrs) {
            scope.marketanalysisdata = attrs.data;
        }
    }
});

