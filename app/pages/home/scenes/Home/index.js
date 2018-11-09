import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import {actions as home} from "../../index"
const {getPrimers} = home;

import styles from "./styles"
import Primer from "../../components/Primer"

class Home extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        this.props((error) => alert(error.message))
    }

    renderItem({ item, index }) {
        return <Primer index={index} />
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.ActivityIndicator}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            return (
                <View style={styles.ActivityIndicator}>
                    <FlatList
                        ref='listRef'
                        data={this.props.primers}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            );
        }

    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.homeReducer.isLoading,
        primers: state.homeReducer.primers
    }
}
export default connect(mapStateToProps, { getPrimers })(Home);