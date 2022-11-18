import React, {FC} from "react";
import style from './changeTask.module.css'

interface IProps {
    status: boolean
    date: Date
}

export const ChangeTask: FC<IProps> = ({status, date}) => {
    return (
        <tr className={style.vision}>
            <td className={status ? style.textDone : style.textWork}>{status ? 'Выполнено' : 'В работе'}</td>
            <td className={style.text}>Дата:{new Date(date).toLocaleDateString()}</td>
        </tr>
    )
}