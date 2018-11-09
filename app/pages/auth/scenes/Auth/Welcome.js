import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import { Button, SocialIcon, Divider } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux';

import { Facebook } from 'expo';

import { actions as auth, constants as c } from "../../index"

const { signInWithFacebook } = auth;

import styles from "./styles"

class Welcome extends React.Component {
    //get users permission authorization (ret: facebook token)
    onSignInWithFacebook = async () => {
        const options = { permissions: ['public_profile', 'email'], }
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, options);

        if (type === 'success') {
            this.props.signInWithFacebook(token)
                .then(({ exists, user }) => {
                    if (exists) Actions.Main()
                    else Actions.CompleteProfile({ user })
                })
                .catch((error) => alert(error.message))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={{ uri: "" }} />
                    <Text style={styles.title}>Cartilhas</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <SocialIcon
                            raised
                            button
                            type='facebook'
                            title='INSCREVA-SE COM O FACEBOOK'
                            iconSize={19}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonText}
                            onPress={this.onSignInWithFacebook} />

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider} />
                            <Text style={styles.orText}>
                                Ou
                            </Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'INSCREVA-SE COM E-MAIL'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={Actions.Register} />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Já tem uma conta?
                        </Text>

                        <TouchableOpacity onPress={Actions.Login}>
                            <Text style={styles.signInText}>
                                crie aqui
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}


export default connect(null, { signInWithFacebook })(Welcome);