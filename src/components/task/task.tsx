import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import '../task/task.css'


interface Props {
    status: boolean
    description: string
    data: string
    id: number
}

export const Task: FC<Props> = ({status, description, data, id}) => {

    const {changeTask} = useActions()

    const changeStatus = (id: number, status: boolean) => {
        changeTask({id, status})
    }

    return (
    <tr className='table' key={description}>
        <th className='column1'>
            <input type="checkbox" checked={status} onChange={() => changeStatus(id, !status)}/>
        </th>
        <th className='column2'><p className='paddingForText'>{description}</p></th>
        {status
            ? <th className='column3'><p className='textWork'>Выполненно</p></th>
            : <th className='column3'><p className='textDone'>В работе</p></th>
        }
        <th className='column4'><p>{data}</p></th>
    </tr>
    )
}