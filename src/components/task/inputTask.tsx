import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import style from './inputTask.module.css'

interface IProps {
    status: boolean
    id: number
}

export const InputTask: FC<IProps> = ({status, id}) => {

    const {changeTask} = useActions()

    const changeStatus = (id: number, status: boolean) => {
        changeTask({id, status})
    }

    return (
        <label>
            <input
                type="checkbox"
                onChange={() => changeStatus(id, !status)}
            />
            <svg
                className={status ? style.checkboxActive : style.checkbox}
                aria-hidden="true"
                viewBox="0 0 10 11"
                fill="none"
            >
                <path
                    d="M1 5L5 10.5L9.5 1"
                    stroke={status ? "#134EC1" : "none"}
                />
            </svg>
        </label>
    )
}
