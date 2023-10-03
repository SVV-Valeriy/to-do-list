import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { CheckboxTask } from '../task/checkboxTask/checkboxTask'
import style from './separateTask.module.css'
import { ChevronRight } from '../../images/chevronRight'
import classNames from 'classnames'
import { useActions } from '../../hooks/action'
import { AddCommentForm } from './comments/formComment/addCommentForm'
import { CommentsTask } from './comments/commentsTask'
import { SubTask } from './subTask/subTask'
import { TaskMenu } from './taskMenu/taskMenu'
import { Modal } from '../modal/modal'
import { FormForTask } from '../form/formForTask'
import { DropPriority } from '../dropPriority/dropPriority'
import { PlusCircle } from '../../images/plusCircle'
import { Plus } from '../../images/plus'
import { FormSeparateTask } from './formSeparateTask/formSeparateTask'

export const SeparateTask = () => {
    const { id } = useParams()
    const { tasks } = useAppSelector(state => state.task)
    const separateTask = tasks.find(task => task.id == Number(id))
    const [editMode, setEditMode] = useState(false)
    const [activeSub, setActiveSub] = useState(true)
    const [activeComment, setActiveComment] = useState(true)
    const [isOpenModal, setOpenModal] = useState(false)
    const { addComment, changeStatus, addSubTask, changeTask, deleteTask } = useActions()

    const userName = 'Гость'

    const commentsElement = separateTask?.comments.map(({ id, date, comment }) => (
        <CommentsTask key={id} id={id} date={date} comment={comment} userName={userName} />
    ))

    const subTasksElement = separateTask?.subTasks.map(
        ({ id, name, description, status, priority, date, comments }) => (
            <SubTask
                key={id}
                subId={id}
                name={name}
                description={description}
                status={status}
                priority={priority}
                date={date}
                comments={comments}
            />
        )
    )

    const showSubTask = () => {
        setActiveSub(!activeSub)
    }

    const showComment = () => {
        setActiveComment(!activeComment)
    }

    const showModal = () => {
        setOpenModal(true)
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const buttonName = 'Создать'

    const title = 'Создать подзадачу'

    const subVision = classNames(style.visionArrow, {
        [style.coup]: activeSub,
    })

    const commentVision = classNames(style.visionArrow, {
        [style.coup]: activeComment,
    })

    const OnEditMode = () => {
        setEditMode(true)
    }

    const OffEditMode = () => {
        setEditMode(false)
    }

    return (
        <div className={style.containerForSeparate}>
            <div className={style.revertButton}>
                <NavLink to={'/'}>Вернуться к списку задач</NavLink>
            </div>
            <div className={style.taskWithMenu}>
                <div>
                    <div className={style.checkboxWithName}>
                        <CheckboxTask
                            changeStatus={changeStatus}
                            id={separateTask!.id}
                            status={separateTask!.status}
                        />
                        {editMode ? (
                            <FormSeparateTask
                                changeTask={changeTask}
                                OffEditMode={OffEditMode}
                                id={separateTask!.id}
                                description={separateTask!.description}
                                name={separateTask!.name}
                            />
                        ) : (
                            <div onClick={OnEditMode} className={style.nameWithDescription}>
                                <p className={style.name}>{separateTask?.name}</p>
                                <p className={style.description}>{separateTask?.description}</p>
                            </div>
                        )}
                    </div>
                    <div className={style.subAndComment}>
                        <div onClick={showSubTask} className={style.chevronWithSubTask}>
                            <ChevronRight coup={subVision} />
                            <p>Подзадачи</p>
                        </div>
                        {activeSub && (
                            <>
                                {subTasksElement}
                                <button className={style.addSubTask} onClick={showModal}>
                                    <Plus />
                                    <p className={style.textSubTask}>Добавить подзадачу</p>
                                </button>
                                {isOpenModal && (
                                    <Modal isOpenModal={isOpenModal} onClose={onClose}>
                                        <FormForTask
                                            isOpen={isOpenModal}
                                            id={Number(id)}
                                            setOpenModal={setOpenModal}
                                            title={title}
                                            submit={addSubTask}
                                            buttonName={buttonName}
                                        />
                                    </Modal>
                                )}
                            </>
                        )}
                        <div onClick={showComment} className={style.comment}>
                            <div className={style.chevronWithComment}>
                                <ChevronRight coup={commentVision} />
                                <p>Комментарии</p>
                            </div>
                            {activeComment && (
                                <>
                                    {commentsElement}
                                    <AddCommentForm
                                        userName={userName}
                                        addComment={addComment}
                                        id={separateTask!.id}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <TaskMenu
                    deleteTask={deleteTask}
                    id={id}
                    priority={separateTask!.priority}
                    date={separateTask!.date}
                />
            </div>
        </div>
    )
}
