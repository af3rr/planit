import React from 'react'


function Close(props) {
    return (
        <div style={props.style}>
            <svg width={props.width || 19} height={props.height || 19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 1L1 18" stroke="#424959" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 1L18 18" stroke="#424959" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

function SquarePlus(props) {
    return (
        <div style={props.style}>
            <svg width={props.width || 19} height={props.height || 19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6667 1H2.83333C1.82081 1 1 1.82081 1 2.83333V15.6667C1 16.6792 1.82081 17.5 2.83333 17.5H15.6667C16.6792 17.5 17.5 16.6792 17.5 15.6667V2.83333C17.5 1.82081 16.6792 1 15.6667 1Z" stroke="#495266" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.25 5.58331V12.9166" stroke="#424959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5.58334 9.25H12.9167" stroke="#424959" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

export {Close, SquarePlus}
