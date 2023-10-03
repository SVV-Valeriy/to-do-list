import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import './dropPriority.css'
import { useActions } from '../../hooks/action'

interface IProps {
    id?: string
    selectedOption: number
    setSelectedOption: Dispatch<SetStateAction<number>>
}

const options = [
    { value: 1, label: 'High' },
    { value: 2, label: 'Middle' },
    { value: 3, label: 'Low' },
]

export const DropPriority: FC<IProps> = ({ id, selectedOption, setSelectedOption }) => {
    const { changePriority } = useActions()

    const getValue = () => {
        return selectedOption ? options.find(c => c.value === selectedOption) : ''
    }

    const onHandleChange = (newValue: SingleValue<string | { value: number }>) => {
        // const onHandleChange = (newValue: { label: string; value: number }) => {
        if (newValue) {
            if (typeof newValue !== 'string') {
                setSelectedOption(newValue.value)
                changePriority({ id, priority: newValue.value })
            }
        }
    }

    return (
        <div>
            <Select
                classNamePrefix="custom-select"
                onChange={onHandleChange}
                value={getValue()}
                options={options}
                isSearchable={false}
            />
        </div>
    )
}
