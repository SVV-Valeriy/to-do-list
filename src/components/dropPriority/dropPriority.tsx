import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import Select from 'react-select';
import './dropPriority.css'
import {useActions} from "../../hooks/action";

interface IProps {
    id?: string
    selectedOption: string
    setSelectedOption: Dispatch<SetStateAction<string>>
}

const options = [
    {value: '1', label: 'High'},
    {value: '2', label: 'Middle'},
    {value: '3', label: 'Low'},
];

export const DropPriority: FC<IProps> = ({id, selectedOption, setSelectedOption}) => {

    const {changePriority} = useActions()

    const getValue = () => {
        return selectedOption ? options.find(c => c.value === selectedOption) : ''
    }

    const onHandleChange = (newValue: any) => {
        setSelectedOption(newValue.value)
        changePriority({id, priority: newValue.value})
    }

    return (
        <div>
            <Select
                classNamePrefix='custom-select'
                onChange={onHandleChange}
                value={getValue()}
                options={options}
                isSearchable={false}
            />
        </div>
    )
}