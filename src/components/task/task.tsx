import React, {FC, useState} from "react";
import style from './task.module.css'
import {InputTask} from "./inputTask";
import {useActions} from "../../hooks/action";
import {Trash} from "../../images/trash";
import {ChangeTask} from "./changeTask";
import {Arrow} from "../../images/arrow";
import classNames from "classnames";

interface IProps {
    status: boolean
    description: string
    date: Date
    id: number
}

export const Task: FC<IProps> = ({status, description, date, id}) => {

    const {deleteTask} = useActions()
    const [isActive, setActive] = useState(false)

    const textColor = classNames(style.textWork, {
        [style.textDone]: status,
    })

    const taskVision = classNames(style.visionArrow, {
        [style.coup]: isActive,
    })

    return (
        <>
            <tr className={style.table} key={id}>
                <th className={style.columnCheckbox}>
                    <InputTask id={id} status={status}/>
                </th>
                <th onClick={() => setActive(!isActive)} className={style.columnDescription}>
                        <p className={style.paddingForText}>{description}</p>
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
        </>
    )
}
