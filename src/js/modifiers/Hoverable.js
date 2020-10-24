import React from 'react'

function Hoverable(props) {
    const [scale, setScale] = React.useState(props.scale || 1)

    const g = props.g  || 0.1

    var CSS = () => ({
        transform: `scale(${scale})`,
        transition: `0.3s ease`
    })

    return (
        <div 
            className="modifier" 
            onMouseEnter={() => setScale(scale + g)} 
            onMouseLeave={() => setScale(scale - g)}
            style={CSS()} 
        >
            {props.children}
        </div>
    )
}

export default Hoverable
