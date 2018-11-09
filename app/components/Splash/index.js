import React from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';


import styles from './styles'

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} soucer={{uri: ""}}/>
                    <Text style={styles.title}>Cartilhas</Text>
                </View>
                <View style = { styles.ActivityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        );
    }
}