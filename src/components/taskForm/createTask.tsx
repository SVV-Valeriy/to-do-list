import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext} from "formik";
import style from './createTask.module.css'
import {MinusIcon} from "../../images/minusIcon";
import classNames from "classnames";

interface IFormValues {
    task: string
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
            initialValues={{ task: '' }}
            validate={values => {
                const errors = {
                    task: ''
                }
                if (values.task === '') {
                    errors.task = 'Введите описание';
                }
                return errors
            }}
            onSubmit={onSubmitForm}>
            {({errors, touched, values}) => (
                <Form>
                    <p className={style.textDescription}>Описание</p>
                    <div className={style.form}>
                        <Field className={errors.task ? style.inputErrors : style.input}
                               type='text' id='task' name='task' placeholder='Введите описание'/>
                        <AutoValues />
                        <ErrorMessage component='div' className={style.error} name='task' />
                        <button className={values.task ? style.buttonAddFilled : style.buttonAdd} type='submit'>
                            <p className={values.task ? style.textCreateFilled : style.textCreate}>Создать</p></button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
    )
}