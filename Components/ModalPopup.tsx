import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import { useEffect, useState } from 'react';
import { Modal } from 'react-native-paper';
import { ModalProp } from '../Types/modalPopup';
import { Post } from "../Types/post";
import { Comment } from "../Types/comment";

const containerStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
};


const ModalPopup = (props: ModalProp) => {
    const [input, setInput] = useState< Post | Comment | object >({});
    useEffect(() => {
        if(Object.keys(props.input).length) {
            setInput({ ...props.input })
        }
    }, [props.input])
    const onChange = (val: string, key: string) => {
        setInput({...input, [key]: val})
    }
    return (
        <Modal visible={props.visible}
            onDismiss={() => props.handleShow(!props.visible)}
            contentContainerStyle={containerStyle}>
             <View style={styles.title}>
                <Text style={styles.text}>{`Edit ${props.type}`}</Text>
            </View>
            <ScrollView>
            {props.fields && props.fields.map((field: string, index: number) => {
                return (
                    <View key={index} style={styles.padding}>
                        <Text style={styles.padding}>{field}</Text>
                        <TextInput multiline ={true} style={styles.input} onChangeText={(val: string) => onChange(val, field)}
                            value={input[field as keyof typeof input ]} />
                    </View>
                )
            })}
             </ScrollView>
             <View style={styles.padding}>
            <Button title="submit" onPress={() => {props.handleAction(input);props.handleShow(!props.visible)}} />
            </View>
        </Modal>
    )
}

export default ModalPopup;

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
    },
    padding: {
        padding: 10
    },
    text: {
        color: '#71797E',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500'
    },
    title: {
        backgroundColor: '#C0C0C0',
        borderRadius: 10
    }
});
