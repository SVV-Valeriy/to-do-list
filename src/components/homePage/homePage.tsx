import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Task} from "../task/task";
import {CreateTask} from "../taskForm/createTask";
import style from './homePage.module.css'
import {PlusIcon} from '../../images/plusIcon'
import {Magnifier} from "../../images/magnifier";
import classNames from 'classnames';
import {EmptyTask} from "../task/emptyTask";
import {DropDown} from "../task/dropdown";

export const HomePage = () => {

    const {tasks} = useAppSelector(state => state.task)
    const [isModal, setModal] = useState(false)
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('')
    const [sortOrderStatus, setSortOrderStatus] = useState(true)
    const [sortOrderDate, setSortOrderDate] = useState(true)

    const showModal = () => {
        setModal(true)
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

    const forTask = (sort: string) => {
        switch (sort) {
            case 'status':
                return sortForStatus
            case 'date':
                return sortDate
            default:
                return tasks
        }
    }

    const filteredTasks = forTask(sort).filter(({description, date}) => {
        return description.toLowerCase().includes(value.toLowerCase()) || String(date).toLowerCase().includes(value.toLowerCase())
    })

    const tasksElement = filteredTasks.map(({description, status, date, id}) => (
        <Task key={id} status={status} description={description} date={date} id={id}/>))

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1 className={style.title}>To do list</h1>
                <button className={style.invisibleButton} onClick={showModal}>
                    <PlusIcon/>
                </button>
            </div>
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
                    <div className={style.sortDescription}>
                        <p>Сортировать: </p>
                        <DropDown sort={sort} setSort={setSort}
                                  sortOrderStatus={sortOrderStatus} setSortOrderStatus={setSortOrderStatus}
                                  sortOrderDate={sortOrderDate}
                                  setSortOrderDate={setSortOrderDate}
                        />
                    </div>
                </div>
            </div>
            <table>
                <thead>
                <tr className={style.table}>
                    <th className={style.columnCheckbox}/>
                    <th className={style.columnDescription}>
                        <p className={style.borderLeft}>Описание</p>
                    </th>
                    <th className={style.columnStatus}>
                        <p className={style.borderLeft}>Статус</p>
                    </th>
                    <th className={style.columnDate}>
                        <p className={style.borderLeft}>Дата</p>
                    </th>
                    <th className={classNames(style.columnDelete, style.borderLeftForDelete)}/>
                </tr>
                </thead>
                <tbody>
                {tasks.length > 0
                    ? tasksElement
                    : <EmptyTask/>
                }
                </tbody>
            </table>
            {isModal && <CreateTask isModal={isModal} setModal={setModal}/>}
        </div>
    )
}
