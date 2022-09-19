import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Task} from "../task/task";
import {TaskForm} from "../taskForm/taskForm";
import './homePage.css'
import {PlusIcon} from '../../images/plusIcon'
import {Magnifier} from "../../images/magnifier";
import {Arrow} from "../../images/arrow";

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

    const tasksElement = filteredTasks.map(({description, status, date, id}) => <Task
        key={id} status={status}
        description={description}
        date={date} id={id}/>)


    return (
        <div className='container'>
            <div className='header'>
                <h1>To do list</h1>
                <button className='invisibleButton' onClick={showModal}>
                    <PlusIcon/>
                </button>
            </div>
            <div className='searchAndSort'>
                <div className='search'>
                    <p className='magnifyingIndent'><Magnifier/></p>
                    <form>
                        <input className='inputSearch'
                               type='text'
                               placeholder='Поиск...'
                               onChange={(event) => setValue(event.target.value)}
                        />
                    </form>
                </div>
            </div>
            <table>
                <thead>
                <tr className='table'>
                    <th className='columnCheckbox'></th>
                    <th className='columnDescription'>
                        <p onClick={() => settingDescription('', true, true)}
                           className='borderLeft'>Описание</p>
                    </th>
                    <th className='columnStatus'>
                        <p onClick={() => settingStatus('status', false)}
                           className='borderLeft'>Статус</p>
                        <button className='invisibleButtonForTable'
                                onClick={() => setSortOrderStatus(!sortOrderStatus)}>
                            <Arrow coup={sortOrderStatus ? '' : 'coup'}/>
                        </button>
                    </th>
                    <th className='columnDate'>
                        <p onClick={() => settingDate('date', false)}
                           className='borderLeft'>Дата</p>
                        <button className='invisibleButtonForTable' onClick={() => setSortOrderDate(!sortOrderDate)}>
                            <Arrow coup={sortOrderDate ? '' : 'coup'}/>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {tasksElement}
                </tbody>
            </table>
            {isModal && <TaskForm isModal={isModal} setModal={setModal}/>}
        </div>
    )
}
