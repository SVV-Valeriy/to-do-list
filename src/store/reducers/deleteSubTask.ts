import {PayloadAction} from "@reduxjs/toolkit";
import {IComment, ISubTasks, ITaskList, LS_TASK_KEY} from "../slice";

export const deleteSubTask = (state: ITaskList, action: PayloadAction<ISubTasks>) => {
    debugger
    state.tasks.map(task => {
        task.subTasks = task.subTasks.filter(subTask => subTask.id !== action.payload.id)
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}