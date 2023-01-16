import React, {FC, RefObject, useRef} from "react";
import {useFormik} from "formik";
import style from './changeCommentForm.module.css'

interface IFormValues {
    comment: string
}

interface IProps {
    OffEditMode: () => void
    id: number
    comment: string
    changeComment: ({}) => ({})
}

export const ChangeCommentForm: FC<IProps> = ({id, comment, OffEditMode, changeComment}) => {

    const onSubmitForm = (values: IFormValues) => {
        changeComment({comment: values.comment, id: id})
        OffEditMode()
    }

    const formik = useFormik({
        initialValues: {
            comment: comment,
        },
        onSubmit: onSubmitForm
    })

    const ref: RefObject<HTMLTextAreaElement> = useRef(null)

    return (
            <form onSubmit={formik.handleSubmit} className={style.formComment}>
                    <textarea className={style.inputName} onChange={formik.handleChange} value={formik.values.comment}
                              id='comment' name='comment'/>
                <div className={style.editWithSubmit}>
                    <button className={style.submitButton} type='submit'>Сохранить
                    </button>
                    <button className={style.editButton} type='button' onClick={OffEditMode}>Отмена
                    </button>
                </div>
            </form>
    )
}