import React from 'react'
import {Button, Badge, } from 'antd'
import {DeleteOutlined} from '@ant-design/icons';

import '../../css/buttons/edt-course-btn.css';


function EditCourseButton(props) {
    return (
        <div className="edt-course-btn">
            <Button className="course-code" size="small"> 
                <Badge className="course-clr" color={props.color} />
                {props.course.code}
            </Button>

            <Button className="course-del" size="small" onClick={props.remove} > 
                <DeleteOutlined />
            </Button>
        </div>
    )
}

export default EditCourseButton
