import React, {useState} from "react";
import {Modal} from "../modal/modal";
import style from './header.module.css'
import {PlusCircle} from '../../images/plusCircle'
import {useActions} from "../../hooks/action";
import {FormForTask} from "../form/formForTask";

export const Header = () => {

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
            <div className={style.header}>
                <h1 className={style.title}>To do list</h1>
                <button className={style.invisibleButton} onClick={showModal}>
                    <PlusCircle/>
                </button>
            </div>
            {isOpenModal && <Modal isOpenModal={isOpenModal} onClose={onClose}>
                <FormForTask isOpen={isOpenModal} setOpenModal={setOpenModal} title={title} submit={addTask}
                             buttonName={buttonName}/>
            </Modal>}
        </>
    )
}
