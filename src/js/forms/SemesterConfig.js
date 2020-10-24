import React from 'react'
import {v4 as uuid} from 'uuid'
import {Input, DatePicker, Form, Button, Popconfirm} from 'antd'
import {CalendarOutlined, PlusOutlined, DeleteOutlined} from '@ant-design/icons'

import Group from '../components/Group'
import EditCourseButton from '../buttons/EditCourseButton'
import Hoverable from '../modifiers/Hoverable'
import CourseConfig from '../forms/CourseConfig'
import DialogContext from '../contexts/DialogContext'

import '../../css/forms/semester-config.css';


class SemesterConfig extends React.Component {
    state = {courses: []}

    form = React.createRef()


    componentDidMount() {
        this.config = this.props.config
        this.semCtrl = this.props.semCtrl

        if (this.config) {
            let {name, start, end, courses, id} = this.config

            this.form.current.setFieldsValue({name, range: [start, end], id})

            this.setState({courses})
        }
    }


    saveSemester = (semester) => {
        this.semCtrl[this.config ? 'update' : 'add']({
            id: semester.id || uuid(),
            name: semester.name,
            start: semester.range[0],
            end: semester.range[1],
            courses: this.state.courses,
            status: -1
        })

        this.discardChanges()
    }


    deleteSemester = () => {
        this.discardChanges()

        this.semCtrl.delete(this.config)
    }


    discardChanges = () => {
        this.setState({courses: []})

        this.props.navigate({name: 'Home'})

        return this.form.current?.resetFields()
    }


    rules = {
        name: [{required: true, message: 'Please provide a semester name'}],
        range: [{required: true, message: 'Please provide a semester duration'}]
    }


    courseCtrl = {
        add: (course) => {
            this.setState(prev => ({
                courses: [...prev.courses, course]
            }))
        },
        delete: (course) => {
            this.setState(prev => ({
                courses: prev.courses.filter(c => c.id !== course.id)
            }))
        },
        update: (course) => {
            this.setState(prev => ({
                courses: prev.courses.map(c => (c.id === course.id) ? course : c)
            }))
        }
    }


    render() {
        return (
            <Form 
                ref={this.form}
                name="semester-config"
                className="semester-config"
                onFinish={this.saveSemester}
            >
                <header>
                    {this.config ?
                        <>
                            <h1> Edit Semester </h1>

                            <Popconfirm 
                                title={'Are you sure you want to delete the semester?'} 
                                onConfirm={this.deleteSemester} 
                                placement="bottomLeft"
                                okText="Yes"
                                cancelText="No"
                            >
                                <button className="del-semester">
                                    <Hoverable scale={1.25}> <DeleteOutlined /> </Hoverable>
                                </button>
                            </Popconfirm>
                        </>
                    : 
                        <h1> Add Semester </h1>
                    }
                </header>

                <Form.Item name="id" noStyle>
                    <Input hidden/>
                </Form.Item>

                <Form.Item name="name" rules={this.rules.name}>
                    <Input size="large" className="sem-name" placeholder="Semester Name" maxLength={26} />
                </Form.Item>

                <Form.Item name="range" rules={this.rules.range}>
                    <DatePicker.RangePicker className="date-rng" suffixIcon={<CalendarOutlined />}/>
                </Form.Item>

                <div className="group-wrapper">
                    <Group title="Courses">
                        {this.state.courses.map((c, i) => (
                            <DialogContext.Consumer key={i}>
                                {({openDialog, closeDialog}) => (
                                    <EditCourseButton
                                        key={c.id}
                                        course={c}
                                        courseCtrl={this.courseCtrl}
                                        onClick={() => openDialog({
                                            title: 'Edit Course',
                                            visible: true,
                                            width: 375,
                                            content: (
                                                <CourseConfig 
                                                    courseCtrl={this.courseCtrl} 
                                                    close={closeDialog} 
                                                    config={c}
                                                />
                                            )
                                        })}
                                    />
                                )}
                            </DialogContext.Consumer>
                        ))}
                    </Group>

                    <DialogContext.Consumer>
                        {({openDialog, closeDialog}) => (
                            <Button 
                                className="course-add" 
                                type="dashed" 
                                size="small" 
                                onClick={() => openDialog({
                                    title: 'Add Course',
                                    visible: true,
                                    width: 375,
                                    content: (
                                        <CourseConfig 
                                            courseCtrl={this.courseCtrl} 
                                            close={closeDialog} 
                                        />
                                    )
                                })}
                            >
                                <PlusOutlined/> 
                            </Button>
                        )}
                    </DialogContext.Consumer>
                </div>

                <footer>
                    <Popconfirm 
                        title={this.config ? 'Discard changes to semester?' : 'Discard the current semester?'} 
                        onConfirm={() => this.discardChanges()} 
                        placement="topRight"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button size="small"> Cancel </Button>
                    </Popconfirm>

                    <Button type="primary" size="small" htmlType="submit"> Save </Button>
                </footer>
            </Form>
        )
    }
}

export default SemesterConfig
