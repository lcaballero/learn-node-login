angular.module("CalendarApp", []).controller("CalendarCtrl", function($scope) {

    function createWeeks(opts) {

        var thisMonth   = opts.thisMonth;
        var firstSunday = opts.firstSunday;
        var lastSunday  = opts.lastSunday;

        return {
            month: "March",
            daysOfTheWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weeks: (function(){
                var d = firstSunday;
                var weeks = [];

                while (d.dayOfYear() <= lastSunday.dayOfYear()) {

                    if (d.day() == 0) {
                        var week = []
                        weeks.push(week);
                    }

                    week.push(d);
                    d = moment(d).add('days', 1);
                }

                return weeks;
            })(),
            firstSunday: firstSunday,
            thisMonth: thisMonth
        };
    };

    function firstCell(mmt) {
        var m           = moment(mmt);
        var month       = m.startOf('month');
        var day         = month.day();
        var theFirst    = day == 0 ? month : month.subtract('days', day);
        return theFirst;
    };

    function lastCell(mmt) {
        var m           = moment(mmt);
        var month       = m.endOf('month');
        var day         = month.day();
        var theLast     = day == 6 ? month : month.add('days', 6 - day);
        return theLast;
    }

    function createMonths(mmt) {
        var m       = moment(mmt);
        var first   = firstCell(m);
        var last    = lastCell(m);

        return {
            firstSunday :   first,
            thisMonth   :   m,
            lastSunday  :   last
        };
    };

    $scope.calendars = _.map(_.range(0, 3), function(n) {
        var m = createMonths(moment().add('months', n));
        var w = createWeeks(m);
        return w;
    });

    console.log($scope.calendars);
});