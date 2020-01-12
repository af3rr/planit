const pages = document.querySelectorAll('link[rel="import"]')

pages.forEach((page) => {
    let template = page.import.querySelector('.page-template')
    let content = document.importNode(template.content, true)

    if (page.href.match('home.html')) $(content.firstElementChild).addClass('active') 

    $('body').append(content)
})

$('#semesters header .img-button').on('click', (e) => {
    var homePage = $('section.page#home')
    var addSemesterPage = $('section.page#add-semester')

    animateCSS(homePage, 'fadeOut faster', () => {
        homePage.removeClass('active')
    })

    addSemesterPage.addClass('active')
    animateCSS(addSemesterPage, 'fadeIn faster')
})

function animateCSS (element, animationName, callback) {
    element.addClass(`animated ${animationName}`)

    function handleAnimationEnd() {
        element.removeClass(`animated ${animationName}`)
        element.off('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    element.on('animationend', handleAnimationEnd)
}