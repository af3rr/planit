import React from 'react'
import PlusButton from '../buttons/PlusButton'

import '../../css/home.css';


class Home extends React.Component {
    dateRange = (s) => {
        return `${s.start.format('MM/DD/YY')} - ${s.end.format('MM/DD/YY')}`
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
                                    <span className="sem-dates"> {this.dateRange(s)} </span>
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
