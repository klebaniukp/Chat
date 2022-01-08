import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserData } from '../api';
import { routes } from '../routes/index';
import { auth } from '../services/auth';
import { setFriendList } from '../services/setFriendList';
import { Navbar } from '../components/organisms/Navbar';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';
import { SearchUser } from './SearchUser';
import { Friends } from './Friends';
import { UserDataDisplay } from '../components/atoms/Card/UserDataDisplay';

export const Root = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        auth().then(userData => {
            dispatch({ type: 'SET_USER_DATA', payload: userData });
        });
    }, []);

    // setFriendList(i);

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
                    <Route
                        exact
                        path={routes.searchUser}
                        component={SearchUser}
                    />
                    <Route exact path={routes.friends} component={Friends} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};
