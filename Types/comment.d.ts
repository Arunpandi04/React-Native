import { user } from './user'

export interface Comment {
    name: string,
    body: string,
    post_id: number,
    id?: numberm
    email: string
}


export interface CommentProps {
    user: user
    handleInput: (val: Post) => void,
    comments: Comment[],
    visible: boolean,
    visiblePopup: boolean,
    handleShow: (val: boolean) => void,
    handleField: (val: string[], type: string) => void,
    id: number,
    handleModalShow:  (val: boolean) => void,
}