import {PayloadAction} from "@reduxjs/toolkit";
import {ITask, ITaskList, LS_TASK_KEY} from "../slice";

export const addTask = (state: ITaskList, action: PayloadAction<ITask>) => {
    const newTask = {
        id: Math.random(),
        name: action.payload.name,
        description: action.payload.description,
        status: false,
        priority: Number(action.payload.priority),
        date: new Date(),
        subTasks: [],
        comments: []
    }
    state.tasks.unshift(newTask)
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}