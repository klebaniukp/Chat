import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from '../routes/index';
import { Navbar } from '../components/organisms/Navbar';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';

export const Root = () => {
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

{
    /* <Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route> */
}
//on /chat it will checked if the user isn't logged in, if so then redirect to /auth, if not then render the chat page.
