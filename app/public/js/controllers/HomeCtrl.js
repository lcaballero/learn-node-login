angular.module("CalendarApp").controller("CalendarCtrl", function(
    $scope, CalendarDays, CalendarData) {

    CalendarData.init($scope);

    function convertDayBits(int) {
        var base = (int).toString(2);
        var bin = (new Array(32 - base.length + 1)).join("0") + base;

        var bits = _.map(bin.split(/|/), function(b) {
            return b == "1" ? true : false;
        });
        bits.reverse();

        var set = {}
        for (var i = 0; i < bits.length; i++) {
            set[i+1] = bits[i];
        }
        return set;
    };

    function centerCalendars( calendars ) {
        return _.map(calendars, function(cal) {
            var m = CalendarDays.createMonths(moment(cal.date));
            var w = CalendarDays.createWeeks(m);

            w.date      = w.thisMonth.format("YYYY-MM-D")
            w.checked    = convertDayBits(cal.checked);
            w.skipped   = convertDayBits(cal.skipped);

            return w;
        });
    };

    function dayOfTheMonth(day) {
        var d = Number(day.format('D'));
        return d;
    };

    function isMonth(cal, day) {
        return cal.month == day.format("MMMM");
    };

    $scope.chains       = $scope.$storage.chains;
    $scope.activeChain  = $scope.chains[0];
    $scope.calendars    = centerCalendars($scope.activeChain.calendars);

    $scope.isInMonth = function(cal, day) {
        var isThisMonth = isMonth(cal, day);
        var d = dayOfTheMonth(day);
        return !isNaN(d) && isThisMonth;
    };

    $scope.isChecked = function(cal, day) {
        var isThisMonth = isMonth(cal, day);
        var d = dayOfTheMonth(day);
        var isDay = isNaN(d) ? false : cal.checked[d];
        return isThisMonth && isDay;
    };

    $scope.crossOffDay  = function(cal, day) {
        if (!$scope.isInMonth(cal, day)) {
            return;
        }
        var d = dayOfTheMonth(day);
        cal.checked[d] = true;
    };

    var views = {
        home        : 'home',
        firstChain  : 'first-chain',
        createChain : 'create-chain'
    };

    var view = views.home;

    $scope.isView = function( v ) {
        var a = view == v;
        return a;
    };
});