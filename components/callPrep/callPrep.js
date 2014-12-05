app.directive('callPrep' , function(){
    return {
        templateUrl: "components/callPrep/dir-call-prep.html",
        link: function(scope, element, attrs) {
            scope.callprepdata = attrs.data;
        }
    }
});

