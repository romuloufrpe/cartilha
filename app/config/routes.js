import React from 'react';
import { Scene, Router, ActionConst, Stack, Modal, Tabs } from 'react-native-router-flux';

//Splash Component
import Splash from "../components/Splash"

//Cenas da Autenticação
import Welcome from '../pages/auth/scenes/Auth/Welcome';
import Register from '../pages/auth/scenes/Auth/Register';
import CompleteProfile from '../pages/auth/scenes/Auth/CompleteProfile';
import Login from '../pages/auth/scenes/Auth/Login';
import ForgotPassword from '../pages/auth/scenes/Auth/Forgotpassword';
import Home from '../pages/home/scenes/Home';

//Import store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../pages/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            exist: false // Indica se o usuário existe no banco de dados em tempo real
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({ isReady: true, exist, isLoggedIn });
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash />

        return (
            <Router>
                <Scene key="root" hideNavBar
                    navigationBarStyle={{ backgroundColor: "#fff" }}
                    titleStyle={navTitleStyle}
                    backButtonTintColor={color.black}>
                    <Stack key="Auth" initial={!this.state.isLoggedIn}>
                        <Scene key="welcome" component={Welcome} title="" initial={true} hideNavBar />
                        <Scene key="Register" component={Register} title="Register" back />
                        <Scene key="CompleteProfile" component={CompleteProfile} title="Escolha seu Username" back={false} />
                        <Scene key="Login" component={Login} title="Login" />
                        <Scene key="ForgotPassword" component={ForgotPassword} title="Esqueceu a senha" />
                    </Stack>

                    <Stack key="Main" initial={this.state.isLoggedIn}>
                        <Scene key="Home" component={Home} title="Home" initial={true} type={ActionConst.REPLACE} />
                    </Stack>
                </Scene>
            </Router>
        )
    }
}