import React, {FC, useState} from "react";
import style from './task.module.css'
import {CheckboxTask} from "./checkboxTask/checkboxTask";
import {useActions} from "../../hooks/action";
import {Trash} from "../../images/trash";
import {MobileTask} from "./mobile/mobileTask";
import classNames from "classnames";
import {Modal} from "../modal/modal";
import {FormForTask} from "../form/formForTask";
import {Pen} from "../../images/pen";
import {IComment, ISubTasks} from "../../store/slice";
import {CommentsTask} from "../separateTask/comments/commentsTask";
import {AddCommentForm} from "../separateTask/comments/formComment/addCommentForm";
import {NavLink} from "react-router-dom";
import {Send} from "../../images/send";
import 'tippy.js/dist/tippy.css';
import {ChevronRight} from "../../images/chevronRight";
import {ChatSquare} from "../../images/chatSquare";
import {SubTask} from "../separateTask/subTask/subTask";
import {SeparateTask} from "../separateTask/separateTask";
import Tippy from "@tippyjs/react";
import {SubImages} from "../../images/subImages";

interface IProps {
    status: boolean
    name: string
    description: string
    priority: number
    date: Date
    id: number
    subTasks: Array<ISubTasks>
    comments: Array<IComment>
}

export const Task: FC<IProps> = ({status, name, description, date, id, comments, priority, subTasks}) => {

    const {deleteTask} = useActions()
    const {changeTask} = useActions()
    const {changeStatus} = useActions()
    const [isActiveDescription, setActiveDescription] = useState(false)
    const [isOpenModal, setOpenModal] = useState(false)

    const openDescription = () => {
        setActiveDescription(!isActiveDescription)
    }

    const showModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpenModal(true)
    }

    const onClose = () => {
        setOpenModal(false)
    }

    const deleteObjective = () => {
        deleteTask({id})
    }

    const textColor = classNames(style.textWork, {
        [style.textDone]: status,
    })

    const taskVision = classNames(style.visionArrow, {
        [style.coup]: isActiveDescription,
    })

    const priorityValues = (priority: number) => {
        switch (priority) {
            case 1:
                return 'High';
            case 2:
                return 'Middle';
            case 3:
                return 'Low';
            default:
                return priority
        }
    }

    const commentLength = comments.length
    const subTaskLength = subTasks.length

    const localDate = date.toLocaleDateString()

    const title = 'Редактировать задачу'

    const buttonName = 'Сохранить'

    return (
        <>
            <tr className={style.table} key={id}>
                <td className={style.columnCheckbox}>
                    <CheckboxTask changeStatus={changeStatus} id={id} status={status}/>
                </td>
                <th onClick={openDescription} className={style.columnName}>
                    <NavLink to={'/' + id}>
                            <p className={style.paddingForName}>{name}</p>
                        {/*<p className={style.paddingForDescription}>{description}</p>*/}
                        <div className={style.commentAndSubTask}>
                        {subTaskLength > 0 &&
                        <div className={style.chatSquarePosition}>
                            <SubImages subTaskImages={style.subTaskImages}/>
                            {subTaskLength}
                        </div>
                        }
                        {commentLength > 0 &&
                        <div className={style.chatSquarePosition}>
                            <ChatSquare chatSquare={style.chatComment}/>
                            {commentLength}
                        </div>
                        }
                        </div>
                        {/*{isActiveDescription &&*/}
                        {/*<>*/}
                        {/*    {subTasksElement}*/}
                        {/*    <MobileTask description={description} status={status} date={date}/>*/}
                        {/*    {comments.length > 0 &&*/}
                        {/*    <>*/}
                        {/*        <p className={style.paddingForComments}>Комментарии {commentLength}</p>*/}
                        {/*        {commentsElement}*/}
                        {/*    </>}*/}
                        {/*    <AddCommentForm addComment={addComment} id={id}/>*/}
                        {/*</>}*/}
                    </NavLink>
                    <div className={style.setting}>
                        <button className={style.invisibleButton} onClick={showModal}>
                            <Tippy content={<span>Изменить задачу</span>}>
                                <div><Pen/></div>
                            </Tippy>
                        </button>
                        <button className={style.invisibleButton} onClick={deleteObjective}>
                            <Tippy content={<span>Удалить задачу</span>}>
                                <div><Trash/></div>
                            </Tippy>
                        </button>
                        {/*<button className={style.invisibleButton}>*/}
                        {/*    <Tippy content={<span>Написать комментарий</span>}>*/}
                        {/*        <div><Send/></div>*/}
                        {/*    </Tippy>*/}
                        {/*</button>*/}
                    </div>
                </th>
                <th className={style.columnStatus}>
                    <p className={style.paddingForDate}>{priorityValues(priority)}</p>
                </th>
                <th className={style.columnDate}><p
                    className={style.paddingForDate}>{localDate}</p></th>
            </tr>
            {isOpenModal && <Modal onClose={onClose} isOpenModal={isOpenModal}>
                <FormForTask priority={priority} name={name} description={description} id={id} title={title}
                             submit={changeTask}
                             isOpen={isOpenModal} setOpenModal={setOpenModal} buttonName={buttonName}/>
            </Modal>}
        </>

    )
}
