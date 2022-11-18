import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Task} from "../task/task";
import {CreateTask} from "../taskForm/createTask";
import style from './homePage.module.css'
import {PlusIcon} from '../../images/plusIcon'
import {Magnifier} from "../../images/magnifier";
import {Arrow} from "../../images/arrow";
import classNames from 'classnames';

export const HomePage = () => {

    const {tasks} = useAppSelector(state => state.task)

    const [isModal, setModal] = useState(false)
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('')
    const [sortOrderStatus, setSortOrderStatus] = useState(true)
    const [sortOrderDate, setSortOrderDate] = useState(true)

    const [isActive, setActive] = useState(false)


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

    const settingStatus = (sort: string, sortOrderStatus: boolean) => {
        setSort('status')
        setSortOrderStatus(false)
    }

    const settingDate = (sort: string, sortOrderDate: boolean) => {
        setSort('date')
        setSortOrderDate(false)
    }

    const settingDescription = (sort: string, sortOrderDate: boolean, sortOrderStatus: boolean) => {
        setSort('')
        setSortOrderDate(true)
        setSortOrderStatus(true)
    }

    useEffect(() => {
        if (sort === 'date')
            setSortOrderStatus(true)
        if (sort === 'status')
            setSortOrderDate(true)
    }, [sort])

    const forTask = (sort: string) => {
        if (sort === 'status') {
            return sortForStatus
        }
        if (sort === 'date') {
            return sortDate
        }

        return tasks
    }

    const filteredTasks = forTask(sort).filter(({description, date}) => {
        return description.toLowerCase().includes(value.toLowerCase()) || String(date).toLowerCase().includes(value.toLowerCase())
    })

    const tasksElement = filteredTasks.map(({description, status, date, id}) => (
        <Task key={id} status={status} description={description} date={date} id={id}/>))

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h1>To do list</h1>
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
            </div>
            <table>
                <thead>
                <tr className={style.table}>
                    <th className={style.columnCheckbox}/>
                    <th className={style.columnDescription}>
                        <p onClick={() => settingDescription('', true, true)}
                           className={style.borderLeft}>Описание</p>
                    </th>
                    <th className={style.columnStatus}>
                        <p onClick={() => settingStatus('status', false)}
                           className={style.borderLeft}>Статус</p>
                        <button className={style.invisibleButtonForTable}
                                onClick={() => setSortOrderStatus(!sortOrderStatus)}>
                            <Arrow coup={sortOrderStatus ? '' : style.coup}/>
                        </button>
                    </th>
                    <th className={style.columnDate}>
                        <p onClick={() => settingDate('date', false)}
                           className={style.borderLeft}>Дата</p>
                        <button className={style.invisibleButtonForTable} onClick={() => setSortOrderDate(!sortOrderDate)}>
                            <Arrow coup={sortOrderDate ? '' : style.coup}/>
                        </button>
                    </th>
                    <th className={classNames(style.columnDelete, style.borderLeftForDelete)}/>
                </tr>
                </thead>
                <tbody>
                {tasksElement}
                </tbody>
            </table>
            {isModal && <CreateTask isModal={isModal} setModal={setModal}/>}
        </div>
    )
}
