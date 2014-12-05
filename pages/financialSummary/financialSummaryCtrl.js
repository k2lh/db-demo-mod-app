app.controller('financialSummaryCtrl', ['$scope', '$stateParams', '$state',
    function financialSummaryCtrl($scope, $stateParams, $state) {
        $scope.title = "D&B Direct Financial Summary";
        $scope.about = {
              useCase: "Risk Manager, Credit Manager, Sales",
              description: "Du muhe ture hals du. Neues was mag gluck hut her allen. Fehlen te machte ri spinat du lehnte im mutter kinder. Stadtchen verwegene plotzlich zuschauer bekannten er so.",
              permalink: "static-link-to-page-goes-here",
              tags: [
                  { name: 'Call Prep Questions', val: 'callPrep'},
                  { name: 'Company Insight', val: 'companyInsight'},
                  { name: 'Industry Insight', val: 'industryInsight'}
              ]
        };
    }
]);
