import React from 'react';

import Home from './panels/Home'
import Semester from './panels/Semester'
import AddSemester from './forms/AddSemester'

import data from './data.json'

import '../css/main.css';

class App extends React.Component {
    constructor() {
        super()

        data.semesters.forEach((s) => {
            s.start = new Date(s.start)
            s.end = new Date(s.end)
        })

        this.state = {
            semesters: data.semesters,
            panel: <Home semesters={data.semesters} goTo={this.open} />
        }
    }

    open = (panel) => {
        let p = null

        switch (panel.name || "") {
            case 'AddSemester':
                p = <AddSemester goTo={this.open} />
                break

            case 'Semester':
                p = <Semester semester={panel.data} goTo={this.open} />
                break

            case 'SlideOut':
                break

            default:
                p = <Home semesters={this.state.semesters} />
                break
        }

        this.setState({panel: p})
    }

    render() {
        return (
            <div className="app">
                <div id="titlebar"></div>

                <div id="side" className="panel">
                    {this.state.panel}
                </div>

                <div id="main" className="panel">

                </div>
            </div>
        )
    }
}

export default App;
