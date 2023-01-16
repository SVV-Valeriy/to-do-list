import {PayloadAction} from "@reduxjs/toolkit";
import {ISubTasks, ITaskList, LS_TASK_KEY} from "../slice";

export const changeSubTask = (state: ITaskList, action: PayloadAction<ISubTasks>) => {
    debugger
    state.tasks.map(task => {
        task.subTasks.map(subTask => {
            if (subTask.id === Number(action.payload.id)) {
                subTask.name = action.payload.name
                subTask.description = action.payload.description
                subTask.priority = Number(action.payload.priority)
            }
            return subTask
        })
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}