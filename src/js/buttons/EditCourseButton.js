import React from 'react'
import {Button, Badge, Popconfirm} from 'antd'
import {DeleteOutlined} from '@ant-design/icons';

import '../../css/buttons/edt-course-btn.css';


function EditCourseButton({course, edit, remove}) {
    return (
        <div className="edt-course-btn">
            <Button className="course-code" size="small" onClick={() => edit(course)}> 
                <Badge className="course-clr" color={course.color.code} />
                {course.code}
            </Button>

            <Popconfirm title={`Delete the course ${course.code}?`} onConfirm={remove} placement="topRight">
                <Button className="course-del" size="small"> 
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
        </div>
    )
}

export default EditCourseButton
