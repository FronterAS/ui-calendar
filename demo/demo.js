'use strict';

var myAppModule = angular.module('calendarDemoApp', ['ui.calendar']);

myAppModule.controller('calendarController', function ($scope, EventService, CalendarHelper) {
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth(),
        fullYear = date.getFullYear(),
        calendarHelper;

    /* event source that contains custom events on the scope */
    $scope.events = EventService.get();


    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, callback) {
        var startTime = new Date(start).getTime() / 1000,
            // endTime = new Date(end).getTime() / 1000,
            month = new Date(start).getMonth(),

            events = [{
                title: 'Feed Me ' + month,
                start: startTime + (50000),
                end: startTime + (100000),
                allDay: false,
                className: ['customFeed']
            }];

        callback(events);
    };

    $scope.calEventsExt = {
        color: '#f00',
        textColor: 'yellow',
        events: [
            {
                type:'party',
                title: 'Lunch',
                start: new Date(fullYear, month, day, 12, 0),
                end: new Date(fullYear, month, day, 14, 0),
                allDay: false
            },
            {
                type:'party',
                title: 'Lunch 2',
                start: new Date(fullYear, month, day, 12, 0),
                end: new Date(fullYear, month, day, 14, 0),
                allDay: false
            },
            {
                type:'party',
                title: 'Click for Google',
                start: new Date(fullYear, month, 28),
                end: new Date(fullYear, month, 29),
                url: 'http://google.com/'
            }
        ]
    };

    /* alert on eventClick */
    $scope.alertEventOnClick = function (
        date
        /*, allDay, jsEvent, view*/
    ) {
        $scope.alertMessage = ('Day Clicked ' + date);
    };

    /* alert on Drop */
    $scope.alertOnDrop = function (
        event,
        dayDelta/*,
        minuteDelta,
        allDay,
        revertFunc,
        jsEvent,
        ui,
        view*/
    ) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
    };

    /* alert on Resize */
    $scope.alertOnResize = function (
        event,
        dayDelta,
        minuteDelta/*,
        revertFunc,
        jsEvent,
        ui,
        view*/
    ) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
    };

    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function (sources, source) {
        var canAdd = 0;

        angular.forEach(sources,function(value, key){
            if(sources[key] === source){
                sources.splice(key,1);
                canAdd = 1;
            }
        });

        if (canAdd === 0) {
            sources.push(source);
        }
    };

    /* add custom event*/
    $scope.addEvent = function(event) {
        event = event || {
            title: 'Open Sesame',
            start: new Date(fullYear, month, 28),
            end: new Date(fullYear, month, 29),
            className: ['openSesame']
        };

        $scope.events.push(event);
    };

    /* remove event */
    $scope.remove = function (index) {
        $scope.events.splice(index, 1);
    };

    /* Change View */
    $scope.changeView = function (view, calendar) {
        calendar.fullCalendar('changeView', view);
    };

    /* Change View */
    $scope.renderCalender = function (calendar) {
        calendar.fullCalendar('render');
    };

    /* config object */
    $scope.uiConfig = {
        calendar:{
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },

            height: 450,
            editable: true,
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
        }
    };

    window.onresize = CalendarHelper.onResizeEnd;

    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventsF];
});
