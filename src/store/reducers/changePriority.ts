import { PayloadAction } from '@reduxjs/toolkit'
import { ITask, ITaskList, LS_TASK_KEY } from '../slice'

export const changePriority = (state: ITaskList, action: PayloadAction<ITask>) => {
    state.tasks.map(task => {
        if (task.id === Number(action.payload.id)) {
            task.priority = Number(action.payload.priority)
        }
        return task
    })
    localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
}
