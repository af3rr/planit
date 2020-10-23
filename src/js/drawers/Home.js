import React from 'react'
import PlusButton from '../buttons/PlusButton'
import {EditOutlined} from '@ant-design/icons'
import Hoverable from '../modifiers/Hoverable'


import '../../css/drawers/home.css'


class Home extends React.Component {
    dateRange = (s) => `${s.start.format('MM/DD/YY')} - ${s.end.format('MM/DD/YY')}`


    render() {
        const {navigate} = this.props

        return (
            <div className="home">
                <header>
                    <h1> Semesters </h1>
                </header>

                <div className="sem-list">
                    {this.props.semesters.map((config, i) => (
                        <div className={`sem ${++config.status === 2 ? 'new' : ''}`} key={i}>
                            <button className="sem-wrapper" onClick={() => navigate({name: 'Semester', config})}>
                                <span className="sem-title"> {config.name} </span>
                                <span className="sem-dates"> {this.dateRange(config)} </span>
                            </button>

                            <button className="edit-semester" onClick={() => navigate({name: 'SemesterConfig', config})}>
                                <Hoverable>
                                    <EditOutlined style={{fontSize: '20px'}}/>
                                </Hoverable> 
                            </button>
                        </div>
                    ))}
                </div>

                <footer>
                    <PlusButton text="Add Semester" scale={1.25} onClick={() => navigate({name: 'SemesterConfig'})}/>
                </footer>
            </div>
        )
    }
}

export default Home
