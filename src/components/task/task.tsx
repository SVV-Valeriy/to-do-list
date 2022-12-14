import React, {FC, useState} from "react";
import style from './task.module.css'
import {InputTask} from "./inputTask";
import {useActions} from "../../hooks/action";
import {Trash} from "../../images/trash";
import {MobileTask} from "./mobileTask";
import {Arrow} from "../../images/arrow";
import classNames from "classnames";
import {Modal} from "../modal/modal";
import {FormForTask} from "../form/formForTask";
import {Pen} from "../../images/pen";

interface IProps {
    status: boolean
    name: string
    description: string
    date: Date
    id: number
}

export const Task: FC<IProps> = ({status, name, description, date, id}) => {

    const {deleteTask} = useActions()
    const {changeTask} = useActions()
    const [isActiveDescription, setActiveDescription] = useState(false)
    const [isOpenModal, setOpenModal] = useState(false)

    const openDescription = () => {
        setActiveDescription(!isActiveDescription)
    }

    const showModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenModal(true)
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const deleteObjective = () => {
        deleteTask({id})
    }

    const textColor = classNames(style.textWork, {
        [style.textDone]: status,
    })

    const taskVision = classNames(style.visionArrow, {
        [style.coup]: isActiveDescription,
    })

    const localDate = new Date(date).toLocaleDateString()

    const title = 'Редактировать задачу'

    return (
        <>
            <tr className={style.table} key={id}>
                <th className={style.columnCheckbox}>
                    <InputTask id={id} status={status}/>
                </th>
                <th onClick={openDescription} className={style.columnName}>
                    <div>
                    <p className={style.paddingForName}>{name}</p>
                    {isActiveDescription &&
                    <p className={style.paddingForDescription}>{description}</p>}
                    </div>
                    <div className={style.setting}>
                    <Arrow coup={taskVision}/>
                    <button className={style.invisibleButton} onClick={showModal}>
                        <Pen/>
                    </button>
                    </div>
                </th>
                <th className={style.columnStatus}>
                    <p className={textColor}>{status ? 'Выполнено' : 'В работе'}</p>
                </th>
                <th className={style.columnDate}><p
                    className={style.paddingForDate}>{localDate}</p></th>
                <th className={style.columnDelete}>
                    <button className={style.invisibleButton} onClick={deleteObjective}>
                        <Trash/>
                    </button>
                </th>
            </tr>
            {isActiveDescription &&
            <MobileTask description={description} status={status} date={date}/>}
            {isOpenModal && <Modal onClose={onClose} isOpenModal={isOpenModal}>
                <FormForTask name={name} description={description} id={id} title={title} submit={changeTask}
                             isOpenModal={isOpenModal} setOpenModal={setOpenModal}/>
            </Modal>}
        </>

    )
}
