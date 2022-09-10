import {FC} from "react";

interface Props {
    setEditMode: (boolean: boolean) => void
}

export const Plus: FC<Props> = ({setEditMode}) => {

    const showModal = () => {
        setEditMode(true)
    }

    return (
    <svg onClick={showModal} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#D6DBEB"/>
        <rect x="19" y="10" width="2" height="20" fill="#314B99"/>
        <rect x="30" y="19" width="2" height="20" transform="rotate(90 30 19)" fill="#314B99"/>
    </svg>
)
}