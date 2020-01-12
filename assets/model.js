function User () {
    this.semesters = [];
}

function Semester (semesterName, startDate, endDate) {
    this.name = semesterName;
    this.start = startDate;
    this.end = endDate;
    this.courses = [];
    this.events = [];
    this.colors = {};

    this.startf = formatSemesterDate(this.start);
    this.endf = formatSemesterDate(this.end);
    this.id = toID(this.name)
}

Semester.clone = (obj) => {
    var semester = new Semester(obj.name, new Date(obj.start), new Date(obj.end))

    semester.courses = obj.courses
    semester.colors = obj.colors

    return semester
}

function Course (name="", code="", credits=0, color="X") {
    this.name = name;
    this.code = code;
    this.credits = credits;
    this.color = color;
    this.id = toID(code);
    this.assignments = [];
    this.lectures = [];
}

Course.clone = (obj) => {
    var course = new Course(obj.name, obj.code, obj.credits, obj.color)

    course.assignments = obj.assignments
    course.lectures = obj.lectures

    return course
}

function Time (string) {
    this.time = string.split(" ")[0];
    this.period = string.split(" ")[1];
    this.minutes = this.time.split(":")[1]
    this.hours24 = this.time.split(":")[0]

    this.date = (() => {
        let hh = parseInt(this.hours24)
        let mm = parseInt(this.minutes)

        return new Date(0, 0, 0, hh, mm, 0, 0)
    })();

    this.hours12 = (() => {
        return (parseInt(this.hours24) % 12) || 12
    })();

    this.string = (() => {
        return `${this.hours12}:${this.minutes}${this.period}`
    })();
}

Time.months = ["Jan.", "Feb.", "March", "Apr", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]

Time.fromDate = (date) => {
    let hh = date.getHours() 
    let mm = ("0" + date.getMinutes()).slice(-2)
    let period = (date.getHours() >= 12) ? "pm" : "am"

    let t = new Time(`${hh}:${mm} ${period}`)

    return t
}

Time.formatDateTime = (date) => {
    return `${Time.months[date.getMonth()]} ${date.getDate()}, ${Time.fromDate(date).string}`
}

function Assignment (name, da, dd, w=0) {
    this.name = name;
    this.assigned = da;
    this.due = dd;
    this.duef = Time.formatDateTime(dd)
    this.weight = w;
    this.status = "o";
    this.id = toID(this.name)
}

Assignment.clone = (obj) => {
    var assignment = new Assignment(obj.name, new Date(obj.assigned), new Date(obj.due), obj.weight)

    assignment.status = obj.status

    return assignment
}

function Block (startDate, endDate, desc="") {
    this.start = startDate;
    this.end = endDate;
    this.description = desc;
    this.id = toID(this.description)

    this.startf = Time.formatDateTime(this.start);
    this.endf = Time.formatDateTime(this.end);
}

function Lecture (startTime, endTime, type, days=[]) {
    this.start = startTime;
    this.end = endTime;
    this.type = type;
    this.days = days;
}

/* HELPER FUNCTIONS */

function removeObject(list, item) {
    let i = list.indexOf(item)
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
