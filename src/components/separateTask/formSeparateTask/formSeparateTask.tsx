import React, {FC, RefObject, useRef} from "react";
import {useFormik} from "formik";
import style from './formSeparateTask.module.css'

interface IFormValues {
    name: string
    description: string
}

interface IProps {
    OffEditMode: () => void
    id: number
    name: string
    description: string
    changeTask: ({}) => ({})
}

export const FormSeparateTask: FC<IProps> = ({id, name, description, OffEditMode, changeTask}) => {

    const onSubmitForm = (values: IFormValues) => {
        changeTask({name: values.name, description: values.description, id: id})
        OffEditMode()
    }

    const formik = useFormik({
        initialValues: {
            name: name,
            description: description
        },
        onSubmit: onSubmitForm
    })

    const ref: RefObject<HTMLTextAreaElement> = useRef(null)

    return (
            <form onSubmit={formik.handleSubmit} className={style.formComment}>
                <>
                    <textarea className={style.inputName} onChange={formik.handleChange} value={formik.values.name}
                              id='name' name='name'/>
                    <textarea ref={ref} style={{height: ref?.current?.scrollHeight}}  className={style.inputDescription}
                              onChange={formik.handleChange}
                              value={formik.values.description} id='description' name='description'/>
                </>
                <div className={style.editWithSubmit}>
                    <button className={style.submitButton} type='submit'>Сохранить
                    </button>
                    <button className={style.editButton} type='button' onClick={OffEditMode}>Отмена
                    </button>
                </div>
            </form>
    )
}