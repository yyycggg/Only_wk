/*
 * http://love.hackerzhou.me
 */

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function () {
	var newWidth = $win.width();
	var newHeight = $win.height();
	if (newWidth != clientWidth && newHeight != clientHeight) {
		location.replace(location);
	}
});

(function ($) {
	$.fn.typewriter = function () {
		this.each(function () {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function () {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

// 是否是闰年
function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 该年有多少天
function daysInYear(year) {
	return isLeapYear(year) ? 366 : 365;
}

function timeElapse(date) {
	var currentDate = new Date();
	var seconds = (Date.parse(currentDate) - Date.parse(date)) / 1000;
	var pass = seconds >= 0; // 是否已经过了给定的日期
	seconds = Math.abs(seconds);

	var years = 0;
	var startYear = pass ? date.getFullYear() : currentDate.getFullYear();
	var endYear = pass ? currentDate.getFullYear() : date.getFullYear();
	for (var year = startYear; year < endYear; year++) {
		var secondsInYear = daysInYear(year) * 24 * 3600;
		if (seconds >= secondsInYear) {
			years++;
			seconds -= secondsInYear;
		} else {
			break;
		}
	}

	// 继续计算剩余的天数、小时、分钟和秒
	var days = Math.floor(seconds / (24 * 3600));
	seconds %= 24 * 3600;
	var hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	var minutes = Math.floor(seconds / 60);
	seconds %= 60;

	years = years < 10 ? "0" + years : years;
	days = days < 10 ? "0" + days : days;
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + Math.floor(seconds) : Math.floor(seconds);

	var string = (pass ? "第" : "还剩下")
		+ " <span class=\"digit\">" + years + "</span> 年"
		+ " <span class=\"digit\">" + days + "</span> 天"
		+ " <span class=\"digit\">" + hours + "</span> 小时"
		+ " <span class=\"digit\">" + minutes + "</span> 分钟"
		+ " <span class=\"digit\">" + seconds + "</span> 秒";

	$("#clock").html(string);
}
