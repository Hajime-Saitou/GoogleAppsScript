// GoogleAppsScript/DateUtils
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

/**
 * 曜日名の定義
 */
var Weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
}

/**
 * 指定された日付が週末かどうかを判定する
 * @param {Date} date 判定したい日付
 * @returns {boolean} 週末である場合はtrueを返す
 */
function isWeekend(date) {
    const weekdays = date.getDay();
    return weekdays === Weekdays.Saturday || weekdays === Weekdays.Sunday;
}

/**
 * 指定された日付が祝祭日かどうかを判定する
 * @param {Date} date 判定したい日付
 * @param {string} holidayCalender Googleカレンダー名（デフォルトは日本の祝祭日）
 * @returns {boolean} 祝祭日である場合はtrueを返す
 */
function isHoliday(date, holidayCalender="ja.japanese#holiday@group.v.calendar.google.com") {
    return new Calender(holidayCalender).getEvents(date).length > 0;
}

/**
 * 指定された日付が営業日であるかどうかを判定する
 * @param {Date} date 判定したい日付
 * @param {string} holidayCalender Googleカレンダー名（デフォルトは日本の祝祭日）
 * @returns {boolean} 営業日である場合はtrueを返す
 */
function isBusinessday(date, holidayCalender) {
    return !isHoliday(date, holidayCalender) && !isWeekend(date);
}

/**
 * 指定した日付に対して指定された日数を加算する（カレンダーベース）
 * @param {Date} date ベースとなる日付
 * @param {number} days 日数
 * @returns {Date} 加算後の日付
 */
function addDays(date, days) {
    var d = new Date(date);
    d.setDate(date.getDate() + days);
    return d;
}

/**
 * 指定した日付に対して指定された日数を加算する（営業日ベース）
 * @param {Date} date ベースとなる日付
 * @param {number} days 日数
 * @param {string} holidayCalender Googleカレンダー名（デフォルトは日本の祝祭日）
 * @returns 
 */
function addBusinessdays(date, days, holidayCalender) {
    var d = new Date(date);
    if (days === 0) {
        return d;
    }

    for (var i = 1; i <= days; i++) {
        d = (days > 0 ? getNextBusinessday : getPreviousBusinessday)(d, holidayCalender);
    }

    return d;
}

/**
 * 指定された日付の翌営業日を求める
 * @param {Date} date ベースとなる日付
 * @param {string} holidayCalender Googleカレンダー名（デフォルトは日本の祝祭日）
 * @returns 翌営業日
 */
function getNextBusinessday(date, holidayCalender) {
    var d = new Date(date);

    do {
        d = addDays(d, 1);
    } while(!isBusinessday(d, holidayCalender));

    return d;
}

/**
 * 指定された日付の前営業日を求める
 * @param {Date} date ベースとなる日付
 * @param {string} holidayCalender Googleカレンダー名（デフォルトは日本の祝祭日）
 * @returns 前営業日
 */
function getPreviousBusinessday(date, holidayCalender) {
    var d = new Date(date);

    do {
      d = addDays(d, -1);
    } while(!isBusinessday(d, holidayCalender));

    return d;
}

/**
 * 指定された日付から月初日を求める（カレンダーベース）
 * @param {Date} date 
 * @returns 月初日
 */
function getFirstOfMonth(date) {
    var d = new Date(date);
   d.setMonth(d.getMonth(), 1);
    return d;
}

/**
 * 指定された日付から月末日を求める（カレンダーベース）
 * @param {Date} date 
 * @returns 月末日
 */
function getLastOfMonth(date) {
    var d = new Date(date);
    d.setMonth(d.getMonth() + 1, 0);
    return d;
}

/**
 * カレンダーオブジェクトを生成する
 */
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

