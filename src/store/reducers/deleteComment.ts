import {PayloadAction} from "@reduxjs/toolkit";
import {IComment, ITaskList, LS_TASK_KEY} from "../slice";

export const deleteComment = (state: ITaskList, action: PayloadAction<IComment>) => {
    state.tasks.map(task => {
        task.comments = task.comments.filter(comment => comment.id !== action.payload.id)
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}