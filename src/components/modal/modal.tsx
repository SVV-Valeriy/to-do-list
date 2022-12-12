import React, {FC, PropsWithChildren} from "react";
import style from './modal.module.css'
import classNames from "classnames";

interface IProps {
    isOpenModal: boolean
    setModal: (boolean: boolean) => void
}

export const Modal: FC<PropsWithChildren<IProps>> = ({isOpenModal, setModal, children}) => {

    const hideModal = () => {
        setModal(false)
    }

    const openModal = classNames(style.modal, {
        [style.modalActive]: isOpenModal
    })

    const modalContent = classNames(style.modalContent, {
        [style.modalContentActive]: isOpenModal
    })

    return (
        <div className={openModal} onClick={hideModal}>
            <div className={modalContent} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}