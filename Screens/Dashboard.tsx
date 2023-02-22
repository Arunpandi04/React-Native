import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { DashboardProps } from '../Types/Dashboard';
import { getAllPostAsync } from '../Store/Action/postAction';
import { getAllcommentAsync } from '../Store/Action/commentAction';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import Card from "../Components/PostCard";
import ModalPopup from "../Components/ModalPopup";
import { Post, ErrorPost } from '../Types/post'
import { Comment } from "../Types/comment";
import { putCommentAsync } from '../Store/Action/commentAction';
import { putPostAsync, postAsync } from '../Store/Action/postAction';
import Loading from "../Components/Loader";
import { Button, TextInput } from "react-native-paper";
import { getAsyncStorage } from "../Utils/storageUtils";
import { getUserAsync } from '../Store/Action/auth'

const DashboardScreen = (prop: DashboardProps) => {
    const [show, setShow] = useState(false);
    const [input, setInput] = useState<Post | object>({});
    const [post, setPost] = useState<Post>({
        title: "",
        body: "",
        user_id: 0,
    })

    const [error, setError] = useState<ErrorPost>({
        title: "",
        body: ""
    });
    const [type, setType] = useState<string>('');
    const [field, setField] = useState<string[] | undefined>();
    const [refreshing, setRefreshing] = useState(false);

    const selectorPost = useAppSelector((state) => state.post);
    const selectorUser = useAppSelector((state) => state.auth);
    const selectorComment = useAppSelector((state) => state.comment);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllPostAsync())
        dispatch(getAllcommentAsync())
    }, [selectorPost.message, selectorComment.message])

    useEffect(() => {
        setUser()
    }, [])

    const handleAction = (val: object) => {
        if (type === 'Post') {
            dispatch(putPostAsync(val as Post))
        } else {
            dispatch(putCommentAsync(val as Comment))
        }
    }

    const setUser = async () => {
        const id = await getAsyncStorage('userId') || selectorUser?.user?._id;
        dispatch(getUserAsync(Number(id)))
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getAllPostAsync())
        dispatch(getAllcommentAsync())
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);


    const validation = (input: Post) => {
        Object.keys(input).forEach((key: string) => {
            if (input && key && !input[key as keyof ErrorPost]?.length && key !== 'user_id') {
                error[key as keyof ErrorPost] = `${key} is missing`
            }
        });
        return error;
    }

    useEffect(() => {
        setPost({
            ...post,
            user_id: selectorUser?.user?.userId
        })
    }, [selectorUser?.user?.firstName?.length > 0])

    const handleSubmit = () => {
        const error = validation(post);
        const filterError = Object.values(error).filter(e => e !== '')
        if (filterError.length) {
            setError({ ...error });
            return false;
        }
        dispatch(postAsync(post as Post))
        setPost({
            ...post,
            title: "",
            body: ""
        })
    }

    return (
        <>
            {(selectorPost.loading || selectorComment.loading) && <Loading />}
            <View style={{ backgroundColor: 'white' }}>
                <View style={styles.padding}>
                    <TextInput
                        error={error.title.length ? true : false}
                        mode='outlined'
                        label="Post Title"
                        multiline
                        value={post.title}
                        onChangeText={text => setPost({ ...post, ['title']: text })}
                    />
                </View>
                <View style={styles.padding}>
                    <TextInput
                        error={error.body.length ? true : false}
                        mode='outlined'
                        label="Post Body"
                        multiline
                        numberOfLines={4}
                        value={post.body}
                        onChangeText={text => setPost({ ...post, ['body']: text })}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Button style={styles.button} mode="outlined" textColor="blue" onPress={() => handleSubmit()}>Post</Button>
                </View>

            </View>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {selectorPost.posts.map((e: Post, index: number) => {
                    return (
                        <View key={index}>
                            <Card index={index} user={selectorUser?.user} post={e} handleInput={(val: Post) => setInput({ ...val })} comments={selectorComment.comments} visible={show} handleShow={(val: boolean) => setShow(val)} handleField={(val: string[], type: string) => { setType(type); setField([...val]) }} />
                        </View>
                    )
                })}
            </ScrollView>
            <ModalPopup input={input} visible={show} handleShow={(val: boolean) => setShow(val)} fields={field} handleAction={(val: object) => handleAction(val)} type={type}/>
        </>
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
        color: 'red'
    },
    body: {
        fontSize: 15,
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
        color: 'black',
        fontSize: 15,
        fontWeight: 400,
        paddingBottom: 10
    },
    BageContainer: {
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 5
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

export default DashboardScreen;
