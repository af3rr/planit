import React from 'react';
import {Drawer} from 'antd';

import Home from './drawers/Home'
import Semester from './drawers/Semester'
import AddSemester from './forms/AddSemester'
import moment from 'moment'

import '../css/main.css';
import 'antd/dist/antd.less';

import data from './data.json'


class App extends React.Component {
    constructor() {
        super()

        // Convert strings to Date objects
        data.semesters.forEach((s) => {
            s.start = moment(s.start)
            s.end = moment(s.end)
        })

        this.state = {
            semesters: data.semesters,
            drawers: data.drawers,
            drawerWidth: 300,
            mask: 0
        }
    }

    componentDidMount() {
        this.openDrawer({name: 'Home'})
    }

    openDrawer = (drawer) => {
        this.setState(prev => {
            if (prev.open) {
                prev.open.visible = false
                prev.open.level = 100
            }

            var nextDrawer = prev.drawers[drawer.name]

            nextDrawer.component = (() => {
                switch (drawer.name || '') {
                    case 'AddSemester':
                        return <AddSemester addSemester={this.addSemester} open={this.openDrawer} />
        
                    case 'ViewSemester':
                        return <Semester config={drawer.data} open={this.openDrawer} />
        
                    case 'SlideOut':
                        return null // Second level of slide out
        
                    default:
                        return <Home semesters={prev.semesters} open={this.openDrawer} />
                }
            })()

            // Bring nextDrawer to front and initiate animation
            nextDrawer.level = 110
            nextDrawer.visible = true
            
            prev.open = nextDrawer
            prev.mask = 1

            return prev
        })
    }

    drawerOpened = (drawer) => {
        this.setState({mask: 0})
    }

    addSemester = (semester) => {
        this.setState(prev => ({
            semesters: [...prev.semesters, semester]
        }))
    }

    render() {
        return (
            <div className="app">
                <div id="titlebar"></div>

                <div id="side" className="panel">
                    {Object.entries(this.state.drawers).map(([_, config], i) => (
                        <Drawer
                            key={i}
                            style={{width: `${this.state.drawerWidth}px`}}
                            bodyStyle={{padding: 0}}
                            width={this.state.drawerWidth}
                            placement="left"
                            mask={false}
                            closable={false}
                            zIndex={config.level}
                            visible={config.visible}
                            getContainer={'#side.panel'}
                            onClose={() => this.closeDrawer(config)}
                            afterVisibleChange={() => this.drawerOpened(config)}
                        >
                            {config.component}
                        </Drawer>
                    ))}

                    <div id="mask" style={{opacity: this.state.mask}}></div>
                </div>

                <div id="main" className="panel">
                    
                </div>
            </div>
        )
    }
}

export default App;
