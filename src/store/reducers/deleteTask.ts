import {PayloadAction} from "@reduxjs/toolkit";
import {ITask, ITaskList, LS_TASK_KEY} from "../slice";

export const deleteTask = (state: ITaskList, action: PayloadAction<ITask>) => {
    state.tasks = state.tasks.filter(task => task.id !== Number(action.payload.id))
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}