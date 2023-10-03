import React, {useState} from "react";
import style from './emptyTask.module.css'
import {Modal} from "../../modal/modal";
import {FormForTask} from "../../form/formForTask";
import {useActions} from "../../../hooks/action";
import {Plus} from "../../../images/plus";


export const EmptyTask = () => {

    const {addTask} = useActions()
    const [isOpenModal, setOpenModal] = useState(false)

    const showModal = () => {
        setOpenModal(true)
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const buttonName = 'Создать'

    const title = 'Создать новую задачу'

    return (
        <>
            <tr className={style.table}>
                <th className={style.columnCheckbox}>
                </th>
                <th className={style.columnName}>
                    <button className={style.addTask} onClick={showModal}>
                        <Plus/>
                        <p className={style.textTask}>Добавить задачу</p>
                    </button>
                </th>
            </tr>
            {isOpenModal && <Modal isOpenModal={isOpenModal} onClose={onClose}>
                <FormForTask isOpen={isOpenModal} setOpenModal={setOpenModal} title={title} submit={addTask}
                             buttonName={buttonName}/>
            </Modal>}
        </>
)
}
