import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/index';
import { Main } from './Main';
import { Login } from './Login';
import { Register } from './Register';
import { Chat } from './Chat';
import { Auth } from './Auth';

export const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.home} component={Main} />
                <Route exact path={routes.login} component={Login} />
                <Route exact path={routes.register} component={Register} />
                <Route exact path={routes.chat} component={Chat} />
                <Route exact path={routes.auth} component={Auth} />
            </Switch>
        </BrowserRouter>
    );
};
