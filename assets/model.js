function User () {
    this.semesters = []
    this.events = []

    this.addSemester = (s) => { this.semesters.push(s) }
    this.removeSemester = (s) => { removeObject(semesters, s) }

    this.addEvent = (e) => { this.events.push(e) }
    this.removeEvent = (e) => { removeObject(events, e) }
}

function Semester (semesterName, startDate, endDate) {
    this.name = semesterName;
    this.start = startDate;
    this.end = endDate;
    this.courses = [];

    this.startf = formatSemesterDate(this.start);
    this.endf = formatSemesterDate(this.end);
    this.id = toID(this.name)

    this.addCourse = (c) => { this.courses.push (c); }
    this.removeCourse = (c) => { removeObject(courses, c) }
}

function Course (name="", code="", credits=0, color="X") {
    this.name = name;
    this.code = code;
    this.credits = credits;
    this.color = color;
    this.id = toID(code);
    this.assignments = [];
    this.lectures = [];

    this.addAssignment = (a) => { this.assignments.push(a); }
    this.removeAssignment = (a) => { removeObject(assignments, a) }

    this.addLecture = (l) => { this.lectures.push (l); }
    this.removeLecture = (l) => { removeObject(lectures, l) }
}

function Time (string, period) {
    this.time = string;
    this.period = period.toLowerCase();

    this.string = (() => {
        return `${this.time}${this.period}`
    })();

    this.date = (() => {
        return new Date(0, 0, 0, this.hours24, this.minutes, 0, 0)
    })();

    this.hours12 = (() => {
        return parseInt(this.time.split(":")[0], 10);
    })();

    this.hours24 = (() => {
        var hours = this.hours12

        if(this.period == "PM" && hours<12) hours += 12;
        if(this.period == "AM" && hours==12) hours -= 12;

        return hours;
    })();
}

Time.months = ["Jan.", "Feb.", "March", "Apr", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]

Time.fromDate = (date) => {
    let hh = (date.getHours() % 12) || 12
    let mm = ("0" + date.getMinutes()).slice(-2)
    let period = (date.getHours() >= 12) ? "pm" : "am"

    return new Time(`${hh}:${mm}`, period)
}

Time.formatDateTime = (date) => {
    return `${Time.months[date.getMonth()]} ${date.getDate()}, ${Time.fromDate(date).string}`
}

function Assignment (name, da=new Date(), dd=new Date(), w=0) {
    this.name = name;
    this.dateAssigned = da;
    this.dateDue = dd;
    this.weight = w;
    this.status = "o";
    this.id = toID(this.name)

    this.dateDuef = (() => {
        return Time.formatDateTime(this.dateDue);
    })();
}

function Block (startDate, endDate, desc="") {
    this.start = startDate;
    this.end = endDate;
    this.description = desc;
    this.id = toID(this.description)

    this.startf = (() => {
        return Time.formatDateTime(this.start);
    })();

    this.endf = (() => {
        return Time.formatDateTime(this.end);
    })();
}

function Lecture (startTime, endTime, type, days=[]) {
    this.start = startTime;
    this.end = endTime;
    this.type = type;
    this.days = days;
}

/* HELPER FUNCTIONS */

function removeObject(list, item) {
    const i = list.indexOf(item)
    list.splice(i, 1)
}

function formatSemesterDate (date) {
    let month = date.getMonth() + 1;
    let formattedMonth = ("0" + month).slice(-2)

    return `${formattedMonth}/${date.getFullYear()}`
}

function toID(string) {
    return string.replace(" ", "-").toLowerCase()
}


module.exports.User = User;
module.exports.Semester = Semester;
module.exports.Time = Time;
module.exports.Block = Block;
module.exports.Lecture = Lecture;
module.exports.Course = Course;
module.exports.Assignment = Assignment;
