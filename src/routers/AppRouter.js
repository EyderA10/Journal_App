import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import {firebase} from '../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import {PublicRoute} from './PublicRoute'
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isloggedIn, setIsloggedIn] = useState(false);


    useEffect(() => {
                        //observable que va estar pendiente de esta (user) se este ejecutando
        firebase.auth().onAuthStateChanged( (user) => {
            //el ? significa si el obj user tiene algo entonces pregunta si existe el uid
            if(user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsloggedIn(true);
                dispatch(startLoadingNotes(user.uid));
            }else{
                setIsloggedIn(false);
            }

            setChecking(false);

        });

    }, [dispatch, setChecking, setIsloggedIn]);

    if(checking){
        return (
            <h1>Please, Wait..</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuth={isloggedIn}
                    />
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuth={isloggedIn}
                    />
                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    );
}
