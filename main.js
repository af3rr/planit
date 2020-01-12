const path = require('path')
const glob = require('glob')
const settings = require("electron-settings")

const {ipcMain} = require('electron')
const {app, BrowserWindow} = require('electron')
const {User, Semester, Course, Time, Assignment, Lecture, Block} = require("./assets/model")

const debug = /--debug/.test(process.argv[2])

let mainWindow = null

function initialize () {
    makeSingleInstance()

    /* loadDemos() */

    /* settings.delete('user') */
    if ( !settings.has('user') ) settings.set('user', makeExampleUser())

    function createWindow () {
        const windowOptions = {
            width: 1080,
            minWidth: 10,
            minHeight: 600,
            height: 680,
            title: 'Planit',
            webPreferences: {
                nodeIntegration: true
            }
        }

        mainWindow = new BrowserWindow(windowOptions)
        mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

        if (debug) {
            mainWindow.webContents.openDevTools()
            /* mainWindow.maximize() */
            require('devtron').install()
        }

        mainWindow.on('close', (event) => {
            if (mainWindow) {
                event.preventDefault()
                mainWindow.webContents.send('save-user')
            }
        })
    }

    app.on('ready', () => {
        createWindow()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            /* app.quit() */
        }
    })

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

ipcMain.on('saved', () => {
    mainWindow = null
    app.quit()
})

function makeSingleInstance () {
    if (process.mas) return

    app.requestSingleInstanceLock()

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos () {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
    files.forEach((file) => { require(file) })
}

function makeExampleUser () {
    var user = new User();
    var sem1 = new Semester("Winter 2019", new Date("01/06/2019"), new Date("04/20/2019"));
    var sem2 = new Semester("Fall 2019", new Date("09/06/2019"), new Date("12/20/2019"));

    var cis2430 = new Course("Object Oriented Programming", "CIS 2430", 0.5, "A");
    var stats2040 = new Course("Statistics", "STATS 2040", 0.5, "C");
    var cis2520 = new Course("Data Structures", "CIS 2520", 0.5, "F");

    stats2040.lectures.push( new Lecture(new Time("11:00", "am"), new Time("12:20", "pm"), "lec", ['M', 'T', 'W']) );

    stats2040.assignments.push( new Assignment("Assignment 1", new Date(2019, 11, 15, 15, 23, 0, 0), new Date(2019, 11, 31, 15, 23, 0, 0), 25) ) 
    stats2040.assignments.push( new Assignment("Assignment 2", new Date(2019, 10, 23, 23, 59, 0, 0), new Date(2019, 10, 23, 23, 59, 0, 0), 25) )

    sem1.courses.push(stats2040);
    sem1.colors[stats2040] = stats2040.color

    sem1.courses.push(cis2430);
    sem1.colors[cis2430] = cis2430.color

    sem1.courses.push(cis2520);
    sem1.colors[cis2520] = cis2520.color

    user.semesters.push(sem2);
    user.semesters.push(sem1);

    var start = new Date(2019, 11, 10, 13, 0, 0, 0)
    var end = new Date(2019, 11, 10, 17, 30, 0, 0)
    sem1.events.push( new Block(start, end, "Shift") )

    var start = new Date(2019, 11, 7, 8, 0, 0, 0)
    var end = new Date(2019, 11, 7, 13, 30, 0, 0)
    sem2.events.push( new Block(start, end, "Shift") )

    return user;
}

initialize()
