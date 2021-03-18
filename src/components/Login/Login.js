import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    var provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);

            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleFacebookSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser);
                history.replace(from);
                var accessToken = credential.accessToken;
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }
    return (
        <>
            <div className="login-box">
                <Button onClick={handleGoogleSignIn} variant="contained" color="primary">SignIn Google</Button>
                <br /> <br />
                <Button onClick={handleFacebookSignIn} variant="contained" color="primary">SignIn Facebook</Button>
            </div>
        </>
    );
};

export default Login;