import React from 'react';
import LoginForm from './loginForm.component';

function LoginIndex(props) {

    const handleUsername = (username) => {
        props.loginHanddle(username)
    }

    return (
        <div>
            <div className="container vh-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-6 login-card">
                        <div className="mb-5">
                            <h1 className="text-center" style={{color:'#7289da'}}>Welcome to <b>my_irc</b></h1>
                            <p className="text-right text-muted" style={{paddingRight:'80px'}}><small>By NGUYEN Hao-Nhien.</small></p>
                        </div>
                        <LoginForm handleUsername={handleUsername} error={props.error} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginIndex;