import {PayloadAction} from "@reduxjs/toolkit";
import {ISubTasks, ITaskList, LS_TASK_KEY} from "../slice";

export const addSubTask = (state: ITaskList, action: PayloadAction<ISubTasks>) => {
    state.tasks.map(task => {
        if (task.id === Number(action.payload.id)) {
            const newSubTask = {
                id: Math.random(),
                name: action.payload.name,
                description: action.payload.description,
                status: false,
                priority: Number(action.payload.priority),
                date: new Date(),
                comments: []
            }
            task.subTasks.push(newSubTask)
        }
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}