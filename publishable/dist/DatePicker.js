"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./datepicker.scss");
var useOusideClick_1 = __importDefault(require("./hooks/useOusideClick"));
var DatePicker = function (_a) {
    var id = _a.id, onChange = _a.onChange, _b = _a.value, value = _b === void 0 ? "" : _b, placeholder = _a.placeholder, name = _a.name, className = _a.className, _c = _a.disabled, disabled = _c === void 0 ? false : _c, otherAttributes = _a.otherAttributes;
    // gets the today date time object
    var now = (0, react_1.useMemo)(function () { return new Date(); }, []);
    var _d = (0, react_1.useState)(null), selectedDate = _d[0], setSelectedDate = _d[1];
    var _e = (0, react_1.useState)(now.getMonth()), selectedMonth = _e[0], setSelectedMonth = _e[1];
    var _f = (0, react_1.useState)(now.getFullYear()), selectedYear = _f[0], setSelectedYear = _f[1];
    // state needed to display the day view, an array of the month weeks containing an array of week dates
    var _g = (0, react_1.useState)([]), displayedWeeks = _g[0], setDisplayedWeeks = _g[1];
    // state to define if datepicker is opened or not
    var _h = (0, react_1.useState)(false), opened = _h[0], setOpened = _h[1];
    // state that tells wich tab is active : day, month, years
    var _j = (0, react_1.useState)("day"), selectionTab = _j[0], setSelectionTab = _j[1];
    // years array needed for the years view
    var _k = (0, react_1.useState)([]), yearsArray = _k[0], setYearsArray = _k[1];
    // state that tells the component to call the onchange function
    var _l = (0, react_1.useState)(false), triggerChange = _l[0], setTriggerChange = _l[1];
    var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var monthNames = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    // className prefix for this component
    var prefix = "sb_datepicker";
    var datepickerRef = (0, react_1.useRef)(null);
    var dateInputRef = (0, react_1.useRef)(null);
    var closeAndReset = (0, react_1.useCallback)(function () {
        setOpened(false);
        setSelectionTab("day");
        var resetMonth = selectedDate ? selectedDate.getMonth() : now.getMonth();
        var resetYear = selectedDate
            ? selectedDate.getFullYear()
            : now.getFullYear();
        setSelectedMonth(resetMonth);
        setSelectedYear(resetYear);
    }, [now, selectedDate]);
    // function that returns a string reprensenting the Date object
    var formatDate = function (date) {
        var formatNumber = function (number) {
            return number < 10 ? "0" + number : number;
        };
        var month = formatNumber(date.getMonth() + 1);
        var day = formatNumber(date.getDate());
        var year = date.getFullYear();
        return month + "/" + day + "/" + year;
    };
    //if a value prop is passed to the component, update the selecterdDate state
    (0, react_1.useEffect)(function () {
        if (!value) {
            setSelectedDate(null);
        }
        else {
            var date = new Date(value);
            setSelectedYear(date.getFullYear());
            setSelectedMonth(date.getMonth());
            setSelectedDate(date);
        }
    }, [value]);
    // if triggerchange state is true then call the onChange callback funtion
    (0, react_1.useEffect)(function () {
        if (triggerChange && dateInputRef.current !== null && onChange) {
            onChange({ target: dateInputRef.current });
            setTriggerChange(false);
        }
    }, [triggerChange, onChange]);
    //use outside click to close the date picker if user clicks outside when opened
    (0, useOusideClick_1.default)(datepickerRef, closeAndReset, opened);
    //if user change the selectedYear, then udate the years array that is displayed on year tab view
    (0, react_1.useEffect)(function () {
        var years = [];
        for (var y = selectedYear - 10; y < selectedYear + 10; y++) {
            years.push(y);
        }
        setYearsArray(years);
    }, [selectedYear]);
    //get the array of weeks and dates needed for the day tab view, and update the displayedWeeks state
    (0, react_1.useEffect)(function () {
        function getMonthLength(year, month) {
            var monthLastDate = new Date(year, month + 1, 0);
            return monthLastDate.getDate();
        }
        //get the first date object of the month
        var currentMonthFirstDate = new Date(selectedYear, selectedMonth, 1);
        //get the day number of the week of the first date of the month
        var currentMonthFirstDay = currentMonthFirstDate.getDay();
        // get the current month length
        var currentMonthLastDate = getMonthLength(selectedYear, selectedMonth);
        // initialize a new array
        var calendarArray = [];
        //determine if 6 or 5 weeks have to be displayed for this month
        var numberOfWeeksToDisplay = currentMonthFirstDay + currentMonthLastDate > 35 ? 6 : 5;
        for (var week = 0; week < numberOfWeeksToDisplay; week++) {
            var weekArray = [];
            var dayStartPosition = week * 7 - currentMonthFirstDay;
            for (var day = 1; day <= 7; day++) {
                var dayPosition = dayStartPosition + day;
                weekArray.push(new Date(selectedYear, selectedMonth, dayPosition));
            }
            calendarArray.push(weekArray);
        }
        setDisplayedWeeks(calendarArray);
    }, [selectedYear, selectedMonth]);
    var onYearChange = function (value) {
        setSelectionTab("day");
        setSelectedYear(value);
    };
    var onMonthChange = function (index) {
        setSelectionTab("day");
        setSelectedMonth(index);
    };
    var onDayClick = function (e) {
        var target = e.target;
        var dateElement = target.closest("." + prefix + "__day");
        if (dateElement && dateElement instanceof HTMLElement) {
            setSelectedDate(new Date(dateElement.id));
            setOpened(false);
            setTriggerChange(true);
        }
    };
    var onInputClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            e.stopPropagation();
            if (opened) {
                closeAndReset();
            }
            else {
                setOpened(true);
            }
        }
    };
    var onTodayClick = function () {
        setSelectedMonth(now.getMonth());
        setSelectedYear(now.getFullYear());
        setSelectedDate(now);
        setOpened(false);
        setTriggerChange(true);
    };
    var onClear = function () {
        setSelectedDate(null);
        setOpened(false);
        setTriggerChange(true);
    };
    var onNavClick = function (e, direction, dateElement) {
        if (dateElement === void 0) { dateElement = "day"; }
        e.preventDefault();
        switch (dateElement) {
            case "day": {
                if (direction === "prev") {
                    if (selectedMonth === 0) {
                        setSelectedMonth(11);
                        setSelectedYear(selectedYear - 1);
                    }
                    else {
                        setSelectedMonth(selectedMonth - 1);
                    }
                }
                if (direction === "next") {
                    if (selectedMonth === 11) {
                        setSelectedMonth(0);
                        setSelectedYear(selectedYear + 1);
                    }
                    else {
                        setSelectedMonth(selectedMonth + 1);
                    }
                }
                break;
            }
            case "year": {
                if (direction === "prev") {
                    var years = [];
                    for (var y = yearsArray[0] - 20; y < yearsArray[0]; y++) {
                        years.push(y);
                    }
                    setYearsArray(years);
                }
                if (direction === "next") {
                    var years = [];
                    for (var y = yearsArray[yearsArray.length - 1] + 1; y <= yearsArray[yearsArray.length - 1] + 20; y++) {
                        years.push(y);
                    }
                    setYearsArray(years);
                }
                break;
            }
            default:
                break;
        }
    };
    var changeSelectionTab = function (e, tab) {
        if (e === void 0) { e = null; }
        if (e) {
            e.preventDefault();
        }
        setSelectionTab(tab);
    };
    return (react_1.default.createElement("div", { className: prefix },
        react_1.default.createElement("div", { className: prefix + "__input-container", onKeyDown: onInputClick, onClick: onInputClick },
            react_1.default.createElement("input", __assign({ id: id, type: "text", className: className, value: selectedDate ? formatDate(selectedDate) : "", readOnly: true, ref: dateInputRef, placeholder: placeholder, name: name, disabled: disabled }, otherAttributes)),
            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", className: "calendar-icon" },
                react_1.default.createElement("path", { d: "M12,14a1,1,0,1,0-1-1A1,1,0,0,0,12,14Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,14Zm-5,4a1,1,0,1,0-1-1A1,1,0,0,0,12,18Zm5,0a1,1,0,1,0-1-1A1,1,0,0,0,17,18ZM7,14a1,1,0,1,0-1-1A1,1,0,0,0,7,14ZM19,4H18V3a1,1,0,0,0-2,0V4H8V3A1,1,0,0,0,6,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20ZM20,8H4V7A1,1,0,0,1,5,6H19a1,1,0,0,1,1,1ZM7,18a1,1,0,1,0-1-1A1,1,0,0,0,7,18Z" }))),
        opened && (react_1.default.createElement("div", { className: prefix + "__calendar-container", ref: datepickerRef },
            selectionTab === "day" && (react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: prefix + "__navigation" },
                    react_1.default.createElement("div", { className: prefix + "__navigation-prev", onClick: function (e) {
                            onNavClick(e, "prev");
                        } },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 29 29" },
                            react_1.default.createElement("path", { fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10", strokeWidth: "2", d: "m20.5 11.5-6 6-6-6" }))),
                    react_1.default.createElement("button", { className: "changeMonth", onClick: function (e) {
                            changeSelectionTab(e, "month");
                        } }, monthNames[selectedMonth]),
                    react_1.default.createElement("button", { className: "changeYear", onClick: function (e) {
                            changeSelectionTab(e, "year");
                        } }, selectedYear),
                    react_1.default.createElement("div", { className: prefix + "__navigation-next", onClick: function (e) {
                            onNavClick(e, "next");
                        } },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 29 29" },
                            react_1.default.createElement("path", { fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10", strokeWidth: "2", d: "m20.5 11.5-6 6-6-6" })))),
                react_1.default.createElement("table", { className: prefix + "__body" },
                    react_1.default.createElement("thead", { className: prefix + "__header" },
                        react_1.default.createElement("tr", null, weekDays.map(function (day, index) {
                            return react_1.default.createElement("th", { key: index + day }, day);
                        }))),
                    react_1.default.createElement("tbody", null, displayedWeeks.map(function (week, index) {
                        return (react_1.default.createElement("tr", { key: week.toString() + index }, week.map(function (date, index) {
                            var className = prefix + "__day";
                            if (date.getMonth() !== selectedMonth) {
                                className += " off-month";
                            }
                            if (selectedDate &&
                                date.toDateString() === selectedDate.toDateString()) {
                                className += " selected";
                            }
                            if (date.toDateString() === now.toDateString()) {
                                className += " today";
                            }
                            return (react_1.default.createElement("td", { key: date.toString() + index, className: className, id: "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate()), onClick: onDayClick }, date.getDate()));
                        })));
                    }))),
                react_1.default.createElement("div", { className: prefix + "__bottom_line" },
                    react_1.default.createElement("span", { className: prefix + "__today", onClick: onTodayClick }, "Today"),
                    react_1.default.createElement("span", { className: prefix + "__today", onClick: onClear }, "Clear")))),
            selectionTab === "month" && (react_1.default.createElement("div", { className: prefix + "__month-container" }, monthNames.map(function (month, index) {
                return (react_1.default.createElement("div", { className: "".concat(prefix, "__month").concat(selectedMonth === index ? " selected" : ""), key: month + index, onClick: function () {
                        onMonthChange(index);
                    } }, month));
            }))),
            selectionTab === "year" && (react_1.default.createElement("div", null,
                react_1.default.createElement("div", { className: prefix + "__navigation" },
                    react_1.default.createElement("div", { className: prefix + "__navigation-prev", onClick: function (e) {
                            onNavClick(e, "prev", "year");
                        } },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 29 29" },
                            react_1.default.createElement("path", { fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10", strokeWidth: "2", d: "m20.5 11.5-6 6-6-6" }))),
                    react_1.default.createElement("span", null, yearsArray[0] + " - " + yearsArray[yearsArray.length - 1]),
                    react_1.default.createElement("div", { className: prefix + "__navigation-next", onClick: function (e) {
                            onNavClick(e, "next", "year");
                        } },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 29 29" },
                            react_1.default.createElement("path", { fill: "none", stroke: "#000", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "10", strokeWidth: "2", d: "m20.5 11.5-6 6-6-6" })))),
                react_1.default.createElement("div", { className: prefix + "__year-container" }, yearsArray.map(function (year, index) {
                    return (react_1.default.createElement("div", { className: "".concat(prefix, "__year").concat(selectedYear === year ? " selected" : ""), key: year + index, onClick: function () {
                            onYearChange(year);
                        } }, year));
                }))))))));
};
exports.default = DatePicker;
