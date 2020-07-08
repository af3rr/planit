import React, {useState} from 'react'
import {SquarePlus} from '../components/Icons'

import '../../css/buttons/plus-btn.css';


function PlusButton(props) {
    const [scale, setScale] = useState(props.scale)

    let iconCSS = () => ({
        marginRight: "10px",
        width: "17.5px",
        height: "17.5px",
        transform: `scale(${scale})`,
        transition: '0.3s ease'
    })

    let enter = () => setScale(scale + 0.1)
    
    let exit = () => setScale(scale - 0.1)

    return (
        <button className='plus-btn' onMouseEnter={enter} onMouseLeave={exit} onClick={props.onClick}>
            <SquarePlus style={iconCSS()} /> 
            <span> {props.text} </span>
        </button>
    )
}

PlusButton.defaultProps = {
    text: '',
    scale: 1
}

export default PlusButton
