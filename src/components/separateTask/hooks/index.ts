import {useActions} from "../../../hooks/action";

export const useGetData = () => {
    const {addComment} = useActions()
    const {changeStatus} = useActions()
    const {addSubTask} = useActions()
    const {changeTask} = useActions()

    return {}
}

