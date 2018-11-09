import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';

import Router from './config/routes';
import store from './redux/store';

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
    }

    async _loadAssetAsync() {
        const fontAssets = cacheFonts([
            { RobotoExtraBold: require('./assets/Roboto-Black.ttf') },
            { RobotoBold: require('./assets/Roboto-Bold.ttf') },
            { RobotMedium: require('./assets/Roboto-Medium.ttf') },
            { RobotoRegular: require('./assets/Roboto-Regular.ttf') },
            { RobotoLight: require('./assets/Roboto-Light.ttf') }
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}