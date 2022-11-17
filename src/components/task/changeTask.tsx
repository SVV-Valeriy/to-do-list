import React, {FC} from "react";
import style from './changeTask.module.css'

interface IProps {
    status: boolean
    date: Date
}

export const ChangeTask: FC<IProps> = ({status, date}) => {
    return (
        <td className={style.vision}>
            <div> <p className={status ? style.textDone : style.textWork}>{status ? 'Выполнено' : 'В работе'}</p></div>
            <div className={style.text}>Дата: {new Date(date).toLocaleDateString()}</div>
        </td>
    )
}