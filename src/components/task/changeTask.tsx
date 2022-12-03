import React, {FC} from "react";
import style from './changeTask.module.css'
import classNames from "classnames";

interface IProps {
    status: boolean
    date: Date
}

export const ChangeTask: FC<IProps> = ({status, date}) => {

    const dateConversion = new Date(date).toLocaleDateString()

    const textColor = classNames(style.textStatus, {
        [style.textDone]: status,
    })

    return (
        <tr className={style.vision}>
            <td className={textColor}>{status ? 'Выполнено' : 'В работе'}</td>
            <td className={style.textDate}>Дата: {dateConversion}</td>
        </tr>
    )
}