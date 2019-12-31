const settings = require("electron-settings")
window.$ = window.jQuery = require("./lib/jquery-3.4.1")

const pages = document.querySelectorAll('link[rel="import"]')
const user = settings.get('user')

pages.forEach((page) => {
    let template = page.import.querySelector(".page-template")
    let content = document.importNode(template.content, true)

    if (page.href.match('home.html')) $(content.firstElementChild).addClass("active") 

    $("body").append(content)
})

user.semesters.forEach((s, i) => {
    $("#semesters .item-list").append( semesterButton(s) )
    $("#courses .item-list").append(`<section id="${s.id}"></section>`)

    s.courses.forEach((c, i) => {
        $(`#courses .item-list #${s.id}`).append( courseButton(c) )
        $("#assignments .item-list").append(`<section id="${c.id}"></section>`)

        c.assignments.forEach((a, i) => {
            isLast = (i === c.assignments.length-1)
            $(`#assignments .item-list #${c.id}`).append( assignmentButton(a, isLast) )
        });
    });
});

user.events.forEach((e, i) => {
    $(`#events .item-list`).append( eventButton(e) )
});


function semesterButton (sem) {
    var button = buttonTemplate("semester")

    $(button).find("span").text(sem.name)
    $(button).find("h5").text(`${sem.startf} - ${sem.endf}`)
    button.id = sem.id

    return button
}

function courseButton (course) {
    var button = buttonTemplate("course")

    $(button).find(".course-color-indicator").addClass(course.color)
    $(button).find("span").text(course.code)
    button.id = course.id

    return button
}

function assignmentButton (assignment, isLast) {
    var button = buttonTemplate("assignment")

    $(button).find(".description-wrapper span").text(assignment.title)
    $(button).find(".description-wrapper h5").text(assignment.dateDuef)
    button.id = assignment.id

    if (isLast) $(button).addClass("last")

    return button
}

function eventButton (event) {
    var button = buttonTemplate("event")

    $(button).find(".description-wrapper span").text(event.description)
    $(button).find(".description-wrapper h5").text(event.startf)
    button.id = event.id

    return button
}

function buttonTemplate(section) {
    let template = $(`#${section}-button-template`)[0]
    let fragment = document.importNode(template.content, true)

    return fragment.firstElementChild
}
