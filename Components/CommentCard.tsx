import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Comment } from '../Types/comment';
import { useAppDispatch } from '../Store/hooks';
import { commentAsync } from '../Store/Action/commentAction';
import { CommentProps } from '../Types/comment';
import { deleteCommentAsync } from "../Store/Action/commentAction";

const CommentCard = (props: CommentProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<Comment>({
        body: '',
        post_id: 0,
        email: '',
        name: ''
    })
    const dispatch = useAppDispatch();
    useEffect(() => {
        setComment({
            ...comment,
            post_id: props.id,
            email: props.user.email,
            name: props.user.firstName + " " + props.user.lastName
        })
    }, [])
    const windowWidth = Dimensions.get('window').width;
    useEffect(() => {
        const filterComment: Comment[] = props.comments.filter((e: Comment) => e.post_id === props.id);
        setComments([...filterComment])
    }, [props.comments])

    const handleAction = () => {
        dispatch(commentAsync(comment));
        setComment({
            ...comment,
            body: '',
        })
    }
    return (
        <View style={{ width: windowWidth - 30}}>
            <View style={styles.padding}>
                {comments.map((comment: Comment, index: number) => {
                    return (
                        <View key={index}>
                            <View style={styles.container}>
                                <View style={styles.padding}>
                                    <Text>{comment.email}</Text>
                                </View>
                                <View style={styles.padding}>
                                    <Text>{comment.name}</Text>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={[styles.padding, styles.heading]}>
                                    <Text>{comment.body}</Text>
                                </View>

                                <View style={styles.container}>
                                    <TouchableOpacity onPress={() => { props.handleInput(comment); props.handleField(['body'], 'Comment'); props.handleModalShow(!props.visiblePopup) }}>
                                        <View style={styles.padding}>
                                            <Entypo name="edit" size={20} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => dispatch(deleteCommentAsync(comment?.id as number))}>
                                        <View style={styles.padding}>
                                            <AntDesign name="delete" size={20} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    )
                })
                }
            </View>
            <View style={{ padding: 20 }}>
                <View style={styles.padding}>
                    <TextInput
                        mode='outlined'
                        label="Comment"
                        multiline
                        numberOfLines={4}
                        value={comment.body}
                        onChangeText={text => setComment({ ...comment, ['body']: text })}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Button style={styles.button} mode="outlined" textColor="blue" onPress={() => handleAction()}>Comment</Button>
                </View>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    heading: {
        width: '80%'
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
        color: 'red'
    },
    body: {
        fontSize: 15,
        color: 'black'
    },
    button: {
        width: '50%',
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        padding: 10
    }
});

export default CommentCard;
