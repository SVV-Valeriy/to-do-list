import React, {FC, useState} from "react";
import {ErrorMessage, Field, Form, Formik, FormikHelpers, useFormikContext} from "formik";
import style from './formForTask.module.css'
import {Cross} from "../../images/cross";
import classNames from "classnames";
import {DropPriority} from "../dropPriority/dropPriority";

interface IFormValues {
    name: string
    description: string
    priority: number
}

interface IErrors {
    name?: string
}

interface IProps {
    title: string
    buttonName: string
    submit: ({}) => ({})
    name?: string
    description?: string
    id?: number
    priority?: number
    isOpen: boolean
    setOpenModal: (boolean: boolean) => void
}

const AutoValues = () => {
    const {values} = useFormikContext<IFormValues>()
    return null
}

export const FormForTask: FC<IProps> = ({isOpen, setOpenModal, submit, title, id, name, description, buttonName, priority}) => {

    const priorityValue = priority ? String(priority) : '3'

    const [selectedOption, setSelectedOption] = useState(priorityValue);

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        submit({name: values.name, description: values.description, priority: selectedOption, id: id})
        setOpenModal(false)
        resetForm()
    }

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
        <>
            <h3 className={style.leftPaddingHeader}>{title}</h3>
            <Formik
                initialValues={{
                    name: name ?? '',
                    description: description ?? '',
                    priority: priority ?? 3
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
                            <Field className={inputErrors(errors)} id='name' name='name'
                                   placeholder='Введите название'/>
                            <ErrorMessage component='Field' className={style.error} name='name'/>
                            <div className={style.textDescription}>Описание</div>
                            <Field className={style.inputDescription} component='textarea' id='description'
                                   name='description' placeholder='Введите описание'/>
                            <div className={style.prioritySelect}>
                                <div className={style.textPriority}>Приоритет: </div>
                                <DropPriority selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                            </div>
                            <AutoValues/>
                            <button className={buttonDisabled(values)} type='submit'>{buttonName}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}