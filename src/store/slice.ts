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

const initialState: ITaskList = {
    tasks:
        [
            {
                id: 1,
                description: 'Размещение новостей на сайте',
                status: true,
                date: new Date('2022.04.22')
            },
            {
                id: 2,
                description: 'Внедрить Wi-FI для читателей',
                status: false,
                date: new Date('2022.03.25')
            },
            {
                id: 3,
                description: 'Отредактировать раздел "Доступная среда"',
                status: true,
                date: new Date('2022.03.15')
            },
            {
                id: 4,
                description: 'Презентация "Информационные технологии"',
                status: false,
                date: new Date('2022.03.15')
            },
            {
                id: 5,
                description: 'Счётчики - внедрить дизайн',
                status: false,
                date: new Date('2022.03.09')
            },
            {
                id: 6,
                description: 'Сверстать новый layout',
                status: false,
                date: new Date('2022.03.07')
            },
            {
                id: 7,
                description: 'Скролл в новостях',
                status: true,
                date: new Date('2022.03.01')
            },
            {
                id: 8,
                description: 'Форма сброса пароля',
                status: false,
                date: new Date('2022.02.25')
            },
            {
                id: 9,
                description: 'Внедрение модуля Chat',
                status: false,
                date: new Date('2022.02.20')
            }
        ]
}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        changeTask(state, action: PayloadAction<ITask>) {
            state.tasks.map(task => {
                if (task.id === Number(action.payload.id)) {
                    task.status = action.payload.status
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
        }
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer