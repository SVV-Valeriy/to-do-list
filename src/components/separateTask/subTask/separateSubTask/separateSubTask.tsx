import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../../hooks/redux";
import {useActions} from "../../../../hooks/action";
import {CommentsTask} from "../../comments/commentsTask";
import style from './separateSubTask.module.css'
import {CheckboxTask} from "../../../task/checkboxTask/checkboxTask";
import {FormSeparateTask} from "../../formSeparateTask/formSeparateTask";
import {ChevronRight} from "../../../../images/chevronRight";
import {AddCommentForm} from "../../comments/formComment/addCommentForm";
import {TaskMenu} from "../../taskMenu/taskMenu";
import classNames from "classnames";

export const SeparateSubTask = () => {

    const {id} = useParams();
    const {subId} = useParams();
    const navigate = useNavigate();
    const {tasks} = useAppSelector(state => state.task)
    const separateTask = tasks.find(task => task.id == Number(id))
    const sepatareSubTask = separateTask?.subTasks.find(subTask => subTask.id == Number(subId))
    const [editMode, setEditMode] = useState(false)
    const [activeComment, setActiveComment] = useState(true)
    const {changeSubStatus, changeSubTask, deleteSubTask} = useActions()

    console.log(sepatareSubTask)

    const userName = 'Гость'

    const commentsElement = separateTask?.comments.map(({id, date, comment}) => (
        <CommentsTask key={id} id={id} date={date} comment={comment} userName={userName}/>))

    const showComment = () => {
        setActiveComment(!activeComment)
    }

    const revertButton = () => {
        navigate(-1)
    }

    const OnEditMode = () => {
        setEditMode(true)
    }

    const OffEditMode = () => {
        setEditMode(false)
    }

    const commentVision = classNames(style.visionArrow, {
        [style.coup]: activeComment,
    })

    const addComment = () => {
        console.log('Новый комментарий')
    }

    return (
        <div className={style.containerForSeparate}>
            <div className={style.revertButton}>
                <span onClick={revertButton}>Вернуться к задаче</span>
            </div>
            <div className={style.taskWithMenu}>
                <div>
                    <div className={style.checkboxWithName}>
                        <CheckboxTask changeStatus={changeSubStatus} id={sepatareSubTask!.id}
                                      status={sepatareSubTask!.status}/>
                        {editMode ? <FormSeparateTask OffEditMode={OffEditMode} id={sepatareSubTask!.id} changeTask={changeSubTask}
                                                      description={sepatareSubTask!.description} name={sepatareSubTask!.name}/>
                            :
                            <div onClick={OnEditMode} className={style.nameWithDescription}>
                                <p className={style.name}>{sepatareSubTask?.name}</p>
                                <p className={style.description}>{sepatareSubTask?.description}</p>
                            </div>}
                    </div>
                    <div className={style.subAndComment}>
                        <div onClick={showComment} className={style.comment}>
                            <div className={style.chevronWithComment}>
                                <ChevronRight coup={commentVision}/>
                                <p>Комментарии</p>
                            </div>
                            {activeComment &&
                            <>
                                {commentsElement}
                                <AddCommentForm userName={userName} addComment={addComment} id={separateTask!.id}/>
                            </>}
                        </div>
                    </div>
                </div>
                <TaskMenu deleteTask={deleteSubTask} id={subId} priority={sepatareSubTask!.priority} date={sepatareSubTask!.date}/>
            </div>
        </div>
    )
}