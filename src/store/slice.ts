import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Moment from 'react-moment';
import moment from "moment";

const LS_TASK_KEY = 'rtk'

interface ITask {
    id: number
    description: string
    status: boolean
    data: string
}

interface ITaskList {
    tasks: Array<ITask>
}

const initialState: ITaskList = {
    tasks:
        [
            {
                id: 1,
                description: 'Размещение новостей на сайте',
                status: true,
                data: '22.04.2022'
            },
            {
                id: 2,
                description: 'Внедрить Wi-FI для читателей',
                status: false,
                data: '25.03.2022'
            },
            {
                id: 3,
                description: 'Отредактировать раздел "Доступная среда"',
                status: true,
                data: '15.03.2022'
            },
            {
                id: 4,
                description: 'Презентация "Информационные технологии"',
                status: false,
                data: '15.03.2022'
            },
            {
                id: 5,
                description: 'Счётчики - внедрить дизайн',
                status: false,
                data: '09.03.2022'
            },
            {
                id: 6,
                description: 'Сверстать новый layout',
                status: false,
                data: '07.03.2022'
            },
            {
                id: 7,
                description: 'Скролл в новостях',
                status: true,
                data: '01.03.2022'
            },
            {
                id: 8,
                description: 'Форма сброса пароля',
                status: false,
                data: '25.02.2022'
            },
            {
                id: 9,
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
                id: state.tasks[state.tasks.length - 1].id + 1,
                description: action.payload.description,
                status: false,
                data:  moment().format('DD.MM.Y')
            }
            state.tasks.unshift(newTask)
            localStorage.setItem(LS_TASK_KEY, JSON.stringify(state.tasks))
        }
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer