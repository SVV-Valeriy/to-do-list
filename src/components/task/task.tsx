import React, {FC} from "react";
import style from './task.module.css'
import {InputTask} from "./inputTask";
import {useActions} from "../../hooks/action";
import {Trash} from "../../images/trash";

interface IProps {
    status: boolean
    description: string
    date: Date
    id: number
}

export const Task: FC<IProps> = ({status, description, date, id}) => {

    const {deleteTask} = useActions()

    return (
        <tr className={style.table} key={id}>
            <th className={style.columnCheckbox}>
              <InputTask id={id} status={status}/>
            </th>
            <th className={style.columnDescription}><p className={style.paddingForText}>{description}</p></th>
            <th className={style.columnStatus}>
                <p className={status ? style.textDone : style.textWork}>{status ? 'Выполнено' : 'В работе'}</p>
            </th>
            <th className={style.columnDate}><p className={style.paddingForDate}>{new Date(date).toLocaleDateString()}</p></th>
            <th className={style.columnDelete}>
                <button className={style.invisibleButton} onClick={() => deleteTask({id})}>
                    <Trash/>
                </button>
            </th>
        </tr>
    )
}
