import React, {Component} from "react";
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
export default class Main extends Component {
    static navigationOptions = {
        title: "JSHunt"
    }

    render() {
        return(
            <View>
                <Text>Página Main</Text>
            </View>
        )
    }
}