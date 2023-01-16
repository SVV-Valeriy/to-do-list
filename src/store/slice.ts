import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeStatus} from "./reducers/changeStatus";
import {addTask} from "./reducers/addTask";
import {deleteTask} from "./reducers/deleteTask";
import {changeTask} from "./reducers/changeTask";
import {addSubTask} from "./reducers/addSubTask";
import {changeSubStatus} from "./reducers/changeSubStatus";
import {changeSubTask} from "./reducers/changeSubTask";
import {addComment} from "./reducers/addComment";
import {deleteComment} from "./reducers/deleteComment";
import {deleteSubTask} from "./reducers/deleteSubTask";
import {changeComment} from "./reducers/changeComment";

export const LS_TASK_KEY = 'localTasks'

export interface ISubTasks {
    /** id задачи */
    id: number
    /** Название задачи */
    name: string
    /** Описание задачи */
    description: string
    /** Статус задачи(выполнена или нет) */
    status: boolean
    /** Приоритет выполения задачи(1-High, 2-Middle, 3-Low) */
    priority: number
    /** Дата создания задачи */
    date: Date
    /** Комментарии к задаче */
    comments: Array<IComment>
}

export interface IComment {
    /** id комментария */
    id: number
    /** Дата создания комментария */
    date: Date
    /** Комментарий к задаче*/
    comment: string
}

export interface ITask extends ISubTasks {
    /** Подзадачи к основной задаче*/
    subTasks: Array<ISubTasks>
}

export interface ITaskList {
    /** Массив объектов задач*/
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
                priority: 3,
                date: new Date('2022.04.22'),
                subTasks: [
                    {
                        id: 15645645647,
                        name: 'Тест подзадач',
                        description: 'Пробный режим для подзадач',
                        status: true,
                        priority: 2,
                        date: new Date('2022.03.25'),
                        comments: [
                            {
                                id: 1651648741,
                                date: new Date('2022.04.22'),
                                comment: 'тестириуем комментарии'
                            },
                            {
                                id: 97974654987,
                                date: new Date('2022.04.22'),
                                comment: 'тестириуем комментарии'
                            },
                        ]
                    }
                ],
                comments: [
                    {
                        id: 464665464,
                        date: new Date('2022.04.22'),
                        comment: 'тестириуем комментарии'
                    },
                    {
                        id: 546545648748,
                        date: new Date('2022.04.22'),
                        comment: 'тестириуем комментарии'
                    },
                ]
            },
            {
                id: 2,
                name: 'Внедрить Wi-FI для читателей',
                description: 'Пробный режим',
                status: false,
                priority: 2,
                date: new Date('2022.03.25'),
                subTasks: [],
                comments: []
            },
            {
                id: 3,
                name: 'Отредактировать раздел "Доступная среда"',
                description: 'Пробный режим',
                status: true,
                priority: 1,
                date: new Date('2022.03.15'),
                subTasks: [],
                comments: []
            },
            {
                id: 4,
                name: 'Презентация "Информационные технологии"',
                description: 'Пробный режим',
                status: false,
                priority: 2,
                date: new Date('2022.03.15'),
                subTasks: [],
                comments: []
            },
            {
                id: 5,
                name: 'Счётчики - внедрить дизайн',
                description: 'Пробный режим',
                status: false,
                priority: 1,
                date: new Date('2022.03.09'),
                subTasks: [],
                comments: []
            },
            {
                id: 6,
                name: 'Сверстать новый layout',
                description: 'Пробный режим',
                status: false,
                priority: 3,
                date: new Date('2022.03.07'),
                subTasks: [],
                comments: []
            },
            {
                id: 7,
                name: 'Скролл в новостях',
                description: 'Пробный режим',
                status: true,
                priority: 1,
                date: new Date('2022.03.01'),
                subTasks: [],
                comments: []
            },
            {
                id: 8,
                name: 'Форма сброса пароля',
                description: 'Пробный режим',
                status: false,
                priority: 2,
                date: new Date('2022.02.25'),
                subTasks: [],
                comments: []
            },
            {
                id: 9,
                name: 'Внедрение модуля Chat',
                description: 'Пробный режим',
                status: false,
                priority: 1,
                date: new Date('2022.02.20'),
                subTasks: [],
                comments: []
            }
        ]
}

export const taskSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        addTask,
        changeStatus,
        changeTask,
        deleteTask,
        addSubTask,
        changeSubStatus,
        changeSubTask,
        deleteSubTask,
        addComment,
        changeComment,
        deleteComment
    }
})

export const taskAction = taskSlice.actions
export const taskReducer = taskSlice.reducer