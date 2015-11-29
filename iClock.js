      var iClock = new Class({
        Implements: [Options, Events],
        initialize: function (placeholder, options) {
          this.placeholder = placeholder.empty();
          this.setOptions(options);
          this.refreshTime = 10;
          this.eid = this.getElementID();
          this.buildClock();
          this.updateClock();
          this.play();

          return(false);
        },
        buildClock: function () {
          var hours = "<div id=\"hours-" + this.eid + "\" class=\"hours\">00</div>";
          var minutes = "<div id=\"minutes-" + this.eid + "\" class=\"minutes\">00</div>";
          var seconds = "<div id=\"seconds-" + this.eid + "\" class=\"seconds\">00</div>";
          var milliseconds = "<div id=\"milliseconds-" + this.eid + "\" class=\"milliseconds\">00</div>";
          var time = "<div id=\"time-" + this.eid + "\" class=\"time\">AM</div>";
          var separator = "<div class=\"separator\">:</div>";
          var clock = (this.options.showHours) ? hours + separator : "";
          clock += (this.options.showMinutes) ? minutes + separator : "";
          clock += (this.options.showSeconds) ? seconds : "";
          clock += (this.options.showMilliseconds) ? separator + milliseconds : "";
          clock += (this.options.showTime) ? time : "";
          this.placeholder.set('html', clock);
        },
        updateClock: function () {
          var now = new Date().increment('hour', this.options.timeZoneIncrement), date = {};
          date.sec = now.get('sec');
          date.ms = now.get('ms');
          date.min = now.get('min');
          date.hr = now.get('hr');
          date.hrOrig = now.get('hr');
          date.hr = date.hr >= 12 ? date.hr - 12 : date.hr;
          this.redraw(date);
        },
        redraw: function (date) {
          var hours = $("hours-" + this.eid);
          var minutes = $("minutes-" + this.eid);
          var seconds = $("seconds-" + this.eid);
          var milliseconds = $("milliseconds-" + this.eid);
          var time = $("time-" + this.eid);
          hours.empty();
          minutes.empty();
          seconds.empty();
          if (hours) {
            hours.set('html', this.padLeft(date.hr, 2));
          }
          if (minutes) {
            minutes.set('html', this.padLeft(date.min, 2));
          }
          if (seconds) {
            seconds.set('html', this.padLeft(date.sec, 2));
          }
          if (milliseconds) {
            milliseconds.set('html', this.padLeft(date.ms, 3));
          }
          if (time) {
            var ampm = (date.hrOrig > 12) ? "PM" : "AM";
            time.set('html', ampm);
          }
        },
        play: function () {
          this.updatePeriodical = this.updateClock.periodical(this.refreshTime, this);
        },
        padLeft: function (nr, n, str) {
          return Array(n - String(nr).length + 1).join(str || '0') + nr;
        },
        getElementID: function () {
          var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          }
          return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        },
        options: {
          eid: null,
          showSeconds: true,
          showHours: true,
          showMinutes: true,
          showMilliseconds: false,
          showTime: true,
          timeZoneIncrement: 0
        }
      });
