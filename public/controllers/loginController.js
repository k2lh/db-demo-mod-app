app.controller( 'loginController', function HomeCtrl ( $scope, $state, $localStorage ) {
    $scope.widgets = [
        { name: 'Call Prep Questions', val: 'callPrep'},
        { name: 'Company Insight', val: 'companyInsight'},
        { name: 'Financial Summary', val: 'financialSummary'},
        { name: 'Industry Insight', val: 'industryInsight'}
    ]
    $scope.$storage.user = $localStorage.user;
//    $scope.$storage.user = {};

    $scope.setUser = function() {
        var user = {
            widget: $scope.aWidget,
            name:  $scope.name,
            pwd: $scope.pwd,
            key: $scope.key
        };
        $scope.$storage.user = user;
        $state.go($scope.aWidget.val);
    };

});
