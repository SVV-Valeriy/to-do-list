import React, {FC} from "react";
import style from './mobileTask.module.css'
import classNames from "classnames";

interface IProps {
    description: string
    status: boolean
    date: Date
}

export const MobileTask: FC<IProps> = ({status, date, description}) => {

    const dateConversion = new Date(date).toLocaleDateString()

    const textColor = classNames(style.textStatus, {
        [style.textDone]: status,
    })

    return (
        <tr className={style.vision}>
            <td className={style.textDescription}>Описание: {description}</td>
            <td className={textColor}>Статус: {status ? 'Выполнено' : 'В работе'}</td>
            <td className={style.textDate}>Дата: {dateConversion}</td>
        </tr>
    )
}