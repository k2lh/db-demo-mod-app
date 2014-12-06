app.controller('companyInsightCtrl', ['$scope', '$stateParams', '$state',
    function companyInsightCtrl($scope, $stateParams, $state) {
        $scope.title = "D&B Direct Company Insight";
        $scope.about = {
              useCase: "Sales, Marketing, Supply Chain Management",
              description: "This description goes in the sidebar. Probably a sentence or two, not much.",
              tags: [
                  { name: 'Call Prep Questions', val: 'callPrep'},
                  { name: 'Financial Summary', val: 'financialSummary'},
                  { name: 'Industry Insight', val: 'industryInsight'}
              ]
        };
    }
]);
