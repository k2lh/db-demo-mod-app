angular
  .module('app')
  .factory('storageFactory', storageFactory)
  .factory('peopleFactory', peopleFactory)
  ;

function storageFactory() {
    var storageFactory = {};
    storageFactory.name = '';
    storageFactory.duns = '';
    storageFactory.indus = '';
    return storageFactory;
}

function peopleFactory() {
    var peopleFactory = {};
    peopleFactory.person = [];
    return peopleFactory;
}

function DropdownCtrl($scope) {
    $scope.status = {
    isopen: false
    };
    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}

function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

// this is to fix that really annoying unescaped chars as $ in the json, thank you, java
// oh look and there's frickin @ signage in the json too
function renameDollar(obj) {
    var dollarRename = 'dlr';
    for (var k in obj) {
        if (k === '$') {
            obj[dollarRename] = obj.$;
            delete obj.$;
            k = dollarRename;
        }
        if (typeof obj[k] === "object" && obj[k] !== null) {
            renameDollar(obj[k]);
        }
    }
    return obj;
}

function getCurr(val) {
    var tot = val.toString().length;
    if ( tot > 9) {
        var num = val / 100;
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 'B';
    } else {
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 'M';
    }
}

function getCap(val) {
    var val = Math.floor(val);
    var tot = val.toString().length;
    if ( tot > 9) {
        var num = val / 100;
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 'B';
    } else {
        return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + 'M';
    }
}

(function() {
    function ThemeSwitcherDirective() {
        return {
            restrict: 'E',
            scope: {
                urls: '='
            },
            template: '<link rel="stylesheet" ng-href="{{url}}" ng-repeat="url in urls" />'
        };
    }

    angular.module('jdf.ngThemeSwitcher', [])
            .directive('themeSwitcher', ThemeSwitcherDirective);
})();
