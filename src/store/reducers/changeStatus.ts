import {PayloadAction} from "@reduxjs/toolkit";
import {ITask, ITaskList, LS_TASK_KEY} from "../slice";

export const changeStatus = (state: ITaskList, action: PayloadAction<ITask>) => {
    state.tasks.map(task => {
        if (task.id === Number(action.payload.id)) {
            task.status = !action.payload.status
        }
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}