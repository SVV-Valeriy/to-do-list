import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_TASK_KEY = 'localTasks'

export interface ITask {
    id: number
    description: string
    status: boolean
    date: Date
}

export interface ITaskList {
    tasks: Array<ITask>
}

const initialState: ITaskList = {tasks: JSON.parse(<string>localStorage.getItem('localTasks')) ?? []}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        changeTask(state, action: PayloadAction<ITask>) {
            state.tasks.map(task => {
                if (task.id === Number(action.payload.id)) {
                    task.status = !action.payload.status
                }

                return task
            })
            localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
        },
        addTask(state, action: PayloadAction<ITask>) {
            const newTask = {
                id: Math.random(),
                description: action.payload.description,
                status: false,
                date: new Date()
            }
            state.tasks.unshift(newTask)
            localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
        },
        deleteTask(state, action: PayloadAction<ITask>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
            localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
        }
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer