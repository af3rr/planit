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
        const {courseCtrl, config} = this.props

        courseCtrl[config ? 'update' : 'add']({
            ...course, id: config?.id || uuid(),
        })

        this.discardChanges()
    }


    discardChanges = () => {        
        this.props.close()

        return this.form.current?.resetFields()
    }


    rules = {
        name: [{required: true, message: 'Please provide a course name'}],
        code: [{required: true, message: ' '}],
        credits: [{required: true, message: ' '}],
        color: [{
            required: true, 
            message: 'Please select a color', 
            validator: (r, v) => new Promise((p, f) => v ? p() : f(false))
        }]
    }    


    render() {
        return (
            <Form 
                ref={this.form}
                name="course-config"
                className="course-config"
                onFinish={(data) => this.saveCourse(data)}
            >
                <Form.Item name="name" rules={this.rules.name}>
                    <Input size="large" className="sem-name" placeholder="Course Name" maxLength={26} />
                </Form.Item>

                <fieldset>
                    <Form.Item name="code" rules={this.rules.code} className="course-code">
                        <Input size="middle" placeholder="Course Code" />
                    </Form.Item>

                    <Form.Item name="credits" rules={this.rules.credits} className="course-credits">
                        <Input size="middle" placeholder="Credits" type='number' />
                    </Form.Item>
                </fieldset>

                <Form.Item name="color" rules={this.rules.color} className="course-color">
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
