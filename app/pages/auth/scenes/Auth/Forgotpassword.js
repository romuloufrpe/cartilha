import React from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { actions as auth } from "../../index"

const { resetPassword } = auth;

import Form from "../../components/Form"

const fields = [
    {
        key: 'email',
        label: "Endereço de Email",
        placeholder: "Email",
        autoFocus: false,
        secureTextEntry: false,
        value: "test@emaildigital.com",
        type: "email"
    }
];

const error = {
    general: "",
    email: ""
}

class ForgotPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }
    }

    onSubmit = (data) => {
        this.setState({ error: error }) // Limpa as mensagens de erro

        this.props.resetPassword(data)
            .then(() => {
                alert("Lembra a senha enviado")
                Actions.pop()
            }).catch(this.onError);
    }

    onError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error)
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }

        this.setState({ error: errObj });
    }

    render() {
        return (
            <Form
                fields={fields}
                onSubmit={this.onSubmit}
                buttonTitle={"ENVIAR"}
                error={this.state.error}
            />
        );
    }
}

export default connect(null, { resetPassword })(ForgotPassword);