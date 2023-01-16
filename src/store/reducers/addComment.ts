import {PayloadAction} from "@reduxjs/toolkit";
import {IComment, ITaskList, LS_TASK_KEY} from "../slice";

export const addComment = (state: ITaskList, action: PayloadAction<IComment>) => {
    state.tasks.map(task => {
        if (task.id === Number(action.payload.id)) {
            const newComment = {
                id: Math.random(),
                date: new Date(),
                comment: action.payload.comment
            }
            task.comments.push(newComment)
        }
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}