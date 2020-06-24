import React, {useState} from 'react'


function PlusButton(props) {
    const [scale, setScale] = useState(props.scale)

    let btnCSS = () => ({
        display: "flex",
        alignItems: "center",
        fontSize: "16px"
    })

    let imgCSS = () => ({
        marginRight: "10px",
        width: "17.5px",
        height: "17.5px",
        transform: `scale(${scale})`,
        transition: '0.25s ease'
    })

    let enter = () => setScale(scale + 0.1)
    
    let exit = () => setScale(scale - 0.1)

    return (
        <button style={btnCSS()} onMouseEnter={enter} onMouseLeave={exit} onClick={props.onClick}>
            <img style={imgCSS()} src="./icons/plus.svg" alt="" /> {props.text}
        </button>
    )
}

PlusButton.defaultProps = {
    text: '',
    scale: 1
}

export default PlusButton