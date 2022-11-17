import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import {Field, Form, Formik, FormikHelpers} from "formik";
import style from './createTask.module.css'
import {MinusIcon} from "../../images/minusIcon";

interface IFormValues {
    task: string
}

interface IProps {
    isModal: boolean
    setModal: (boolean: boolean) => void
}

export const CreateTask: FC<IProps> = ({isModal, setModal}) => {

    const {addTask} = useActions()

    const hideModal = () => {
        setModal(false)
    }

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        addTask({description: values.task})
        resetForm()
    }

    return (
        <div className={isModal ? style.modalActive : style.modal} onClick={hideModal}>
            <div className={isModal ? style.modalContentActive : style.modalContent} onClick={e => e.stopPropagation()}>
                <div className={style.containerModal}>
                    <h3 className={style.leftPaddingHeader}>Создать новую задачу</h3>
                    <button className={style.invisibleButton} onClick={hideModal}>
                        <MinusIcon/>
                    </button>
                </div>
        <Formik
            initialValues={{
                task: ''
            }}
            onSubmit={onSubmitForm}>
            {({errors, touched}) => (
                <Form>
                    <p className={style.textDescription}>Описание</p>
                    <div className={style.form}>
                        <Field className={style.input} id="task" name="task" placeholder='Введите описание'/>
                        <button className={style.buttonAdd} type="submit"><p className={style.textCreate}>Создать</p></button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
    )
}