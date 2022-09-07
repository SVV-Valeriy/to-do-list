import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const LS_TASK_KEY = 'rtk'

interface IOneTask {
    id: number
    description: string
    status: boolean
    data: string
}

interface ITask {
    task: Array<IOneTask>
}

const initialState: ITask = {
    task:
        [
            {
                id: 1,
                description: 'Размещение новостей на сайте',
                status: true,
                data: '22.04.2022'
            },
            {
                id: 1,
                description: 'Внедрить Wi-FI для читателей',
                status: false,
                data: '25.03.2022'
            },
            {
                id: 1,
                description: 'Отредактировать раздел "Доступная среда"',
                status: true,
                data: '15.03.2022'
            },
            {
                id: 1,
                description: 'Презентация "Информационные технологии"',
                status: false,
                data: '15.03.2022'
            },
            {
                id: 1,
                description: 'Счётчики - внедрить дизайн',
                status: false,
                data: '09.03.2022'
            },
            {
                id: 1,
                description: 'Сверстать новый layout',
                status: false,
                data: '07.03.2022'
            },
            {
                id: 1,
                description: 'Скролл в новостях',
                status: true,
                data: '01.03.2022'
            },
            {
                id: 1,
                description: 'Форма сброса пароля',
                status: false,
                data: '25.02.2022'
            },
            {
                id: 1,
                description: 'Внедрение модуля Chat',
                status: false,
                data: '20.02.2022'
            }
        ]
}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        addNewTask(state, action: PayloadAction<IOneTask>) {
            state.task.push(action.payload)
        }
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer