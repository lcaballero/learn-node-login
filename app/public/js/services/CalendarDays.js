angular.module("CalendarApp").service("CalendarDays", function() {

    function createWeeks(opts) {

        var thisMonth   = opts.thisMonth;
        var firstSunday = opts.firstSunday;
        var lastSunday  = opts.lastSunday;

        return {
            month: "March",
            daysOfTheWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weeks: (function(){
                var d = moment(firstSunday);
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
            firstDay        : firstSunday.day(),
            firstSunday     : firstSunday,
            thisMonth       : thisMonth,
            monthStart      : opts.monthStart,
            monthEnd        : opts.monthEnd
        };
    };

    function firstCell(mmt) {
        var m           = moment(mmt);
        var month       = m.startOf('month');
        var day         = month.day();
        var theFirst    = day == 0 ? month : month.subtract('days', day);
        return {
            firstSunday : theFirst,
            monthStart  : month
        };
    };

    function lastCell(mmt) {
        var m           = moment(mmt);
        var month       = m.endOf('month');
        var day         = month.day();
        var lastSunday  = day == 6 ? month : month.add('days', 6 - day);
        return {
            lastSunday : lastSunday,
            monthEnd   : month
        };
    }

    function createMonths(mmt) {
        var m       = moment(mmt);
        var start   = firstCell(m);
        var last    = lastCell(m);

        return {
            firstSunday :   start.firstSunday,
            monthStart  :   start.monthStart,
            thisMonth   :   m,
            lastSunday  :   end.lastSunday,
            monthEnd    :   end.monthEnd
        };
    };

    return {
        createWeeks   : createWeeks,
        createMonths  : createMonths
    };

});