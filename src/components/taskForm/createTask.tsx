import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext} from "formik";
import style from './createTask.module.css'
import {MinusIcon} from "../../images/minusIcon";
import classNames from "classnames";

interface IFormValues {
    task: string
}

interface IErrors {
    task?: string
}

interface IProps {
    isModal: boolean
    setModal: (boolean: boolean) => void
}

const AutoValues = () => {
    const { values } = useFormikContext<IFormValues>()
    return null
}

export const CreateTask: FC<IProps> = ({isModal, setModal}) => {

    const {addTask} = useActions()

    const hideModal = () => {
        setModal(false)
    }

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        addTask({description: values.task})
        setModal(false)
        resetForm()
    }

    const openModal = classNames(style.modal, {
        [style.modalActive]: isModal
    })

    const modalContent = classNames(style.modalContent, {
        [style.modalContentActive]: isModal
    })

    const inputErrors = (errors: IErrors) => {
        return classNames(style.input, {
            [style.inputErrors]: errors.task
        })
    }

    const buttonDisabled = (values: IErrors) => {
        return classNames(style.buttonAdd, {
            [style.buttonAddFilled]: values.task
        })
    }

    return (
        <div className={openModal} onClick={hideModal}>
            <div className={modalContent} onClick={e => e.stopPropagation()}>
                <div className={style.containerModal}>
                    <h3 className={style.leftPaddingHeader}>Создать новую задачу</h3>
                    <button className={style.invisibleButton} onClick={hideModal}>
                        <MinusIcon/>
                    </button>
                </div>
        <Formik
            initialValues={{ task: '' }}
            validate={values => {
                const errors: IErrors = {}
                if (values.task.length < 1) {
                    errors.task = 'Введите описание';
                }
                return errors
            }}
            onSubmit={onSubmitForm}>
            {({errors, touched, values}) => (
                <Form>
                    <p className={style.textDescription}>Описание</p>
                    <div className={style.form}>
                        <Field className={inputErrors(errors)} type='text' id='task' name='task' placeholder='Введите описание'/>
                        <AutoValues />
                        <ErrorMessage component='div' className={style.error} name='task' />
                        <button className={buttonDisabled(values)} type='submit'>Создать</button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
    )
}