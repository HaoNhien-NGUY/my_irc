import React, { useEffect } from 'react';
import LoginForm from './loginForm.component';

function LoginIndex(props) {

    const handleUsername = (username) => {
        props.loginHanddle(username)
    }

    // useEffect(() => {
    //     return () => {console.log('fuck unmount')};
    // });

    return (
        <div>
            <div className="container vh-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-6 login-card">
                        <h1 className="mb-5 text-center">Welcome to my_irc</h1>
                        <LoginForm handleUsername={handleUsername} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginIndex;