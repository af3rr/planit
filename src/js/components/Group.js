import React from 'react'
import {Empty} from 'antd';
import QueueAnim from 'rc-queue-anim';

import '../../css/components/group.css';

function Group(props) {
    return (
        <div className="group">
            <span className="name"> {props.title} </span>

            <div className="wrapper">
                {/* When the last course is deleted, the <Empty /> appears 
                    and the course button dissapears, but this leaves a gap
                    above the <Empty /> until the anim. ends.
                  * Tried rearranging elements so <Empty /> is on top
                  * Tried to add ...props.children and <Empty /> to a list
                    with the <Empty /> being removed conditionally
                  * Tried moving each to its own <QueueAnim /> */}

                <QueueAnim>
                    {props.children.length ? 
                        props.children
                    :
                        <Empty 
                            description={false}
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            imageStyle={{height: '35px', margin: 0}}
                        />
                    }
                </QueueAnim>
            </div>
        </div>
    )
}

export default Group
