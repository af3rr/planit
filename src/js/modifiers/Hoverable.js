import React from 'react'

function Hoverable(props) {
    const [scale, setScale] = React.useState(props.scale || 1)

    let CSS = () => ({
        transform: `scale(${scale})`,
        transition: `0.3s ease`
    })

    return (
        <div 
            className="modifier" 
            onMouseEnter={() => setScale(scale + 0.1)} 
            onMouseLeave={() => setScale(scale - 0.1)}
            style={CSS()} 
        >
            {props.children}
        </div>
    )
}

export default Hoverable
