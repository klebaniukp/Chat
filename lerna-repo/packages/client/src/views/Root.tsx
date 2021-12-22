import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../routes/index';
import { auth } from '../services/auth';
import { Navbar } from '../components/organisms/Navbar';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';

export const Root = () => {
    auth();

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path={routes.home} component={Main}>
                        <Redirect to={routes.auth} />
                    </Route>
                    <Route exact path={routes.chat} component={Chat} />
                    <Route exact path={routes.auth} component={Auth} />
                    <Route exact path={routes.profile} component={Profile} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
