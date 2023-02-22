import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from "react";
import CommentCard from "./CommentCard";
import { Comment } from '../Types/comment'
import { PostProps } from '../Types/post';
import { deletePostAsync } from '../Store/Action/postAction';
import { useAppDispatch } from '../Store/hooks';

const PostCard = (props: PostProps) => {
    const [show, setShow] = useState(false);
    const [postId, setPostId] = useState(0)
    const dispatch = useAppDispatch()

    const renderComments = (id: number, comments: Comment[]) => {
        const filterComment = comments.filter((e: Comment) => e.post_id.toString() === id.toString());
        return (
            <View style={styles.padding}>
                <TouchableOpacity onPress={() => getComment(id)}>
                    <View style={styles.comments}>
                        <Text>{filterComment?.length}</Text>
                        <FontAwesome name="comments" size={20} />
                    </View>
                </TouchableOpacity>
            </View>)
    }
    const getComment = (id: number) => {
        setShow(!show);
        setPostId(id);
    }

    return (
        <View>
            <View style={props.index%2 === 0 ? [styles.card, styles.shadowProp, styles.bgyellow] :[styles.card, styles.shadowProp, styles.bgblue] }>
                <View>
                    <View style={styles.container}>
                        <View style={[styles.padding, styles.heading]}>
                            <Text style={styles.title}>{props.post.title}</Text>
                        </View>
                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => { props.handleInput(props.post); props.handleShow(!props.visible); props.handleField(['title', 'body'], 'Post') }}>
                                <View style={styles.padding}>
                                    <Entypo name="edit" size={20} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => dispatch(deletePostAsync(props?.post?.id as number))}>
                                <View style={styles.padding}>
                                    <AntDesign name="delete" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.padding}>
                        <Text style={styles.body}>{props.post.body}</Text>
                    </View>
                    <View style={[styles.padding]}>
                        <Text  style={styles.body}>{props.post.user_id}</Text>
                    </View>
                    <View>
                        {renderComments(props?.post?.id || 0, props.comments)}
                    </View>
                </View>
            </View>
            {show && <CommentCard user={props.user} handleInput={props.handleInput} visible={show} visiblePopup={props.visible} handleShow={(val: boolean) => setShow(val)} comments={props.comments} id={postId} handleField={props.handleField} handleModalShow={props.handleShow} />}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    comments: {
        flexDirection: 'row',
        gap: 10,
    },
    padding: {
        padding: 10
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black'
    },
    body: {
        fontSize: 15,
        fontVariant: [ 'small-caps' ],
        color: 'black'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowOffset: { width: -2, height: 4 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    heading: {
        width: '80%'
    },
    bgyellow: {
        backgroundColor: '#F4F3B1'
    },
    bgblue: {
        backgroundColor: '#A5FBF9'
    }
});

export default PostCard;
