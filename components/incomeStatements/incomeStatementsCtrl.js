app.controller('incomeStatementsCtrl', ['$scope', '$http', '$localStorage', 'storageFactory', 'financialSummaryService',
    function incomeStatementsCtrl($scope, $http, $localStorage, storageFactory, financialSummaryService ) {
        $scope.$watch('dunsThis', function(val){
            financialSummaryService.get($scope.dunsThis).then(function(data){
                console.log(data);
                $scope.annual = data.annualIncomeStatements;
                $scope.quarterly = data.quarterlyIncomeStatements;
                $scope.annualrev = [{
                    "key" : storageFactory.name,
                    "values" : [
                        [ $scope.annual.previousYears[3].year , $scope.annual.previousYears[3].revenue] ,
                        [ $scope.annual.previousYears[2].year , $scope.annual.previousYears[2].revenue] ,
                        [ $scope.annual.previousYears[1].year , $scope.annual.previousYears[1].revenue] ,
                        [ $scope.annual.previousYears[0].year , $scope.annual.previousYears[0].revenue] ,
                        [ $scope.annual.latestYear.year , $scope.annual.latestYear.revenue]
                    ]
                }];
                $scope.data2 = $scope.data2.concat($scope.annualrev);
            });
        });
    }
]);
