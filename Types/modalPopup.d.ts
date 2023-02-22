import { Post } from "./post";
import { Comment } from "./comment";

export interface ModalProp {
input: Post | object | Comment,
visible: boolean,
handleShow: (val: boolean) => void,
fields: string[] | undefined,
handleAction: (val: object) => void,
type: string 
}