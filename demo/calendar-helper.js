angular.module('calendarDemoApp')
    .factory('CalendarHelper', function () {
        return function CalendarHelper(calendar) {
            var onResizeEnd = function () {
                console.log(args);

                /*scope.$apply(function () {
                    calendar.fullCalendar('changeView', viewName);
                });*/
            };

            return {
                'onResizeEnd': _.debounce(onResizeEnd, 300)
            };
        };
    });
