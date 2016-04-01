(function () {
  var mlc = {};

  // MonthlessDate = function () {};
  // MonthlessDate.prototype

  mlc.getDayString = function (day) {
    var dayStrings = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return dayStrings[day];
  };
  mlc.getDateOrdinal = function (date) {
    if (date > 3 && date < 21) { return "th"; }

    switch (date % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  };

  mlc.daysInMonth = function (year, month) {
    return new Date(year, month + 1, 0).getDate();
  };
  mlc.convertOldDateToNewDate = function (date) {
    var newDate = date.getDate(),
        newDay;

    for (var i = 0; i < date.getMonth(); i++) {
      newDate += mlc.daysInMonth(date.getFullYear(), i);
    }

    newDay = newDate % 7;

    return {
      day: newDay,
      date: newDate,
      year: date.getFullYear(),
      getDay: function () { return this.day; },
      getDate: function () { return this.date; },
      getFullYear: function () { return this.year; }
    }
  };

  mlc.printTodayOldDate = function (date) {
    var monthStrings = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var dateString = mlc.getDayString(date.getDay()) + ", " + monthStrings[date.getMonth()] + " " + date.getDate() + mlc.getDateOrdinal(date.getDate()) + " " + date.getFullYear();
    document.getElementById("today-old").innerText = dateString;
  };
  mlc.printTodayNewDate = function (date) {
    var newDate = mlc.convertOldDateToNewDate(date);

    var dateString = newDate.getFullYear() + ", " + mlc.getDayString(newDate.getDay()) + " " + newDate.getDate() + mlc.getDateOrdinal(newDate.getDate());
    document.getElementById("today-new").innerText = dateString;
  };

  window.mlc = mlc;

  mlc.printTodayOldDate(new Date());
  mlc.printTodayNewDate(new Date());
})();
