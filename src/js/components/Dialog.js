import React from 'react'
import Animate from 'rc-animate';

import {Close} from './Icons'
import Hoverable from '../modifiers/Hoverable'

import '../../css/components/dialog.css';


function Dialog(props) {
    let overlayCSS = () => ({
        background: props.overlay ? '#FFFFFF50' : 'transparent'
    })

    let dialogCSS = () => ({
        width: props.width || 'auto',
        height: props.height || 'auto'
    })

    return (
        <Animate transitionName="fade">
            {props.visible ?
                <div key={0} className='dialog-overlay' style={overlayCSS()}>
                    <div className='dialog' style={dialogCSS()}>
                        <header>
                            <h2> {props.title} </h2>
                            
                            <button onClick={() => props.close()}>
                                <Hoverable scale={0.65}> 
                                    <Close />
                                </Hoverable>
                            </button>
                        </header>

                        {props.children}
                    </div>
                </div>
            : null}
        </Animate>
    )
}

export default Dialog
