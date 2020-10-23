import React, {useState} from 'react'
import {PlusSquareOutlined} from '@ant-design/icons';

import '../../css/buttons/plus-btn.css';


function PlusButton(props) {
    const [scale, setScale] = useState(props.scale || 1)

    let iconCSS = () => ({
        marginRight: "10px",
        transform: `scale(${scale})`,
        transition: '0.3s ease'
    })

    let enter = () => setScale(scale + 0.15)

    let exit = () => setScale(scale - 0.15)

    return (
        <button className='plus-btn' onMouseEnter={enter} onMouseLeave={exit} onClick={props.onClick}>
            <PlusSquareOutlined style={iconCSS()} />
            <span> {props.text} </span>
        </button>
    )
}

PlusButton.defaultProps = {
    text: '',
    scale: 1
}

export default PlusButton
