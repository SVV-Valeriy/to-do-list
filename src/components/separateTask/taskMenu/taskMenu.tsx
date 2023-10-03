import React, { FC, useState } from 'react'
import style from './taskMenu.module.css'
import { DropPriority } from '../../dropPriority/dropPriority'
import { NavLink, useNavigate } from 'react-router-dom'
import { Trash } from '../../../images/trash'
import { useActions } from '../../../hooks/action'

interface IProps {
    id?: string
    priority: number
    date: Date
    deleteTask: ({}) => {}
}

export const TaskMenu: FC<IProps> = ({ id, priority, date, deleteTask }) => {
    const [selectedOption, setSelectedOption] = useState(priority)
    const navigate = useNavigate()

    const deleteObjective = () => {
        deleteTask({ id })
        // navigate(-1)
    }

    const localDate = new Date(date).toLocaleDateString()

    return (
        <div className={style.containerMenu}>
            <p className={style.taskNumber}>Задача № {id}</p>
            <div className={style.textPosition}>
                <p className={style.textDate}>Дата создания:</p>
                <p>{localDate}</p>
            </div>
            <div className={style.textPosition}>
                <p>Приоритет: </p>
                <DropPriority
                    id={id}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </div>
            {/*<NavLink to={'/'}>*/}
            <div onClick={deleteObjective} className={style.deleteWithTrash}>
                <Trash />
                <p className={style.textDelete}>Удалить задачу</p>
            </div>
            {/*</NavLink>*/}
        </div>
    )
}
