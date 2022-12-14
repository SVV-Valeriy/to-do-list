import React, {FC, PropsWithChildren} from "react";
import style from './modal.module.css'
import classNames from "classnames";
import {Cross} from "../../images/cross";

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

    const openModalClass = classNames(style.modal, {
        [style.modalActive]: isOpenModal
    })

    const modalContentClass = classNames(style.modalContent, {
        [style.modalContentActive]: isOpenModal
    })

    return (
        <div className={openModalClass} onClick={onCloseHandler}>
            <div className={modalContentClass} onClick={stopEvents}>
                <div className={style.containerModal}>
                    <button className={style.invisibleButton} onClick={onCloseHandler}>
                        <Cross/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}