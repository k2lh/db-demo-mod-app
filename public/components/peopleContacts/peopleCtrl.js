app.controller('peopleCtrl', function($scope, $http, $timeout, storageFactory, peopleFactory) {

    $scope.results1 = [];
    $scope.results2 = [];
    $scope.results3 = [];

    $scope.$watch('coName', function () {
        $timeout(function () {
            var nameSel = $scope.coName;
            if (nameSel != 'undefined') {
                // company name + finance keyword ===> pin, duns numbers, name, title
                $http.get('/direct2-proxy/V6.0/organizations?findcontact=true&CandidateMaximumQuantity=6&CandidateDisplayStartSequenceNumber=1&KeywordText=' + nameSel + '&SearchModeDescription=Advanced&InclusionDataDescription=IncludeContactsOnlyWithDirectEmail&KeywordContactScopeText=Title&KeywordContactText=Financial')
                .success(function(res1){
                    renameDollar(res1);
                    $scope.data1 = res1.FindContactResponse.FindContactResponseDetail.FindCandidate;
                    for (var i=0; i<12; i++) {
                        var duns = $scope.data1[i].DUNSNumber;
                        var pin = $scope.data1[i].PrincipalIdentificationNumberDetail[0].PrincipalIdentificationNumber;
                        var obj = {
                            num: i,
                            duns: duns,
                            pin: pin,
                            name: $scope.data1[i].ContactName.FullName,
                            title: $scope.data1[i].JobTitle[0].JobTitleText.dlr
                        };
                        $scope.results1.push(obj);
                        var duns = $scope.data1[i].DUNSNumber;
                        var pin = $scope.data1[i].PrincipalIdentificationNumberDetail[0].PrincipalIdentificationNumber;
                        var num = i;
                        $scope.thing = getUser(num, pin, duns);
                    }
                });
            };
        }, 1000);
    });

    function getUser(num, pin, duns) {
        // pin & duns numbers ====> email address
        $http.get('/direct2-proxy/V4.0/organizations/' + duns + '/products/CNTCT_PLUS?PrincipalIdentificationNumber=' + pin + '&PrincipalIdentificationNumberTypeCode=24215')
        .then(function(res2){
            $scope.data2 = res2.data.OrderProductResponse.OrderProductResponseDetail.Product.Organization.PrincipalsAndManagement.CurrentPrincipal[0].Telecommunication.EmailAddress[0];
            if ($scope.data2 !== 'undefined') {
                var obj = {
                    num: $scope.results1[num].num,
                    duns: $scope.results1[num].duns,
                    pin: $scope.results1[num].pin,
                    name: $scope.results1[num].name,
                    title: $scope.results1[num].title,
                    email:  $scope.data2.TelecommunicationAddress
                };
                $scope.results2.push(obj);
            }
            var email = $scope.results2[num].email;
            // email address ====> twitter & image info, yay!
            return $http.get('/direct2-proxy/dataexchange/fliptop/beta/person?email=' + email);
            })
            .then(function(res3){
                $scope.data3 = res3.data;
                if ($scope.data3 !== 'undefined') {
                    // check for image
                    if ($scope.data3.image_url != 'undefined') {
                        var image = $scope.data3.image_url;
                    } else {
                        var image = '';
                    }
                    var obj = {
                        num: num,
                        id: $scope.results2[num].id,
                        title: $scope.results2[num].title,
                        name: $scope.results2[num].name,
                        email: $scope.results2[num].email,
                        image: image
                    };
                    $scope.results3.push(obj);
                }
            });
    }

});
