import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../asset';

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                autoPlay
                loop
                source={assets.lottieFiles.loadingPath}
                colorFilters={[{ keypath: 'Plane', color: 'rgb(255, 100, 0)' }]}
            />
        </View>
    );
};
export default Loading;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        bottom:0,
        left:0,
        right:0,
        // backgroundColor: 'white',
        zIndex: 1
        
    }
})