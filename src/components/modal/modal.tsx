import React, {FC, PropsWithChildren} from "react";
import style from './modal.module.css'
import classNames from "classnames";
import {MinusIcon} from "../../images/minusIcon";

interface IProps {
    isOpenModal: boolean
    onClose: () => void
}

export const Modal: FC<PropsWithChildren<IProps>> = ({isOpenModal, onClose, children}) => {

    const onCloseHandler = () => {
        onClose()
    }

    const stopEvents = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const openModal = classNames(style.modal, {
        [style.modalActive]: isOpenModal
    })

    const modalContent = classNames(style.modalContent, {
        [style.modalContentActive]: isOpenModal
    })

    return (
        <div className={openModal} onClick={onCloseHandler}>
            <div className={modalContent} onClick={stopEvents}>
                <div className={style.containerModal}>
                    <button className={style.invisibleButton} onClick={onCloseHandler}>
                        <MinusIcon/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}