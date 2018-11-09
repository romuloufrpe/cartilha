import React from 'react';

import { Text, View, TouchableOpacity, ActionSheetIOS } from 'react-native';

import { Icon } from 'react-native-elements';
import moment from "moment";

import styles from "./styles";
import { connect } from "react-redux"

import { actions, theme } from "../../index";
import { Actions } from "react-native-router-flux";

const { deletePrimer, toggleLove } = actions;
const { normalize } = theme;

class Primer extends React.Component {
    constructor() {
        super();
        this.state = {}

        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onToggleLove = this.onToggleLove.bind(this);

        this.renderLoveButton = this.renderLoveButton.bind(this);
    }

    onOption() {
        const { primers, index } = this.props;
        const primer = primers[index];

        ActionSheetIOS.showActionSheetWithOptions({
            options: ['Edit', 'Delete', 'Cancel'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 2,
        },
            (buttonIndex) => {
                if (buttonIndex === 0) Actions.NewPrimer({ edit: true, primer })
                else if (buttonIndex === 1) this.onDelete();
            });
    }

    onDelete() {
        const { primers, index } = this.props;
        const primer = primers[index];

        this.props.deletePrimer(primer, (error) => alert(error.message))
    }

    onToggleLove() {
        const { user, primers, index } = this.props;
        const primer = primers[index];

        const data = { primer, uid: user.uid };

        this.props.toggleLove(data, (error) => alert(errorr.message))
    }

    renderOptionsButton() {
        return (
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={
                                (loves && loves[user.uid]) ?
                                    'md-heart'
                                    :
                                    'md-heart-outline'
                            }
                            type='ionicon'
                            color="#fff"
                            iconStyle={{ height: normalize(20) }}
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { user, primers, index } = this.props;
        const prime = primers[index];
        const { text, author, time, color, userId } = primer;

        return (
            <View style={[styles.container]}>
                <View style={[styles.wrapper, { backgroundColor: color, borderColor: color }]}>

                    <View style={[styles.primer]}>
                        <Text style={[styles.text]}>
                            {text}
                        </Text>
                        {(user.uid === userId) && this.renderOptionsButton()}
                    </View>

                    <View style={styles.bottom}>


                        <View style={styles.left}>
                            <Text style={[styles.author]}>
                                {author.name}
                            </Text>

                            <Text style={[styles.publishedAt]}>
                                {moment(time).fromNow()}
                            </Text>
                        </View>
                        <View style={styles.right}>
                            {this.renderLoveButton()}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateTopProps(state, props) {
    return {
        user: state.authReducer.user,
        primers: state.homeReducer.primers
    }
}

export default connect(mapStateTopProps, { deletePrimer, toggleLove })(Primer);