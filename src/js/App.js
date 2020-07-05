import React from 'react';
import {Drawer} from 'antd';

import Home from './drawers/Home'
import Semester from './drawers/Semester'
import AddSemester from './forms/AddSemester'

import '../css/main.css';
import 'antd/dist/antd.less';

import data from './data.json'


class App extends React.Component {
    constructor() {
        super()

        // Convert strings to Date objects
        data.semesters.forEach((s) => {
            s.start = new Date(s.start)
            s.end = new Date(s.end)
        })

        this.state = {
            semesters: data.semesters,
            drawers: data.drawers,
            drawerWidth: 300
        }
    }

    componentDidMount() {
        this.openDrawer({name: 'Home'})
    }

    openDrawer = (drawer) => {
        this.setState(prev => {
            if (prev.open) prev.open.visible = false

            // Might be unnecessary. Should be able to just use drawer
            var nextDrawer = prev.drawers[drawer.name]

            nextDrawer.component = (() => {
                switch (drawer.name || '') {
                    case 'AddSemester':
                        return <AddSemester open={this.openDrawer} />
        
                    case 'ViewSemester':
                        return <Semester config={drawer.data} open={this.openDrawer} />
        
                    case 'SlideOut':
                        return null // Second level of slide out
        
                    default:
                        return <Home semesters={prev.semesters} open={this.openDrawer} />
                }
            })()

            // Bring nextDrawer to front and initiate animation
            nextDrawer.level = 105
            nextDrawer.visible = true
            
            prev.open = nextDrawer

            return prev
        })
    }

    drawerOpened = (drawer) => {
        // Move closed drawer to back
        if (!drawer.visible) {
            this.setState(prev => {
                prev.drawers[drawer.name].level = 100
                return prev
            })
        }
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
                </div>

                <div id="main" className="panel">
                    
                </div>
            </div>
        )
    }
}

export default App;
