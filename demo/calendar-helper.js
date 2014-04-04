angular.module('calendarDemoApp')
    .factory('CalendarHelper', function () {
        return function CalendarHelper(scope, calendarId) {
            var DAY_VIEW = 'basicDay',
                AGENDA_WEEK_VIEW = 'agendaWeek';

            calendar = $(calendarId);

            var onResizeEnd = function () {
                if (window.innerWidth < 500) {
                    scope.$apply(function () {
                        calendar.fullCalendar('changeView', DAY_VIEW);
                    });
                } else {
                    scope.$apply(function () {
                        calendar.fullCalendar('changeView', AGENDA_WEEK_VIEW);
                    });
                }
            };

            onResizeEnd();

            return {
                'onResizeEnd': _.debounce(onResizeEnd, 300)
            };
        };
    });
