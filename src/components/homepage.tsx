import {UseAppSelector} from "../hooks/redux";
import React from "react";

export const HomePage = () => {

    const {task} = UseAppSelector(state => state.task)

    const taskElements = task.map(task => <p>task.description</p>)

    return (
        <div>
            {taskElements}
        </div>
    )
}