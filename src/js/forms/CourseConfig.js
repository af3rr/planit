import React from 'react'
import {v4 as uuid} from 'uuid'
import {Input, Form, Button} from 'antd'

import ColorPicker from '../components/ColorPicker'

import '../../css/forms/course-config.css';


class CourseConfig extends React.Component {
    form = React.createRef();

    componentDidMount() {
        if (this.props.config) {
            let {name, code, credits, color} = this.props.config

            this.form.current.setFieldsValue({name, code, credits, color})
        }
    }

    saveCourse = (course) => {
        // Get ID from config if editing, otherwise generate new
        this.props.save({...course, id: this.props.config?.id || uuid()})

        this.discardCourse()
    }

    discardCourse = () => (
        this.form.current?.resetFields()
    )

    verifyColor = (rule, value) => (
        new Promise((resolve, reject) => value ? resolve() : reject(false))
    )

    render() {
        return (
            <Form 
                ref={this.form}
                name="course-config"
                className="course-config"
                onFinish={(data) => this.saveCourse(data)}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: 'Please provide a course name'}]}
                >
                    <Input size="large" className="sem-name" placeholder="Course Name" maxLength={26} />
                </Form.Item>

                <fieldset>
                    <Form.Item
                        name="code"
                        className="course-code"
                        rules={[{required: true, message: ' '}]}
                    >
                        <Input size="middle" placeholder="Course Code" />
                    </Form.Item>

                    <Form.Item
                        name="credits"
                        className="course-credits"
                        rules={[{required: true, message: ' '}]}
                    >
                        <Input size="middle" placeholder="Credits" type='number' />
                    </Form.Item>
                </fieldset>

                <Form.Item
                    name="color"
                    className="course-color"
                    rules={[{required: true, message: 'Please select a color', validator: this.verifyColor}]}
                >
                    <ColorPicker />
                </Form.Item>

                <footer>
                    <Button size="middle" htmlType="submit"> Save </Button>
                </footer>
            </Form>
        )
    }
}

export default CourseConfig
