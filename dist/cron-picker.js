"use strict";function StandardCronFormatter(){}function QuartzCronFormatter(){}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}StandardCronFormatter.parse=function(e){var t={},r=e.split(" ");return 5!==r.length&&6!==r.length?console.warn("Invalid cron expression. Skip parsing..."):(t.hours=r[1],t.minutes=r[0],"*"===r[3]&&"*"===r[4]&&"*"===r[5]?t.type="Daily":"*"==r[3]&&"*"!==r[4]?(t.type="Weekly",t.daysOfWeek=""===r[4]?[]:r[4].split(",")):"*"!==r[3]&&(t.type="Monthly",t.monthRepeater=r[3].split("/")[1],t.dayFilter="day",t.dayNumber=r[2])),t},StandardCronFormatter.build=function(e){switch(e.type){case"Daily":return e.minutes+" "+e.hours+" * * *";case"Weekly":var t=e.daysOfWeek.sort().join(",");return e.minutes+" "+e.hours+" * * "+t;case"Monthly":return e.minutes+" "+e.hours+" "+e.dayNumber+" */"+e.monthRepeater+" *"}},QuartzCronFormatter.parse=function(e){var t={},r=e.split(" ");return 7!==r.length?console.warn("Invalid cron expression. Skip parsing..."):(t.hours=r[2],t.minutes=r[1],"*"===r[4]&&"?"===r[5]&&"*"===r[6]?t.type="Daily":"*"==r[4]&&"?"!==r[5]?(t.type="Weekly",t.daysOfWeek=""===r[5]?[]:r[5].split(",")):"*"!==r[4]&&(t.type="Monthly",t.monthRepeater=r[4].split("/")[1],"?"===r[5]?(t.dayFilter="day",t.dayNumber=r[3]):(t.dayFilter="weekday",t.dayOfWeek=r[5].substr(0,3),t.ordCondition=r[5].substr(3)))),t},QuartzCronFormatter.build=function(e){switch(e.type){case"Daily":return"0 "+e.minutes+" "+e.hours+" 1/1 * ? *";case"Weekly":var t=e.daysOfWeek.sort().join(",");return"0 "+e.minutes+" "+e.hours+" ? * "+t+" *";case"Monthly":if("day"===e.dayFilter)return"0 "+e.minutes+" "+e.hours+" "+e.dayNumber+" 1/"+e.monthRepeater+" ? *";if("weekday"==e.dayFilter)return"0 "+e.minutes+" "+e.hours+" ? 1/"+e.monthRepeater+" "+e.dayOfWeek+e.ordCondition+" *"}};var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();!function(e){var t=function(){function t(r,n,i){_classCallCheck(this,t),this.wrapper=r,this.hostControl=n;var o={format:"24",cronFormatter:StandardCronFormatter};this.settings=e.extend({},o,i),this.state={type:"Daily",hours:0,minutes:0,dayNumber:1,monthRepeater:1,ordCondition:"#1",daysOfWeek:[],dayFilter:"day",dayOfWeek:1},this._buildControl(),this.setCronExpression(this.hostControl.val())}return _createClass(t,[{key:"setCronExpression",value:function(e){e.length>0?this._parseCronExpression(e):this._buildCronExpression(),this._updateUI()}},{key:"_buildControl",value:function(){var t=e("<div>",{class:"cron-picker-container",html:[this._buildRecurrenceTypes(),this._buildDaysOfWeeks(),this._buildMonthlyFilter(),this._buildTimePicker()]});this.wrapper.append(t)}},{key:"_buildMonthlyFilter",value:function(){var r=this,n=(this._buildFilterButton("day"),this._buildFilterButton("weekday"),e("<select>",{html:t._buildOptions(31,1),class:"form-control cron-picker-day-number"}).on("change",function(){r.state.dayNumber=this.value,r._buildCronExpression()})),i=e("<select>",{html:t._buildOptions(12,1),class:"form-control cron-picker-month-repeater"}).on("change",function(){r.state.monthRepeater=this.value,r._buildCronExpression()}),o=e("<div>",{class:"btn-group",html:[]}),s=e("<div>",{class:"cron-picker-day-type-filter",html:[n,"day&nbsp;"]}),a=e("<select>",{class:"form-control cron-picker-ord-select",html:this._buildOrdinalityOptions()}).on("change",function(){r.state.ordCondition=this.value,r._buildCronExpression()}),c=e("<select>",{class:"form-control cron-picker-dow-select",html:this._buildDaysOfWeekOptions()}).on("change",function(){r.state.dayOfWeek=this.value,r._buildCronExpression()}),u=e("<div>",{class:"cron-picker-weekday-type-filter",html:[a,c]});return e("<div>",{class:"cron-picker-day-filter",html:[o,s,u,"of every",i,"month(s)"]})}},{key:"_destroyMonthlyFilter",value:function(){this.wrapper.find(".cron-picker-day-filter select").each(function(){e(this).off("change")})}},{key:"_buildOrdinalityOptions",value:function(){return[["First","#1"],["Second","#2"],["Third","#3"],["Last","L"]].map(function(t){return e("<option>",{value:t[1],text:t[0]})})}},{key:"_buildDaysOfWeekOptions",value:function(){return[["Monday",1],["Tuesday",2],["Wednesday",3],["Thurdsay",4],["Friday",5],["Saturday",6],["Sunday",7]].map(function(t){return e("<option>",{value:t[1],text:t[0]})})}},{key:"_buildFilterButton",value:function(t){var r=this;return e("<button>",{type:"button",class:"btn btn-default",text:t.toUpperCase(),"data-day-filter":t}).on("click",function(){r.state.dayFilter=this.getAttribute("data-day-filter"),r._buildCronExpression(),r._updateUI()})}},{key:"_buildTimePicker",value:function(){return e("<div>",{class:"cron-picker-time",html:["Run at",this._buildHourPicker(),":",this._buildMinutesPicker(),this._buildAMPMPicker()]})}},{key:"_destroyTimePicker",value:function(){this.wrapper.find(".cron-picker-time select").each(function(){e(this).off("change")})}},{key:"_buildHourPicker",value:function(){var r=this;return"24"===r.settings.format?e("<select>",{html:t._buildOptions(24),class:"form-control cron-picker-hours"}).on("change",function(){r._setHours(),r._buildCronExpression()}):e("<select>",{html:t._buildOptions(12,1),class:"form-control cron-picker-hours"}).on("change",function(){r._setHours(),r._buildCronExpression()})}},{key:"_setHours",value:function(){var e=parseInt(this.wrapper.find(".cron-picker-hours").val());if("12"==this.settings.format){var t=this.wrapper.find(".cron-picker-ampm").val();"PM"==t&&e<12&&(e+=12),"AM"==t&&12==e&&(e-=12)}this.state.hours=e}},{key:"_buildAMPMPicker",value:function(){var t=this;if("12"===t.settings.format)return e("<select>",{html:["<option value='AM'>AM</option>","<option value='PM'>PM</option>"],class:"form-control cron-picker-ampm"}).on("change",function(){t._setHours(),t._buildCronExpression()})}},{key:"_buildMinutesPicker",value:function(){var r=this;return e("<select>",{html:t._buildOptions(60),class:"form-control cron-picker-minutes"}).on("change",function(){r.state.minutes=this.value,r._buildCronExpression()})}},{key:"_buildRecurrenceTypes",value:function(){return e("<ul>",{class:"nav nav-pills cron-picker-recurrence-types",html:[this._buildRecurrenceType("Daily"),this._buildRecurrenceType("Weekly"),this._buildRecurrenceType("Monthly")]})}},{key:"_destroyRecurrenceTypes",value:function(){this.wrapper.find(".cron-picker-recurrence-types li a").each(function(){e(this).off("click")})}},{key:"_buildRecurrenceType",value:function(t){var r=this;return e("<li>",{"data-type":t,html:e("<a>",{text:t}).on("click",function(){r.state.type=this.parentNode.getAttribute("data-type"),r._buildCronExpression(),r._updateUI()})})}},{key:"_buildDaysOfWeeks",value:function(){var t=this;return e("<div>",{class:"cron-picker-dow",html:["MON","TUE","WED","THU","FRI","SAT","SUN"].map(function(e,r){return t._buildDayOfWeekButton(e,r+1)})})}},{key:"_destroyDaysOfWeek",value:function(){this.wrapper.find(".cron-picker-dow button").each(function(){e(this).off("click")})}},{key:"_buildDayOfWeekButton",value:function(t,r){var n=this;return e("<button>",{type:"button",class:"btn btn-default",text:t,"data-dow":r}).on("click",function(){var e=this.getAttribute("data-dow"),t=n.state.daysOfWeek.indexOf(e);-1===t?n.state.daysOfWeek.push(e):n.state.daysOfWeek.splice(t,1),n._buildCronExpression(),n._updateUI()})}},{key:"_formatHours",value:function(e){return"24"==this.settings.format?[e,null]:[e%12||12,e<12?"AM":"PM"]}},{key:"_parseCronExpression",value:function(t){var r=this.settings.cronFormatter.parse(t);e.extend(this.state,r)}},{key:"_updateUI",value:function(){var e=this;this.wrapper.find("li").removeClass("active"),this.wrapper.find("[data-type="+this.state.type+"]").addClass("active"),this.wrapper.find("[data-day-filter]").removeClass("active"),this.wrapper.find("[data-day-filter="+this.state.dayFilter+"]").addClass("active"),this.wrapper.find(".cron-picker-dow > button.active").removeClass("active"),this.state.daysOfWeek.forEach(function(t){e.wrapper.find(".cron-picker-dow > button[data-dow="+t+"]").addClass("active")}),this.wrapper.find(".cron-picker-minutes").val(this.state.minutes);var t=this._formatHours(this.state.hours);this.wrapper.find(".cron-picker-hours").val(t[0]),this.wrapper.find(".cron-picker-ampm").val(t[1]),this.wrapper.find(".cron-picker-dow-select").val(this.state.dayOfWeek),this.wrapper.find(".cron-picker-month-repeater").val(this.state.monthRepeater),this.wrapper.find(".cron-picker-ord-select").val(this.state.ordCondition),this.wrapper.find(".cron-picker-day-number").val(this.state.dayNumber),"Weekly"==this.state.type?this.wrapper.find(".cron-picker-dow").removeClass("hidden"):this.wrapper.find(".cron-picker-dow").addClass("hidden"),"Monthly"==this.state.type?this.wrapper.find(".cron-picker-day-filter").removeClass("hidden"):this.wrapper.find(".cron-picker-day-filter").addClass("hidden"),"day"==this.state.dayFilter?(this.wrapper.find(".cron-picker-day-type-filter").removeClass("hidden"),this.wrapper.find(".cron-picker-weekday-type-filter").addClass("hidden")):(this.wrapper.find(".cron-picker-day-type-filter").addClass("hidden"),this.wrapper.find(".cron-picker-weekday-type-filter").removeClass("hidden"))}},{key:"_buildCronExpression",value:function(){var e=this.settings.cronFormatter.build(this.state);this.hostControl.val(e),"function"==typeof this.settings.onCronChanged&&this.settings.onCronChanged(e)}},{key:"destroy",value:function(){this._destroyRecurrenceTypes(),this._destroyDaysOfWeek(),this._destroyMonthlyFilter(),this._destroyTimePicker(),this.wrapper.remove(),this.hostControl.removeData("cron-picker"),this.hostControl.show()}}],[{key:"_buildOptions",value:function(e,t){return t=t||0,[].concat(_toConsumableArray(Array(e).keys())).map(function(e){return'<option value="'+(e+t)+'">'+("0"+(e+t)).slice(-2)+"</option>"}).join()}}]),t}();e.fn.cronPicker=function(r,n){var i={onCronChanged:null};this.each(function(){var o=e(this),s=o.data("cron-picker"),a="object"===(void 0===r?"undefined":_typeof(r))&&r;if(s)"string"==typeof r&&s[r](n);else if("destroy"!==r){var c=e('\n                        <div class="cron-picker">\n                        </div>');o.after(c).hide(),o.data("cron-picker",s=new t(c,o,e.extend({},i,a)))}})}}(jQuery);