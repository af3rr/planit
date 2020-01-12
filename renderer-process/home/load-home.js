const settings = require('electron-settings')
const Buttons = require('../../assets/buttons')

const user = settings.get('user')

user.semesters.forEach((sem) => {
    $('#semesters .item-list').append( Buttons.createSemester(sem) )
    $('#courses .item-list').append(`<section id='${sem.id}'></section>`)
    $('#events .item-list').append(`<section id='${sem.id}'></section>`)

    sem.courses.forEach((crs) => {
        $(`#courses .item-list #${sem.id}`).append( Buttons.createCourse(crs) )
        $('#assignments .item-list').append(`<section id='${crs.id}'></section>`)

        crs.assignments.filter((a) => {return (a.status === 'o')}).forEach((asmnt, i) => {
            var isLast = (i === crs.assignments.length-1)
            
            $(`#assignments .item-list #${crs.id}`).append( Buttons.createAssignment(asmnt, isLast) )
        });
    });

    sem.events.forEach((e) => {
        $(`#events .item-list #${sem.id}`).append( Buttons.createEvent(e) )
    });
});