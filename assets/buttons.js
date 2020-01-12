function createSemester (sem) {
    var button = buttonTemplate("semester")

    $(button).find("span").text(sem.name)
    $(button).find("h5").text(`${sem.startf} - ${sem.endf}`)
    button.id = sem.id

    return button
}

function createCourse (course) {
    var button = buttonTemplate("course")

    $(button).find(".course-color-indicator").addClass(course.color)
    $(button).find("span").text(course.code)
    button.id = course.id

    return button
}

function createAssignment (assignment, isLast) {
    var button = buttonTemplate("assignment")

    $(button).find(".description-wrapper span").text(assignment.name)
    $(button).find(".description-wrapper h5").text(assignment.duef)
    button.id = assignment.id

    if (isLast) $(button).addClass("last")

    return button
}

function createEvent (event) {
    var button = buttonTemplate("event")

    $(button).find(".description-wrapper span").text(event.description)
    $(button).find(".description-wrapper h5").text(event.startf)
    button.id = event.id

    return button
}

function buttonTemplate (section) {
    let template = $(`#${section}-button-template`)[0]
    let fragment = document.importNode(template.content, true)

    return fragment.firstElementChild
}

module.exports.createSemester = createSemester;
module.exports.createCourse = createCourse;
module.exports.createAssignment = createAssignment;
module.exports.createEvent = createEvent;
