import React, { FC } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import style from './addCommentForm.module.css'
import { Send } from '../../../../images/send'
import Tippy from '@tippyjs/react'

interface IFormValues {
    comment: string
}

interface IProps {
    addComment: ({}) => {}
    id: number
    userName: string
}

export const AddCommentForm: FC<IProps> = ({ id, addComment, userName }) => {
    const onSubmitForm = (values: IFormValues, { resetForm }: FormikHelpers<IFormValues>) => {
        addComment({ comment: values.comment, id: id })
        resetForm()
    }

    const stopEvents = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const firstSymbolName = userName.slice(0, 1).toUpperCase()

    return (
        <>
            <Formik
                initialValues={{
                    comment: '',
                }}
                onSubmit={onSubmitForm}
            >
                {({ errors, touched, values }) => (
                    <Form className={style.formComment} onClick={stopEvents}>
                        <p className={style.borderAvatar}>{firstSymbolName}</p>
                        <div className={style.inputWithButton}>
                            <Field id="comment" name="comment" placeholder="Комментировать" />
                            <button className={style.invisibleButton} type="submit">
                                <Tippy content={<span>Отправить комментарий</span>}>
                                    <div>
                                        <Send />
                                    </div>
                                </Tippy>
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}
