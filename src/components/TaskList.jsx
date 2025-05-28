import React from 'react'

export const TaskList = (props) => {
    return (
        <li className="flex justify-between items-center p-3 border-b last:border-b-0" key={props.id}>
            <h2 className={`text-lg md:text-xl font-medium ${props.isComplete ? "line-through text-gray-400" : "text-black"}`}>
                {props.name}
            </h2>
            <span> {props.complete ?
                (<button className="text-2xl">✅</button>) :
                (<button className="text-2xl" onClick={() => props.onRead(props.id)}> ✔️ </button>)
            }
            </span>
        </li>
    )
}
