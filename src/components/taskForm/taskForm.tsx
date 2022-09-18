import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import {Field, Form, Formik, FormikHelpers} from "formik";
import './taskForm.css'
import {MinusIcon} from "../../images/minusIcon";

interface IFormValues {
    task: string
}

interface IProps {
    isModal: boolean
    setModal: (boolean: boolean) => void
}

export const TaskForm: FC<IProps> = ({isModal, setModal}) => {

    const {addTask} = useActions()

    const hideModal = () => {
        setModal(false)
    }

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        addTask({description: values.task})
        resetForm()
    }

    return (
        <div className={isModal ? 'modal active' : 'modal'} onClick={hideModal}>
            <div className={isModal ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <div className='header containerModal'>
                    <h2>Создать новую задачу</h2>
                    <button className='invisibleButton' onClick={hideModal}>
                        <MinusIcon/>
                    </button>
                </div>
        <Formik
            initialValues={{
                task: ''
            }}
            onSubmit={onSubmitForm}>
            {({errors, touched}) => (
                <Form className='containerModal'>
                    <p className='textDescription'>Описание</p>
                    <div className='form'>
                        <Field className='input' id="task" name="task" placeholder='Введите описание'/>
                        <button className='buttonAdd' type="submit"><p className='textCreate'>Создать</p></button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
    )
}