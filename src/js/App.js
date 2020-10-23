import React from 'react';
import moment from 'moment'
import {Drawer} from 'antd';
import {v4 as uuid} from 'uuid'

import Dialog from './components/Dialog'
import Home from './drawers/Home'
import Semester from './drawers/Semester'
import SemesterConfig from './forms/SemesterConfig'
import DialogContext from './contexts/DialogContext'

import '../css/main.css';
import 'antd/dist/antd.less';

import TEST_USER from './test_user.json'


class App extends React.Component {
    constructor() {
        super()

        // Convert date strings to Moment objects
        TEST_USER.semesters.forEach((s) => {
            s.start = moment(s.start)
            s.end = moment(s.end)
            s.id = uuid()

            s.courses.forEach(c => c.id = uuid())
        })

        const STD_DIALOG = {
            title: '',
            content: undefined,
            visible: false,
            width: 375
        }

        this.state = {
            open: undefined,
            drawerWidth: 300,
            semesters: TEST_USER.semesters,
            dialog: {
                config: STD_DIALOG,
                closeDialog: c => this.setState(s => {s.dialog.config = c || STD_DIALOG; return s}),
                openDialog: c => this.setState(s => {s.dialog.config = c; return s})
            },
            drawers: {
                Home: {name: 'Home'},
                Semester: {name: 'Semester'},
                SemesterConfig: {name: 'SemesterConfig'}
            }
        }
    }


    componentDidMount() {
        /* FETCH USER DATA HERE */

        this.openDrawer({name: 'Home'})
    }


    openDrawer = ({name, config}) => {
        this.setState(state => {            
            const drawer = state.drawers[name]

            if (state.open) {
                state.open.visible = false
                state.open.level = 100
            }

            // Bring drawer to front and initiate animation
            drawer.level = 110
            drawer.visible = true
            drawer.config = config
            
            state.open = drawer
            state.mask = 1

            return state
        })
    }


    semCtrl = { // Functions for adding/removing/updating semesters
        add: (sem) => {
            this.setState(prev => ({
                semesters: [...prev.semesters, sem]
            }))
        },
        delete: (sem) => {
            this.setState(prev => ({
                semesters: prev.semesters.filter(s => s.id !== sem.id)
            }))
        },
        update: (sem) => {
            this.setState(prev => ({
                semesters: prev.semesters.map(s => (s.id === sem.id) ? sem : s)
            }))
        }
    }


    render() {
        return (
            <div className="app">
                <div id="titlebar"></div>

                <DialogContext.Provider value={this.state.dialog}>
                    <div id="side" className="panel">
                        {Object.entries(this.state.drawers).map(([name, drawer], i) => (
                            <Drawer
                                key={i}
                                style={{width: `${this.state.drawerWidth}px`}}
                                bodyStyle={{padding: 0}}
                                width={300}
                                placement="left"
                                mask={false}
                                closable={false}
                                zIndex={drawer.level}
                                visible={drawer.visible}
                                getContainer={'#side.panel'}
                                destroyOnClose={true}
                                afterVisibleChange={() => this.setState({mask: 0})}
                                onClose={() => this.closeDrawer(drawer)}
                            >
                                {
                                    {
                                        'Home': <Home semesters={this.state.semesters} navigate={this.openDrawer} />,
                                        'Semester': <Semester config={drawer.config} navigate={this.openDrawer} />,
                                        'SlideOut': null,
                                        'SemesterConfig': <SemesterConfig 
                                            config={drawer.config}
                                            semCtrl={this.semCtrl}
                                            navigate={this.openDrawer}
                                        />
                                    }[name]
                                }
                            </Drawer>
                        ))}
                    </div>

                    <div id="main" className="panel"></div>

                    <DialogContext.Consumer>
                        {({config, closeDialog}) => (
                            <Dialog 
                                title={config.title}
                                visible={config.visible}
                                close={closeDialog}
                                width={375}
                                overlay 
                            >
                                {config.content}
                            </Dialog>
                        )}
                    </DialogContext.Consumer>

                </DialogContext.Provider>
            </div>
        )
    }
}

export default App;
