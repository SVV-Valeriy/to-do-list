import React, {FC} from "react";
import {useActions} from "../../hooks/action";
import {Field, Form, Formik, FormikHelpers} from "formik";
import './taskForm.css'
import {Minus} from "../../images/minus";

interface IFormValues {
    task: string
}

interface Props {
    active: boolean
    setEditMode: (boolean: boolean) => void
}

export const TaskForm: FC<Props> = ({active, setEditMode}) => {

    const {addTask} = useActions()

    const addNewTask = (description: string) => {
        addTask({description})
    }

    const hideModal = () => {
        setEditMode(false)
    }

    const onSubmitForm = (values: IFormValues, {resetForm}: FormikHelpers<IFormValues>) => {
        addNewTask(values.task)
        resetForm()
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={hideModal}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <div className='header containerModal'>
                    <h2>Создать новую задачу</h2>
                    <Minus setEditMode={setEditMode}/>
                </div>
        <Formik
            initialValues={{
                task: ''
            }}
            onSubmit={onSubmitForm}
        >
            {({errors, touched}) => (

                <Form className='containerModal'>
                    <p>Описание</p>
                    <div className='form'>
                        <Field className='input' id="task" name="task" placeholder='Введите описание'/>
                        <button className='buttonAdd' type="submit">Создать</button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
        </div>
    )
}