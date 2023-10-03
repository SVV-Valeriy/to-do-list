import { PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITaskList, LS_TASK_KEY } from '../slice'

export const changeTask = (state: ITaskList, action: PayloadAction<ITask>) => {
    state.tasks.map(task => {
        if (task.id === Number(action.payload.id)) {
            task.name = action.payload.name
            task.description = action.payload.description
            task.priority = action.payload.priority
                ? Number(action.payload.priority)
                : task.priority
        }
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}
