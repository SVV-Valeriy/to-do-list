import React from "react";
import style from './emptyTask.module.css'


export const EmptyTask = () => {
    return (
        <>
            <tr className={style.table}>
                <th className={style.columnCheckbox}>
                </th>
                <th className={style.columnName}>
                    <p className={style.paddingForText}>Добавьте новую задачу</p>
                </th>
            </tr>
        </>
)
}
