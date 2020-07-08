import React from 'react'
import {Input, DatePicker, Form, Button, Popconfirm} from 'antd'
import {CalendarOutlined, PlusOutlined} from '@ant-design/icons'

import Group from '../components/Group'
import Dialog from '../components/Dialog'
import CourseConfig from '../forms/CourseConfig'
import EditCourseButton from '../buttons/EditCourseButton'

import '../../css/forms/semester-config.css';


class SemesterConfig extends React.Component {
    state = {
        courses: [],
        courseDialog: {
            open: false,
            config: null
        }
    }

    form = React.createRef();

    componentDidMount() {
        if (this.props.config) {
            let {config} = this.props

            this.form.current.setFieldsValue({
                name: config.name,
                range: [config.start, config.end]
            })

            this.setState({
                courses: config.courses
            })
        }
    }

    saveSemester = (semester) => {
        this.props.save({
            name: semester.name,
            start: semester.range[0],
            end: semester.range[1],
            courses: this.state.courses,
            status: 0
        })

        this.discardSemester()
    }

    discardSemester = () => {
        this.setState({courses: []})

        this.props.open({name: 'Home'})

        return this.form.current?.resetFields()
    }

    saveCourse = (course) => {
        // If courseDialog has config, we are editing
        // Otherwise just add course to list

        this.setState(prev => ({
            courses: prev.courseDialog.config ? 
                prev.courses.map(c => (c.id === course.id) ? course : c)
            : 
                [...prev.courses, course]
        }))

        this.setDialog(false)
    }

    editCourse = (course) => {
        this.setDialog({open: true, config: course})
    }

    deleteCourse = (course) => {
        this.setState(prev => ({
            courses: prev.courses.filter(c => c.id !== course.id)
        }))
    }

    setDialog = (settings) => {
        this.setState({courseDialog: settings})
    }

    render() {
        return (
            <>
                <Form 
                    ref={this.form}
                    name="semester-config"
                    className="semester-config"
                    onFinish={(data) => this.saveSemester(data)}
                >
                    <header>
                        <h1> {this.props.title} </h1>
                    </header>

                    <fieldset>
                        <Form.Item
                            name="name"
                            rules={[{required: true, message: 'Please provide a semester name' }]}
                        >
                            <Input size="large" className="sem-name" placeholder="Semester Name" maxLength={26} />
                        </Form.Item>

                        <Form.Item
                            name="range"
                            rules={[{required: true, message: 'Please provide a semester duration' }]}
                        >
                            <DatePicker.RangePicker className="date-rng" suffixIcon={<CalendarOutlined />}/>
                        </Form.Item>

                        <Group title="Courses">
                            {this.state.courses.map((c) => (
                                <EditCourseButton
                                    key={c.id}
                                    course={c}
                                    color="geekblue"
                                    edit={() => this.editCourse(c)}
                                    remove={() => this.deleteCourse(c)}
                                />
                            ))}
                        </Group>

                        <Button className="course-add" type="dashed" size="small" onClick={() => this.setDialog({open: true})}>
                            <PlusOutlined/> 
                        </Button>
                    </fieldset>

                    <footer>
                        <Popconfirm 
                            title={`Discard the current semester?`} 
                            onConfirm={() => this.discardSemester()} 
                            placement="topRight"
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size="small"> Cancel </Button>
                        </Popconfirm>

                        <Button type="primary" size="small" htmlType="submit"> Save </Button>
                    </footer>
                </Form>

                <Dialog 
                    title="Create Course" 
                    visible={this.state.courseDialog.open}
                    close={() => this.setDialog({open: false})}
                    width={375}
                    overlay 
                > 
                    <CourseConfig title='Add Course' save={this.saveCourse} config={this.state.courseDialog.config}/>
                </Dialog>
            </>
        )
    }
}

export default SemesterConfig
