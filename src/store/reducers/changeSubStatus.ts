import {PayloadAction} from "@reduxjs/toolkit";
import {ISubTasks, ITaskList, LS_TASK_KEY} from "../slice";

export const changeSubStatus = (state: ITaskList, action: PayloadAction<ISubTasks>) => {
    state.tasks.map(task => {
        task.subTasks.map(subTask => {
            if (subTask.id === Number(action.payload.id)) {
                subTask.status = !action.payload.status
            }
            return subTask
        })
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}