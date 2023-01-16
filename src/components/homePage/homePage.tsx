import React, {useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Task} from "../task/task";
import style from './homePage.module.css'
import {Magnifier} from "../../images/magnifier";
import {EmptyTask} from "../task/emptyTask/emptyTask";
import {DropDown} from "../dropDown/dropdown";
import {useActions} from "../../hooks/action";
import {Plus} from "../../images/plus";

export const HomePage = () => {

    const {tasks} = useAppSelector(state => state.task)
    const {addTask} = useActions()
    const [isOpenModal, setOpenModal] = useState(false)
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('')
    const [sortOrderStatus, setSortOrderStatus] = useState(true)
    const [sortOrderDate, setSortOrderDate] = useState(true)
    const [sortOrderPriority, setSortOrderPriority] = useState(true)

    const showModal = () => {
        setOpenModal(true)
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const sortForStatus = [...tasks].sort((a, b) => {
        if (sortOrderStatus)
            return Number(a.status) - Number(b.status)
        else
            return Number(b.status) - Number(a.status)
    })

    const sortDate = [...tasks].sort((a, b) => {
        if (sortOrderDate) {
            return Number(new Date(b.date)) - Number(new Date(a.date))
        } else {
            return Number(new Date(a.date)) - Number(new Date(b.date))
        }
    })

    const sortPriority = [...tasks].sort((a, b) => {
        if (sortOrderPriority) {
            return b.priority - a.priority
        } else {
            return a.priority - b.priority
        }
    })

    const forTask = (sort: string) => {
        switch (sort) {
            case 'status':
                return sortForStatus
            case 'date':
                return sortDate
            case 'priority':
                return sortPriority
            default:
                return tasks
        }
    }

    const filteredTasks = forTask(sort).filter(({name, date}) => {
        return name.toLowerCase().includes(value.toLowerCase()) || String(date).toLowerCase().includes(value.toLowerCase())
    })

    const tasksElement = filteredTasks.map(({name, description, status, date, id, comments, priority, subTasks}) => (
        <Task key={id} priority={priority} status={status} name={name} description={description} date={date} id={id}
              subTasks={subTasks} comments={comments}/>))

    const buttonName = 'Создать'

    const title = 'Создать новую задачу'

    return (
        <>
            <div className={style.searchAndSort}>
                <div className={style.search}>
                    <p className={style.magnifyingIndent}><Magnifier/></p>
                    <form>
                        <input className={style.inputSearch}
                               type='text'
                               placeholder='Поиск...'
                               onChange={(event) => setValue(event.target.value)}
                        />
                    </form>
                </div>
                <div className={style.sort}>
                    <div className={style.sortName}>
                        <p>Сортировать: </p>
                        <DropDown sort={sort} setSort={setSort}
                                  sortOrderStatus={sortOrderStatus} setSortOrderStatus={setSortOrderStatus}
                                  sortOrderDate={sortOrderDate} setSortOrderDate={setSortOrderDate}
                                  sortOrderPriority={sortOrderPriority} setSortOrderPriority={setSortOrderPriority}
                        />
                    </div>
                </div>
            </div>
            <table>
                <thead>
                <tr className={style.table}>
                    <th className={style.columnCheckbox}/>
                    <th className={style.columnName}>
                        <p className={style.borderLeft}>Задачи</p>
                    </th>
                    <th className={style.columnStatus}>
                        <p className={style.borderLeft}>Приоритет</p>
                    </th>
                    <th className={style.columnDate}>
                        <p className={style.borderLeft}>Дата</p>
                    </th>
                </tr>
                </thead>
                <tbody>
                {tasks.length > 0
                    ? tasksElement
                    : <EmptyTask/>
                }
                </tbody>
            </table>
        </>
    )
}
