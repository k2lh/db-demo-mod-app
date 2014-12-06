app.controller('industryInsightCtrl', ['$scope', '$stateParams', '$state',
    function industryInsightCtrl($scope, $stateParams, $state) {
        $scope.title = "D&B Direct Industry Insight";
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
