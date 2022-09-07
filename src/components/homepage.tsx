import React from "react";
import {useAppSelector} from "../hooks/redux";

export const HomePage = () => {

    const {task} = useAppSelector(state => state.task)

    const taskDescription = task.map(t => {
        return <p key={t.id}>{t.description}</p>
    })

    const taskData = task.map(t => {
        return <p key={t.id}>{t.data}</p>
    })

    return (
        <table className="table">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Описание</th>
                <th scope="col">Статус</th>
                <th scope="col">Дата</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row"></th>
                <td>{taskDescription}</td>
                <td></td>
                <td>{taskData}</td>
            </tr>
            </tbody>
        </table>
    )
}