import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import style from './inputTask.module.css'
import classNames from "classnames";

interface IProps {
    status: boolean
    id: number
}

export const InputTask: FC<IProps> = ({status, id}) => {

    const {changeStatus} = useActions()

    const changeCheckbox = () => {
        changeStatus({id, status})
    }

    const checkboxActive = classNames(style.checkbox, {
        [style.checkboxActive]: status,
    })

    return (
        <label>
            <input
                type="checkbox"
                onChange={changeCheckbox}
            />
            <svg
                className={checkboxActive}
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
