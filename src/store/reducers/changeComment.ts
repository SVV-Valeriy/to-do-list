import {PayloadAction} from "@reduxjs/toolkit";
import {IComment, ISubTasks, ITaskList, LS_TASK_KEY} from "../slice";

export const changeComment = (state: ITaskList, action: PayloadAction<IComment>) => {
    state.tasks.map(task => {
        task.comments.map(comment => {
            if (comment.id === Number(action.payload.id)) {
                comment.comment = action.payload.comment
            }
            return comment
        })
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}