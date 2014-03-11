angular.module("CalendarApp").controller("CalendarCtrl", function($scope, CalendarDays) {

    function convertDayBits(int) {
        var bin = (int).toString(2);
        bin = (new Array(32 - bin.length)).join("0") + bin;
        console.log('binary', bin);

        var bits = _.map(bin.split(/|/), function(b) {
            return b == "1" ? true : false;
        });
        bits.reverse();
        return bits;
    };


    $scope.calendars = _.map(_.range(0, 3), function(n) {
        var m = CalendarDays.createMonths(moment().add('months', n));
        var w = CalendarDays.createWeeks(m);
        w.date = w.thisMonth.format("YYYY-MM-D")
        return w;
    });

    console.log($scope.calendars);

    console.log(convertDayBits(0x5));
});