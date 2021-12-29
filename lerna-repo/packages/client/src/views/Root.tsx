import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { getUserData } from '../api/index';
import { useDispatch } from 'react-redux';
import { IUserData } from '../types/types';
import { routes } from '../routes/index';
import { auth } from '../services/auth';
import { Navbar } from '../components/organisms/Navbar';
import { Main } from './Main';
import { Chat } from './Chat';
import { Auth } from './Auth';
import { Profile } from './Profile';
import { SearchUser } from './SearchUser';

let i = 0;

export const Root = () => {
    auth(i);
    i = i + 1;
    // useEffect(() => {
    // auth();
    // try {
    //     const dispatch = useDispatch();

    //     getUserData()
    //         .then((res: any) => {
    //             const userData: IUserData = {
    //                 id: res.data._id,
    //                 email: res.data.email,
    //                 name: res.data.name,
    //                 lastName: res.data.lastName,
    //                 friends: res.data.friends,
    //             };

    //             dispatch({ type: 'SET_USER_DATA', payload: userData });
    //         })
    //         .catch((err: string | undefined) => {
    //             console.log(err);
    //         });
    // } catch (err) {
    //     console.log(err);
    // }
    // }, [i]);

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
                </Switch>
            </div>
        </BrowserRouter>
    );
};
