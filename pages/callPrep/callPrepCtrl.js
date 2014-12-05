app.controller('callPrepCtrl', ['$scope', '$stateParams', '$state',
    function callPrepCtrl($scope, $stateParams, $state) {
        $scope.title = "D&B Direct Call Prep";
        $scope.about = {
              useCase: "Sales, Marketing, Supply Chain Management",
              description: "At geran okoedoms picotom sek, benodi lejonol mimesed om gid, si get degolan kopol.  Igo do degans ocedols seimik. Te ilelilom loveflano matikom tem.",
              permalink: "static-link-to-page-goes-here",
              tags: [
                  { name: 'Call Prep Questions', val: 'callPrep'},
                  { name: 'Financial Summary', val: 'financialSummary'},
                  { name: 'Industry Insight', val: 'industryInsight'}
              ]
        };
    }
]);
