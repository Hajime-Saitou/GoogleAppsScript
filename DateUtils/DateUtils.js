var Weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

function isWeekend(date) {
    const weekdays = date.getDay();
    return weekdays === Weekdays.Saturday || weekdays === Weekdays.Sunday;
}

function isHoliday(date, holidayCalender="ja.japanese#holiday@group.v.calendar.google.com") {
    return new Calender(holidayCalender).getEvents(date).length > 0;
}

function isBusinessday(date) {
    return !isHoliday(date) && !isWeekend(date);
}

function addDays(date, days) {
    var d = new Date(date);
    d.setDate(date.getDate() + days);
    return d;
}

function getNextBusinessday(date) {
    var d = new Date(date);

    do {
        d = addDays(d, 1);
    } while(!isBusinessday(d));

    return d;
}

function getPreviousBusinessday(date) {
    var d = new Date(Date);

    do {
      d = addDays(d, -1);
    } while(!isBusinessday(d));

    return d;
}

function getFirstOfMonth(date) {
    var d = new Date(date);
   d.setMonth(d.getMonth(), 1);
    return d;
}

function getLastOfMonth(date) {
    var d = new Date(date);
    d.setMonth(d.getMonth() + 1, 0);
    return d;
}

class Calender {
    constructor(calenderId) {
        this.calendarId = calenderId;
        this.calendar = CalendarApp.getCalendarById(this.calendarId);
    }

    getEvents(startDate, endDate=null) {
      var s = new Date(startDate);
      s.setHours(0, 0, 0)
      var e = new Date(endDate === null ? startDate : endDate);
      e.setHours(23, 59, 59);

      return this.calendar.getEvents(s, e);
    }
}

