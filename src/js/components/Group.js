import React from 'react'
import { Empty } from 'antd';

import '../../css/components/group.css';

function Group(props) {
    return (
        <div className="group">
            <span className="name"> {props.title} </span>

            <div className="wrapper">
                {props.children.length ? 
                    props.children
                :
                    <Empty 
                        description={false}
                        image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        style={{margin: '10px 0 5px'}}
                        imageStyle={{height: '35px', margin: 0}}
                    />
                }
            </div>
        </div>
    )
}

export default Group
