/*
 Ultimately the data format for the calendars will looks something like this:

     [
         {
             name:           // User defined name
             description:    // User defined description
             uuid:           // UUID
             activeRange     // 1week, 1mo, 3mo, 6mo
             defaultRange    // 3mo
             createdOn:      // UTC date created time-stamp
             lastUpdatedOn:  // UTC date when calendar was last updated
             createdBy:      // UserID
             tags: [
                 // User defined list of words/tags for this set of calendars
             ]
             theme: {
                 // either some x-ref id/name or actual values, or perhaps both
                 // with user defined over-rides here.
             }
             calendars: [
                 {
                     date    : // UTC @ day 1 of the month for the calendar
                     checked : int
                     skipped : int
                 },
                 ...
             ]
         }
     ]
 */
angular.module("CalendarData").service("CalendarData", function($localStorage, Uuid, DateRanges, User) {


    function addChain(opts) {
        var name = opts.name || "New chain";
    };

    function defaultCalendar(date) {
        return {
            date    : date,
            checked : 0x00000000,
            skipped : 0x00000000
        }
    };

    function defaultCalendars() {
        return [
            defaultCalendar(moment().subtract('month', 1).startOf('month').valueOf()),
            defaultCalendar(moment().startOf('month').valueOf())
        ];
    };

    function newChain() {
        return {
            name            : 'New chain',
            description     : 'Newly created chain',
            uuid            : Uuid(),
            activeRange     : DateRanges._3mo,
            defaultRange    : DateRanges._3mo,
            createdOn       : moment().utc().valueOf(),
            lastUpdatedOn   : moment().utc().valueOf(),
            createdBy       : User.userId(),
            tags            : [],
            theme           : {},
            calendars       : defaultCalendars()
        }
    };

    function init( scope ) {
        scope.$storage = $localStorage.$default({
            chains: [
                newChain()
            ]
        });
    };

    function reset() {
        $localStorage.$reset({});
    }

    return {
        init            : init,
        reset           : reset,
        defaultChain    : newChain,
        addChain        : addChain
    };
});