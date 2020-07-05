import React from 'react'
import {v4 as uuid} from 'uuid'
import {Input, DatePicker, Form, Button} from 'antd'
import {CalendarOutlined, PlusOutlined} from '@ant-design/icons';

import Group from '../components/Group'
import EditCourseButton from '../buttons/EditCourseButton'

import '../../css/add-sem.css';


class AddSemester extends React.Component {
    state = {courses: this.props.courses}
    form = React.createRef();

    componentDidMount() {
        this.form.current.setFieldsValue({
            title: this.props.title,
            range: this.props.range,
        })
    }

    save(s) {
        this.props.addSemester({
            title: s.title,
            start: s.range[0],
            end: s.range[1],
            courses: this.state.courses,
            status: 0
        })

        this.discard()
    }
    
    discard() {
        this.setState({courses: []})

        this.props.open({name: 'Home'})
        this.form.current.resetFields()
    }

    createCourse() {
        return new Promise((resolve) => {
            /* OPEN FORM POPUP */
            setTimeout(() => resolve({
                title: 'Discrete Structures in Computing II',
                code: 'CIS 2910',
                color: 'geekblue',
                credits: 0.25,
                id: uuid()
            }), 0)

        }).then(course => {
            this.setState(prev => ({
                courses: [...prev.courses, course]
            }))
        })
    }

    deleteCourse(course) {
        new Promise((resolve) => {
            /* OPEN CONFIRMATION POPUP */
            setTimeout(() => resolve(true), 300)
        }).then(res => {
            this.setState(prev => ({
                courses: prev.courses.filter(c => c.id !== course.id)
            }))
        })
    }

    render() {
        return (
            <Form 
                ref={this.form}
                name="add-semester"
                className="add-semester"
                onFinish={(v) => this.save(v)}
            >
                <header>
                    <h1> Add Semester </h1>
                </header>

                <div className="fieldset">
                    <Form.Item
                        name="title"
                        rules={[{ 
                            required: true, 
                            message: 'Please provide a semester name' }
                        ]}
                    >
                        <Input size="large" className="sem-name" placeholder="Semester Name" maxLength={26} />
                    </Form.Item>

                    <Form.Item
                        name="range"
                        rules={[{ 
                            required: true, 
                            message: 'Please provide a semester duration' }
                        ]}
                    >
                        <DatePicker.RangePicker className="date-rng" suffixIcon={<CalendarOutlined />}/>
                    </Form.Item>

                    <Group title="Courses">
                        {this.state.courses.map((c) => (
                            <EditCourseButton
                                key={c.id}
                                course={c}
                                color="geekblue"
                                remove={() => this.deleteCourse(c)}
                            />
                        ))}
                    </Group>

                    <Button className="course-add" type="dashed" size="small" onClick={() => this.createCourse()}>
                        <PlusOutlined/> 
                    </Button>
                </div>

                <footer>
                    <Button size="small" onClick={() => this.discard()}> Cancel </Button>
                    <Button type="primary" size="small" htmlType="submit"> Save </Button>
                </footer>
            </Form>
        )
    }
}

AddSemester.defaultProps = {
    title: '',
    range: null,
    courses: []
}

export default AddSemester
