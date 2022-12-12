import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_TASK_KEY = 'localTasks'

export interface ITask {
    id: number
    name: string
    description: string
    status: boolean
    date: Date
}

export interface ITaskList {
    tasks: Array<ITask>
}

const initialState: ITaskList = {
    // tasks: JSON.parse(<string>localStorage.getItem('localTasks')) ?? []}
    tasks:
        [
            {
                id: 1,
                name: 'Размещение новостей на сайте',
                description: 'Пробный режим',
                status: true,
                date: new Date('2022.04.22')
            },
            {
                id: 2,
                name: 'Внедрить Wi-FI для читателей',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.03.25')
            },
            {
                id: 3,
                name: 'Отредактировать раздел "Доступная среда"',
                description: 'Пробный режим',
                status: true,
                date: new Date('2022.03.15')
            },
            {
                id: 4,
                name: 'Презентация "Информационные технологии"',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.03.15')
            },
            {
                id: 5,
                name: 'Счётчики - внедрить дизайн',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.03.09')
            },
            {
                id: 6,
                name: 'Сверстать новый layout',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.03.07')
            },
            {
                id: 7,
                name: 'Скролл в новостях',
                description: 'Пробный режим',
                status: true,
                date: new Date('2022.03.01')
            },
            {
                id: 8,
                name: 'Форма сброса пароля',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.02.25')
            },
            {
                id: 9,
                name: 'Внедрение модуля Chat',
                description: 'Пробный режим',
                status: false,
                date: new Date('2022.02.20')
            }
        ]
}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        changeStatus(state, action: PayloadAction<ITask>) {
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
                name: action.payload.name,
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
        },
        changeTask(state, action: PayloadAction<ITask>) {
            state.tasks.map(task => {
                if (task.id === Number(action.payload.id)) {
                    task.name = action.payload.name
                    task.description = action.payload.description
                }
                return task
            })
            localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
        },
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer