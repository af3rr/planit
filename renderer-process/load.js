const pages = document.querySelectorAll('link[rel="import"]')

pages.forEach((p) => {
    if ( p.href.match('home.html') || p.href.match('new-semester.html'))
        $('body').append(content(p, '.page-template'))

    if ( p.href.match('templates.html') )
        $('body').append(content(p, '#home-templates'))
})

$("section.page#home").addClass('active')


function content (page, selector) {
    var template = page.import.querySelector(selector)

    return document.importNode(template.content, true)
}