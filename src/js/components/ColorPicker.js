import ButtonGroup from 'antd/lib/button/button-group';
import React from 'react'

import '../../css/components/clr-picker.css';


function ColorPicker({value={}, onChange}) {
    const [active, setActive] = React.useState(value)
    const [hovered, setHovered] = React.useState('')

    const colors = {
        light: [
            {name: 'Grey', code: '#C1C3C7'},
            {name: 'Purple', code: '#C87CFF'},
            {name: 'Blue', code: '#45AAF2'},
            {name: 'Green', code: '#A0D911'},
            {name: 'Yellow', code: '#FADB14'},
            {name: 'Orange', code: '#FA8C16'},
            {name: 'Red', code: '#D93021'}
        ],
        dark: [
            {name: 'Dark Grey', code: '#777E8C'},
            {name: 'Dark Purple', code: '#8854D0'},
            {name: 'Dark Blue', code: '#3867D6'},
            {name: 'Dark Green', code: '#52C41A'},
            {name: 'Dark Yellow', code: '#FAAD14'},
            {name: 'Dark Orange', code: '#EB690C'}
        ]
    }

    /* Transition doesn't apply
     * Tried moving CSS(), enter()/exit() inside fn
     * Tried adding styling to <Dot /> instead of <button>
     * Tried moving transition CSS from external to inline
     * Note: set external variable declarations to var (?)

        function Dot(props) {
            return (
                <button
                    className='dot'
                    onClick={() => setActive(props.color.name)}
                    onMouseEnter={() => enter(props.color)}
                    onMouseLeave={() => exit()}
                    style={CSS(props.color)}
                />
            )
        } 
    */

    const CSS = c => {
        let s = [active.name, value.name].includes(c.name) ? `0px 4px 7.5px ${c.code}50` : 'none'
        let t = [hovered.name, active.name, value.name].includes(c.name) ? 1.25 : 1

        return ({
            background: c.code,
            transform: `scale(${t})`,
            boxShadow: s
        })
    }

    const click = c => {
        value = {}

        setActive(c)
        onChange(c)
    }

    const enter = c => setHovered(c)

    const exit = () => setHovered('')

    return (
        <div className="clr-picker">
            <div className="row light">
                {colors.light.map((c, i) => (
                    <button
                        className='dot'
                        onClick={() => click(c)}
                        onMouseEnter={() => enter(c)}
                        onMouseLeave={() => exit()}
                        style={CSS(c)}
                        type='button'
                        key={i}
                    />
                ))}
            </div>

            <div className="row dark">
                {colors.dark.map((c, i) => (
                    <ButtonGroup
                        className='dot'
                        onClick={() => click(c)}
                        onMouseEnter={() => enter(c)}
                        onMouseLeave={() => exit()}
                        style={CSS(c)}
                        type='button'
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColorPicker
