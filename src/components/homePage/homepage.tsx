import React, {useState} from "react";
import {useAppSelector} from "../../hooks/redux";
import {Task} from "../task/task";
import {TaskForm} from "../taskForm/taskForm";
import '../homePage/homepage.css'
import {Plus} from '../../images/plus'

export const HomePage = () => {

    const [active, setEditMode] = useState(true)

    const {tasks} = useAppSelector(state => state.task)

    const tasksElement = tasks.map(task => <Task key={task.description} status={task.status}
                                                 description={task.description} data={task.data} id={task.id}/>)

    return (
        <div className='container'>
            <div className='header'>
            <h1>To do list</h1>
            <Plus setEditMode={setEditMode}/>
            </div>
            <table>
                <thead>
                <tr className='table'>
                    <th className='column1'></th>
                    <th className='column2'><p className='borderLeft'>Описание</p></th>
                    <th className='column3'><p className='borderLeft'>Статус</p></th>
                    <th className='column4'><p className='borderLeft'>Дата</p></th>
                </tr>
                </thead>
                <tbody>
                {tasksElement}
                </tbody>
            </table>
            {active &&
            <TaskForm active={active} setEditMode={setEditMode}/>
            }
        </div>
    )
}




