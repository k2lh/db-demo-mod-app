app.controller('callPrepCtrl', ['$scope', '$http', '$localStorage', 'layerFactory', 
    function callPrepCtrl($scope, $http, $localStorage, layerFactory ) {
        $scope.add = 'call prep question layer';
        $scope.layerThing = layerFactory.thing;
        $scope.addThing = function(thing) {
            var addToArray=true;
            for(var i=0;i<$scope.layerThing.length;i++){
                if($scope.layerThing[i]===thing) {
                    addToArray=false;
                }
            }
                if(addToArray){
                    layerFactory.thing.push(thing); 
                }
        };         
    }
]);
