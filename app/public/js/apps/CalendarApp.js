angular.module("SlideOutMenu",          []);
angular.module("Uuid",                  []);
angular.module("User",                  []);
angular.module("DateRanges",            []);
angular.module("CalendarData",          ['ngStorage', 'Uuid', 'DateRanges', 'User']);
angular.module("CalendarApp",           ['CalendarData', 'DateRanges', 'SlideOutMenu']);