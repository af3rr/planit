import React from 'react'
import PlusButton from '../buttons/PlusButton'
import '../../css/home.css';


class Home extends React.Component {
    formatDates = (sem) => {
        let pad = (i) => (i.toString().padStart(2, '0'))

        let [s, e] = [sem.start, sem.end]
        let [sM, sD] = [pad(s.getMonth()+1), pad(s.getDate())]
        let [eM, eD] = [pad(e.getMonth()+1), pad(e.getDate())]

        return `${sM}/${sD}/${s.getYear()-100} - ${eM}/${eD}/${e.getYear()-100}`
    }

    openAddSem = () => {
        this.props.open({name: 'AddSemester'})
    }

    render() {
        return (
            <div className="home">
                <header>
                    <h1> Semesters </h1>
                </header>

                <div className="sem-list">
                    {this.props.semesters.map((s, i) => {                        
                        let openSemester = () => this.props.open({name: 'ViewSemester', data: s})

                        return (
                            <div key={i} className={`sem ${++s.status === 1 ? 'new' : ''}`} onClick={openSemester}>
                                <div className="indicator"></div>

                                <div className="sem-wrapper">
                                    <span className="sem-title"> {s.title} </span>
                                    <span className="sem-dates"> {this.formatDates(s)} </span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <footer>
                    <PlusButton text="Add Semester" onClick={this.openAddSem}/>
                </footer>
            </div>
        )
    }
}

export default Home
