import { user } from './user'
import { Comment } from './comment'
export interface Post {
    title: string,
    body: string,
    user_id: number,
    id?: number
}


export interface ErrorPost {
    title: string,
    body: string,
}


export interface PostProps {
    user: user
    post: Post,
    handleInput: (val: Post) => void,
    comments: Comment[],
    visible: boolean,
    index: number,
    handleShow: (val: boolean) => void,
    handleField: (val: string[], type: string) => void
}