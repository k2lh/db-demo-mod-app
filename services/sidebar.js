app.directive('sidebar' , function(){
    return {
        templateUrl: "views/sidebar.html",
        link: function(scope, element, attrs) {
            scope.data = attrs.data;
        }
    };
});
