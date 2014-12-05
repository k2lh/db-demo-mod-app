app.controller( 'mainController', [ '$scope', '$state', '$localStorage', '$http', '$location', 'storageFactory',
    function mainController ( $scope, $state, $localStorage, $http, $location, storageFactory ) {

    $scope.$prepareForReady();
    $scope.$storage = $localStorage;
    $scope.selection = false;

    // set up some controller-wide variables, uglyyyyy
    var annual1;
    var annual2;
    var annual3;
    $scope.data2 = [];
    $scope.data3 = [];
    $scope.data4 = [];
    $scope.data5 = [];
    $scope.data6 = [];

    // showDisplay is for toggling
    $scope.displayed = false;
    $scope.toggle = function() {
        $scope.displayed = !$scope.displayed;
    };

    // show/hide callPrep section
    $scope.seeCallPrep = false;
    $scope.togCall = function() {
        $scope.seeCallPrep = !$scope.seeCallPrep;
    };

    // turn people on & off
    $scope.havePeople = false;
    $scope.togPeople = function() {
        $scope.havePeople = !$scope.havePeople;
    };

    // starting over
    $scope.startOver = function() {
        $scope.selection = false;
        $state.go($scope.$storage.user.widget.val);
    };

    /** ------ now to get into meat of things ----------- **/

    // check the url to see if this is direct link
    var url = $location.absUrl();
    var thing = _.str.strRight(url, '?d=');
    var getNum = isNumber(thing);
    // if there was nothing in the url, run the lookup
    if (getNum == false ) {
        $scope.getCompany = function(val) {
            storageFactory.duns = val;
            $http.get('json/search-company.json')
            .success(function(data) {
                renameDollar(data);
                $scope.results = data.resultSet.hit;
//             $scope.results = data.FindCompanyResponse.FindCompanyResponseDetail.FindCandidate;
            });
        };
    } else {
        storageFactory.duns = thing;
        $scope.dunsThis = thing;
    }

    // get the company
    $scope.pickOne = function(val){
        $scope.dunsThis = val;
        $scope.duns = val;
    };

    $scope.$watch('dunsThis', function(){
        storageFactory.duns = $scope.dunsThis;
        var val = $scope.dunsThis;
        $http.get('json/duns-103391843.json')
        .success(function(whois) {
             renameDollar(whois);

            $scope.whois = whois;
            $scope.coName = $scope.whois.name;
            storageFactory.name = $scope.coName;
            coName = $scope.coName;
            $scope.indNum = $scope.whois.industries.primaryDnBIC;

            // this adds the call prep info, once we have industry #
            if ($scope.indNum != 'undefined') {
                var indNum = $scope.indNum;
                $http.get('json/call-prep.json')
                .success(function(results) {
                   renameDollar(results);
                   $scope.callFact = results.fastFacts.fastFact;
                   $scope.callTalk = results.executiveTalkingPoints.talkingPoint;
                   $scope.callCha = results.keyBusinessChallenges.challenge;
                   $scope.callOpp = results.keyBusinessOpportunities.opportunity;
                });
            };

            storageFactory.lon = $scope.whois.locations.location[0].longitude;
            storageFactory.lat = $scope.whois.locations.location[0].latitude;

            // this is to make things show up now that we've got info
            $scope.selection = true;
        })
        .then(function() {

        $http.get('json/summary.json')
        .success(function(results) {
            renameDollar(results);
            storageFactory.summary = results;

            $scope.market = results.marketAnalysis.morningStar;
            $scope.indmarket = results.comparisonToIndustryAndMarket;

            $scope.topComp = results.topCompetitors;

            // set up data2 for graphs


            $scope.comp1 = results.topCompetitors.competitor1.companyName;
            $scope.comp1sales = getCurr($scope.topComp.competitor1.annualSales);
            $scope.comp1cap = getCap($scope.topComp.competitor1.marketCap);

            $scope.comp2 = results.topCompetitors.competitor2.companyName;
            $scope.comp2sales = getCurr($scope.topComp.competitor2.annualSales);
            $scope.comp2cap = getCap($scope.topComp.competitor2.marketCap);

            $scope.comp3 = results.topCompetitors.competitor3.companyName;
            $scope.comp3sales = getCurr($scope.topComp.competitor3.annualSales);
            $scope.comp3cap = getCap($scope.topComp.competitor3.marketCap);

            /** TODO: set up factory to hold data & create these steps outside controller **/
            // data for comparison graph
            $scope.data1 = [
                {
                    "key": "Company",
                    "color": "#2AC8A9",
                    "values": [
                        { "label" : "Price/Sales", "value" : $scope.indmarket.company.priceSalesRatio } ,
                        { "label" : "Price/Earnings",  "value" : $scope.indmarket.company.priceEarningRatio } ,
                        { "label" : "Price/Book", "value" : $scope.indmarket.company.priceBookRatio } ,
                        { "label" : "Price/Cash Flow", "value" : $scope.indmarket.company.priceCashFlowRatio }
                    ]
                },
                {
                    "key": "Industry Median",
                    "color": "#EDC44B",
                    "values": [
                        { "label" : "Price/Sales", "value" : $scope.indmarket.industryMedian.priceSalesRatio } ,
                        { "label" : "Price/Earnings",  "value" : $scope.indmarket.industryMedian.priceEarningRatio } ,
                        { "label" : "Price/Book", "value" : $scope.indmarket.industryMedian.priceBookRatio } ,
                        { "label" : "Price/Cash Flow", "value" : $scope.indmarket.industryMedian.priceCashFlowRatio }
                    ]
                },
                {
                    "key": "Market Median",
                    "color": "#715EA2",
                    "values": [
                        { "label" : "Price/Sales", "value" : $scope.indmarket.marketMedian.priceSalesRatio } ,
                        { "label" : "Price/Earnings",  "value" : $scope.indmarket.marketMedian.priceEarningRatio } ,
                        { "label" : "Price/Book", "value" : $scope.indmarket.marketMedian.priceBookRatio } ,
                        { "label" : "Price/Cash Flow", "value" : $scope.indmarket.marketMedian.priceCashFlowRatio }
                    ]
                }
            ];

            // set up for horizontal bar charts (which includes ability to reflect negative values)
            $scope.options1 = {
                chart: {
                    type: 'multiBarHorizontalChart',
                    height: 450,
                    margin: {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 155
                    },
                    x: function(d){return d.label;},
                    y: function(d){return d.value;},
                    showControls: true,
                    showValues: true,
                    transitionDuration: 500,
                    tooltips: false,
                    xAxis: {
                        showMaxMin: false
                    },
                    yAxis: {
                        axisLabel: 'Percentages',
                        tickFormat: function(d){
                            return d3.format(',.2f')(d);
                        }
                    }
                }
            };

            // set up for line charts, including competition values
            $scope.options2 = {
                chart: {
                    type: 'lineChart',
                    height: 450,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 80
                    },
                    x: function(d){return d[0];},
                    y: function(d){return d[1];},
                    useVoronoi: false,
                    clipEdge: false,
                    transitionDuration: 500,
                    useInteractiveGuideline: true,
                    tooltips: true,
                    objectequality: true,
                    xAxis: {
                        showMaxMin: true
                    },
                    yAxis: {
                        axisLabel: "Amt in Millions",
                        axisLabelDistance: 10,
                        tickFormat: function(d){
                            return d3.format(',')(d);
                        }
                    }
                }
            };

            });
        });
    });
}]);


