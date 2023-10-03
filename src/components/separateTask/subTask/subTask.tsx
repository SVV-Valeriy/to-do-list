import React, { FC, useState } from 'react'
import style from './subTask.module.css'
import { IComment } from '../../../store/slice'
import { CheckboxTask } from '../../task/checkboxTask/checkboxTask'
import { useActions } from '../../../hooks/action'
import { FormSeparateTask } from '../formSeparateTask/formSeparateTask'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import { Pen } from '../../../images/pen'
import { Trash } from '../../../images/trash'

interface IProps {
    subId: number
    name: string
    description: string
    status: boolean
    priority: number
    date: Date
    comments: Array<IComment>
}

export const SubTask: FC<IProps> = ({
    subId,
    name,
    description,
    priority,
    date,
    comments,
    status,
}) => {
    const [editMode, setEditMode] = useState(false)
    const { changeSubStatus, changeSubTask, deleteSubTask } = useActions()
    const { id } = useParams()
    const navigate = useNavigate()

    const OnEditMode = () => {
        setEditMode(true)
    }

    const OffEditMode = () => {
        setEditMode(false)
    }

    const localDate = new Date(date).toLocaleDateString()

    const stopEvents = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    // const transition = () => {
    //     navigate(`/${id}/${subId}`)
    // }

    const deleteObjective = () => {
        deleteSubTask({ id: subId })
    }

    return (
        <div className={style.subTaskContainer} onClick={stopEvents} key={subId}>
            <div className={style.checkbox}>
                <CheckboxTask changeStatus={changeSubStatus} id={subId} status={status} />
            </div>
            <div className={style.subTaskWithSetting}>
                {editMode ? (
                    <FormSeparateTask
                        changeTask={changeSubTask}
                        OffEditMode={OffEditMode}
                        id={subId}
                        description={description}
                        name={name}
                    />
                ) : (
                    <div className={style.nameWithDescription}>
                        <p className={style.name}>{name}</p>
                        <p className={style.description}>{description}</p>
                    </div>
                )}
                {!editMode && (
                    <div className={style.setting}>
                        <button className={style.invisibleButtonPen} onClick={OnEditMode}>
                            <Tippy content={<span>Изменить подзадачу</span>}>
                                <div>
                                    <Pen />
                                </div>
                            </Tippy>
                        </button>
                        <button className={style.invisibleButton} onClick={deleteObjective}>
                            <Tippy content={<span>Удалить подзадачу</span>}>
                                <div>
                                    <Trash />
                                </div>
                            </Tippy>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
