app.directive('financialContacts' , function(){
    return {
        templateUrl: "components/financialContacts/dir-financial-contacts.html",
        link: function(scope, element, attrs) {
            scope.finacialcontactsdata = attrs.people
        }
    }
});

