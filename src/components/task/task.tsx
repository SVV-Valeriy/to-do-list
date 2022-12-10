import React, {FC, useState} from "react";
import style from './task.module.css'
import {InputTask} from "./inputTask";
import {useActions} from "../../hooks/action";
import {Trash} from "../../images/trash";
import {ChangeTask} from "./changeTask";
import {Arrow} from "../../images/arrow";
import classNames from "classnames";
import {CreateTask} from "../taskForm/createTask";
import {MinusIcon} from "../../images/minusIcon";
import {PlusIcon} from "../../images/plusIcon";

interface IProps {
    status: boolean
    name: string
    description: string
    date: Date
    id: number
}

export const Task: FC<IProps> = ({status, name, description, date, id}) => {

    const {deleteTask} = useActions()
    const {changeTask} = useActions()
    const [isActive, setActive] = useState(false)
    const [isModal, setModal] = useState(false)

    const showModal = () => {
        setModal(true)
    }

    const textColor = classNames(style.textWork, {
        [style.textDone]: status,
    })

    const taskVision = classNames(style.visionArrow, {
        [style.coup]: isActive,
    })

    const title = 'Редактировать задачу'

    return (
        <>
            <tr className={style.table} key={id}>
                <th className={style.columnCheckbox}>
                    <InputTask id={id} status={status}/>
                </th>
                <th onClick={() => setActive(!isActive)} className={style.columnName}>
                        <p className={style.paddingForText}>{name}</p>
                        <p className={style.paddingForText}>{description}</p>
                    <button onClick={showModal}>
                        Ред...
                    </button>
                        <Arrow coup={taskVision}/>
                </th>
                <th className={style.columnStatus}>
                    <p className={textColor}>{status ? 'Выполнено' : 'В работе'}</p>
                </th>
                <th className={style.columnDate}><p
                    className={style.paddingForDate}>{new Date(date).toLocaleDateString()}</p></th>
                <th className={style.columnDelete}>
                    <button className={style.invisibleButton} onClick={() => deleteTask({id})}>
                        <Trash/>
                    </button>
                </th>
            </tr>
            {isActive &&
            <ChangeTask status={status} date={date}/>}
            {isModal && <CreateTask name={name} description={description} id={id} title={title} submit={changeTask} isModal={isModal} setModal={setModal}/>}
        </>
    )
}
