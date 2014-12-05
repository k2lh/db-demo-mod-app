app.directive('industryAndMarket' , function(){
    return {
        templateUrl: "components/industryAndMarket/dir-industry-and-market.html",
        link: function(scope, element, attrs) {
            scope.industryandmarketdata = attrs.data;
        }
    }
});

