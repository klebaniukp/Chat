import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes/index';
import { Main } from './Main';
import { Login } from './Login';
import { Register } from './Register';
import { Chat } from './Chat';

export const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={routes.home} component={Main} />
                <Route path={routes.login} component={Login} />
                <Route path={routes.register} component={Register} />
                <Route path={routes.chat} component={Chat} />
            </Switch>
        </BrowserRouter>
    );
};
