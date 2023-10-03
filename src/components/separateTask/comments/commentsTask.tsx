import React, {FC, useState} from "react";
import style from './commentsTask.module.css'
import {useActions} from "../../../hooks/action";
import {Trash} from "../../../images/trash";
import Tippy from "@tippyjs/react";
import {Pen} from "../../../images/pen";
import {ChangeCommentForm} from "./formComment/changeCommentForm";

interface IProps {
    id: number
    date: Date
    comment: string
    userName: string
}

export const CommentsTask: FC<IProps> = ({id, date, comment, userName}) => {

    const localDate = new Date(date).toLocaleDateString()
    const {deleteComment, changeComment} = useActions()
    const [editMode, setEditMode] = useState(false)

    const OnEditMode = () => {
        setEditMode(true)
    }

    const OffEditMode = () => {
        setEditMode(false)
    }

    const stopEvents = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const deleteObjective = () => {
        deleteComment({id})
    }

    const firstSymbolName = userName.slice(0, 1).toUpperCase()

    return (
        <div className={style.commentContainer} onClick={stopEvents} key={id}>
            <div className={style.commentContent}>
                <>
                    <p className={style.borderAvatar}>{firstSymbolName}</p>
                </>
                {editMode ? <ChangeCommentForm OffEditMode={OffEditMode} id={id} comment={comment}
                                               changeComment={changeComment}/>
                    :
                    <div className={style.nameWithComment}>
                        <div className={style.dateWithName}>
                            <p className={style.textUserName}>{userName}</p>
                            <p className={style.textForDate}>{localDate}</p>
                        </div>
                        <p className={style.textForComment}>{comment}</p>
                    </div>
                }
            </div>
            {!editMode &&
            <div className={style.setting}>
                <button className={style.invisibleButtonPen} onClick={OnEditMode}>
                    <Tippy content={<span>Изменить комментарий</span>}>
                        <div><Pen/></div>
                    </Tippy>
                </button>
                <button className={style.invisibleButton} onClick={deleteObjective}>
                    <Tippy content={<span>Удалить комментарий</span>}>
                        <div><Trash/></div>
                    </Tippy>
                </button>
            </div>}
        </div>
    )
}
