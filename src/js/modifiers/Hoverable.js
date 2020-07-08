import React from 'react'

function Hoverable(props) {
    const [scale, setScale] = React.useState(props.scale || 1)

    let CSS = () => ({
        transform: `scale(${scale})`,
        transition: `0.3s ease`
    })

    let enter = () => setScale(scale + 0.1)

    let exit = () => setScale(scale - 0.1)

    return (
        <div style={CSS()} onMouseEnter={enter} onMouseLeave={exit}>
            {props.children}
        </div>
    )
}

export default Hoverable
