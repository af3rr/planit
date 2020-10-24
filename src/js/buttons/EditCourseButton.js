import React from 'react'

import {Button, Badge, Popconfirm} from 'antd'
import {DeleteOutlined} from '@ant-design/icons';

import '../../css/buttons/edit-course-btn.css';


function EditCourseButton({course, courseCtrl, onClick}) {
    return (
        <div className="edt-course-btn">
            <Button className="course-code" size="small" onClick={onClick}> 
                <Badge className="course-clr" color={course.color.code} /> {course.code}
            </Button>

            <Popconfirm 
                onConfirm={() => courseCtrl.delete(course)} 
                title={`Delete the course ${course.code}?`} 
                placement="topRight"
            >
                <Button className="del-course" size="small"> 
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
        </div>
    )
}

export default EditCourseButton
