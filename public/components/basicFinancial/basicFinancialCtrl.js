app.controller('basicFinancialCtrl', ['$scope', '$localStorage', 'storageFactory', 'companyService',
    function basicFinancialCtrl($scope, $http, $localStorage, storageFactory, companyService) {
        $scope.duns = storageFactory.duns;
        $scope.$watch('dunsThis', function(val){
            console.log('duns=' + $scope.dunsThis);
            console.log('val=' + val);
            companyService.get($scope.dunsThis).then(function(data){
                $scope.basic = data.summary.basicFinancialInformation;
                $scope.netIncome = getCurr($scope.basic.latestYearNetIncome.netIncome);
                $scope.sales = getCurr($scope.basic.latestYearSales.sales);

                // for style, just show first four exchanges
                var len = $scope.basic.exchanges.length;
                if (len > 4) {
                    $scope.quanShow = len - 4;
                }
                $scope.quantity = 4;
            });
        });
    }
]);
