import React, {FC} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext} from "formik";
import style from './createTask.module.css'
import {MinusIcon} from "../../images/minusIcon";
import classNames from "classnames";

interface IFormValues {
    name: string
    description: string
}

interface IErrors {
    name?: string
}

interface IProps {
    title: string
    submit: ({}) => ({})
    name?: string
    description?: string
    id?: number
    isModal: boolean
    setModal: (boolean: boolean) => void
}

const AutoValues = () => {
    const { values } = useFormikContext<IFormValues>()
    return null
}

export const CreateTask: FC<IProps> = ({isModal, setModal, submit, title, id, name, description}) => {


    const hideModal = () => {
        setModal(false)
    }

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        submit({name: values.name, description: values.description, id: id})
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
        return classNames(style.inputName, {
            [style.inputErrors]: errors.name
        })
    }

    const buttonDisabled = (values: IErrors) => {
        return classNames(style.buttonAdd, {
            [style.buttonAddFilled]: values.name
        })
    }


    return (
        <div className={openModal} onClick={hideModal}>
            <div className={modalContent} onClick={e => e.stopPropagation()}>
                <div className={style.containerModal}>
                    <h3 className={style.leftPaddingHeader}>{title}</h3>
                    <button className={style.invisibleButton} onClick={hideModal}>
                        <MinusIcon/>
                    </button>
                </div>
        <Formik
            initialValues={{
                name: name ?? '',
                description: description ?? ''
            }}
            validate={values => {
                const errors: IErrors = {}
                if (values.name.length < 1) {
                    errors.name = 'Введите название';
                }
                return errors
            }}
            onSubmit={onSubmitForm}>
            {({errors, touched, values}) => (
                <Form>
                    <p className={style.textName}>Название</p>
                    <div className={style.form}>
                        <Field className={inputErrors(errors)} id='name' name='name' placeholder='Введите название'/>
                        <div className={style.textDescription}>Описание</div>
                        <Field className={style.inputDescription} component="textarea" id='description' name='description' placeholder='Введите описание'/>
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