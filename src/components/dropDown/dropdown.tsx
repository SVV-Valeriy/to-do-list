import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import './dropDown.css'

interface IProps {
    sort: string
    setSort: Dispatch<SetStateAction<string>>
    sortOrderStatus: boolean
    setSortOrderStatus: Dispatch<SetStateAction<boolean>>
    sortOrderDate: boolean
    setSortOrderDate: Dispatch<SetStateAction<boolean>>
    sortOrderPriority: boolean
    setSortOrderPriority: Dispatch<SetStateAction<boolean>>
}

const options = [
    { value: 'date', label: 'Дата' },
    { value: 'status', label: 'Статус' },
    { value: 'priority', label: 'Приоритет' },
]

export const DropDown: FC<IProps> = ({
    sort,
    setSort,
    sortOrderStatus,
    setSortOrderStatus,
    sortOrderDate,
    setSortOrderDate,
    sortOrderPriority,
    setSortOrderPriority,
}) => {
    const [selectedOption, setSelectedOption] = useState('date')

    const getValue = () => {
        return selectedOption ? options.find(c => c.value === selectedOption) : ''
    }

    const sortStatus = (sort: string, sortOrderStatus: boolean) => {
        setSort('status')
        setSortOrderStatus(sortOrderStatus)
    }

    const sortDate = (sort: string, sortOrderDate: boolean) => {
        setSort('date')
        setSortOrderDate(sortOrderDate)
    }

    const sortPriority = (sort: string, sortOrderPriority: boolean) => {
        setSort('priority')
        setSortOrderPriority(sortOrderPriority)
    }

    const onHandleChange = (newValue: SingleValue<string | { value: string }>) => {
        if (newValue) {
            if (typeof newValue !== 'string') {
                setSelectedOption(newValue.value)
                switch (newValue.value) {
                    case 'status':
                        return sortStatus('status', !sortOrderStatus)
                    case 'date':
                        return sortDate('date', !sortOrderDate)
                    case 'priority':
                        return sortPriority('priority', !sortOrderPriority)
                    default:
                        return setSort('')
                }
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
