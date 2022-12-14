import React, {FC} from "react";
import {useActions} from "../../../hooks/action";
import style from './checkboxTask.module.css'
import classNames from "classnames";

interface IProps {
    status: boolean
    id: number
}

export const CheckboxTask: FC<IProps> = ({status, id}) => {

    const {changeStatus} = useActions()

    const onChangeCheckbox = () => {
        changeStatus({id, status})
    }

    const checkboxActiveClass = classNames(style.checkbox, {
        [style.checkboxActive]: status,
    })

    return (
        <label>
            <input
                type="checkbox"
                onChange={onChangeCheckbox}
            />
            <svg
                className={checkboxActiveClass}
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
