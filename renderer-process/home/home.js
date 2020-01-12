const settings = require('electron-settings')
const Buttons = require('../../assets/buttons')

const {ipcRenderer} = require('electron');
const {User, Semester, Course, Assignment, Block} = require('../../assets/model')

const user = settings.get('user')

const current = {
    get semester () {
        var semID = $('#semesters .item-list .current')[0].id
        return user.semesters.find(s => s.id === semID)
    },

    get course () {
        var courseID = $('#courses .item-list .current')[0].id
        return this.semester.courses.find(c => c.id === courseID)
    }
}

/* SEMESTER/COURSE SELECTION */

$('#semesters').on('click', (e) => {
    if ( !$(e.target).parents('.semester-button').length ) {
        if ( !$(e.target).hasClass('semester-button') ) {
            $('#assignment-display header .img-button').addClass('inactive')
            $('#semesters, #events, #courses, #assignments').find('.active, .current').removeClass('active current')
            resetAssignments()
        }
    }
})

$('#semesters').on('click', '.semester-button', (e) => {
    var btn = $(e.target).parents('.semester-button')[0] || e.target

    resetAssignments()

    // Can't add an assignment after semester is selected
    $('#assignment-display header .img-button').addClass('inactive') 
    // Remove all active .item-lists in courses and assignments and deselect buttons
    $('#semesters, #events, #courses, #assignments').find('.active, .current').removeClass('active current')
    
    $(`#courses section#${btn.id}`).addClass('active')
    $(`#events section#${btn.id}`).addClass('active')
    $(btn).addClass('current')
})

$('#courses').on('click', '.course-button', (e) => {
    var btn = $(e.target).parents('.course-button')[0] || e.target
    var semester = user.semesters.find( s => s.id === $('#semesters .current')[0].id )

    resetAssignments()

    // An assignment may be added to the selected course
    $('#assignment-display header .img-button').removeClass('inactive')
    // Clear the active course's assignments and deselect the current course button 
    $('#assignment-display .item-list, #courses .item-list section').find('.active, .current').removeClass('active current')

    $(`#assignment-display #${btn.id}`).addClass('active')
    $('#assignments').addClass(semester.colors[btn.id])
    $(btn).addClass('current')
})



/* ASSIGNMENT/EVENT COMPLETION & DELETION */

$('#assignments').on('click', '.checkbox', (e) => {
    var button = $(event.target).closest('.assignment')
    var otherButton = button.find('.img-button')
    
    if (otherButton.hasClass('delete-item')) {
        otherButton.attr('src', 'assets/img/edit1.svg')
    } else {
        otherButton.attr('src', 'assets/img/exit1.svg')
    }

    otherButton.toggleClass('edit-item delete-item');
    button.toggleClass('complete');
})

$('#events').on('click', '.complete-event', (e) => {
    var eventButton = $(e.target).closest('.event')

    animateCSS(eventButton, 'fadeOutRight faster', () => {
        eventButton.addClass('completed')
    })
})

$('#assignments').on('click', '.delete-item', (e) => {
    var button = $(e.target).closest('.assignment')
    var assignment = current['course'].assignments.find(a => a.id === button[0].id)

    assignment.status = 'x'

    if (button.hasClass('last')) {
        var previous = button.prev()

        while ( previous.hasClass('removed') ) 
            previous = previous.prev()
        
        previous.addClass('last')
    }

    animateCSS(button, 'fadeOut faster', () => {
        button.addClass('removed')
    })
})

$('#events').on('click', '.delete-item', (e) => {
    var button = $(e.target).closest('.event')

    animateCSS(button, 'fadeOut faster', () => {
        button.addClass('removed')
    })
})


/* FORM DISPLAY & SUBMISSION (NEW ASSIGNMENT/EVENT) */

$('#assignments header .img-button').on('click', (e) => {
    if ( $('#courses .item-list .current') ) swapPanel('assignment')
})

$('#new-assignment form.create .save-button').on('click', (e) => {
    let form = $('#new-assignment form.create')
    let title = form.find('#assignment-title')
    let assignedDate = form.find('#date-assigned').val()
    let dueDate = form.find('#date-due').val()
    let weight = form.find('#assignment-weight').val()

    let assmnt = new Assignment(title.val(), toDate(assignedDate), toDate(dueDate), weight)

    addAssignmentButton( assmnt )

    if (title.val()) 
        swapPanel('assignment') 
    else
        animateCSS(title, 'shake faster')
})

$('#events header .img-button').on('click', (event) => {
    swapPanel('event')
})

$('#new-event form.create .save-button').on('click', (e) => {
    let form = $('#new-event form.create')
    let title = form.find('#event-title')
    let startDate = form.find('#event-start').val()
    let endDate = form.find('#event-end').val()

    let event = new Block(toDate(startDate), toDate(endDate), title.val())

    addEventButton( event )

    if (title.val())
        swapPanel('event') 
    else
        animateCSS(title, 'shake faster')
})



/* HELPER FUNCTIONS */

function addEventButton (event) {
    var btn = Buttons.createEvent(event)

    $(`#events .item-list`).append(btn)

    current['semester'].events.push(event)
}

function addAssignmentButton (assignment) {
    var btn = Buttons.createAssignment( assignment, true )
    var course = current['course']

    $(`#assignments .item-list #${course.id} .last`).removeClass('last')
    $(`#assignments .item-list #${course.id}`).append( btn )

    course.assignments.push(assignment)
}

function removeButton (event, type) {
    var button = $(event.target).closest(`.${type}`)

    animateCSS(button, 'fadeOut faster', () => {
        button.addClass('removed')
    })
}

function toDate (string) {
    string = string.slice(0, -2).split(' ')

    var date = string[0].split('/')
    var time = string[1] + ':00'
    
    return new Date(`${date[2]}-${date[1]}-${date[0]}T${time}`)
}

function resetAssignments () {
    if ( $('#new-assignment.show').length ) $('#assignments .show header .img-button').click()
    $('#new-assignment input').val('')
    $('#assignments').removeClass()
}

function swapPanel (panel) {
    var current = $(`#${panel}s section.show`)
    var next = $(`#${panel}s section.${panel}-section`).not('.show')

    animateCSS(current, 'fadeOutRight faster', () => {
        current.removeClass('show')
        next.addClass('show')

        animateCSS(next, 'fadeIn faster')
    })

    $(`#new-${panel} input`).val('')
}

function animateCSS (element, animationName, callback) {
    element.addClass(`animated ${animationName}`)

    function handleAnimationEnd() {
        element.removeClass(`animated ${animationName}`)
        element.off('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    element.on('animationend', handleAnimationEnd)
}

ipcRenderer.on('save-user', () => {
    settings.set('user', user)
    ipcRenderer.send('saved')
})

/* window.onbeforeunload = (event) => {
    event.returnValue = true // Set this value to anything to prevent close
} */