import React, {FC} from "react";
import '../task/task.css'
import {InputTask} from "./inputTask";

interface IProps {
    status: boolean
    description: string
    date: string
    id: number
}

export const Task: FC<IProps> = ({status, description, date, id}) => {
    return (
        <tr className='table' key={description}>
            <th className='columnCheckbox'>
              <InputTask id={id} status={status}/>
            </th>
            <th className='columnDescription'><p className='paddingForText'>{description}</p></th>
            <th className='columnStatus'>
                <p className={status ? 'textDone' : 'textWork'}>{status ? 'Выполнено' : 'В работе'}</p>
            </th>
            <th className='columnDate'><p className='paddingForText'>{new Date(date).toLocaleDateString()}</p></th>
        </tr>
    )
}
