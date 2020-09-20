import React from 'react';
import { signup } from '../api/apiCalls';
import Logo from '../Logo.png';
import Input from '../components/Input';

class UserSignupPage extends React.Component {

    state = {
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        if (name === "password" || name === "passwordRepeat") {
            if (name === "password" && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = "Password Mismatch";
            } else if (name === "passwordRepeat" && value !== this.state.password) {
                errors.passwordRepeat = "Password Mismatch"
            } else {
                errors.passwordRepeat = undefined
            }
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onClickSignup = async event => {
        event.preventDefault();

        const { userName, displayName, password } = this.state;

        const body = {
            userName,
            displayName,
            password
        }

        this.setState({ pendingApiCall: true })

        try {
            const response = await signup(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors })
            }
        }

        this.setState({ pendingApiCall: false })

    }

    render() {
        const { pendingApiCall, errors } = this.state;

        const { userName, displayName, password, passwordRepeat } = errors;

        return (
            <div className="container">
                <div className="row" style={{ margin: "12.5% 0 12.5% 0" }}>
                    <div className="col-md-6 col-12">
                        <img src={Logo} alt="logo" width="100%" height="100%" />
                    </div>
                    <div className="col-md-6 col-12">
                        <form>
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <Input name="userName" label="User Name :" error={userName} onChange={this.onChange} />
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <Input name="displayName" label="Display Name :" error={displayName} onChange={this.onChange} />
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <Input type="password" name="password" label="Password :" error={password} onChange={this.onChange} />
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <Input type="password" name="passwordRepeat" label="Password Repeat :" error={passwordRepeat} onChange={this.onChange} />
                                </div>
                            </div >
                            <div className="row">
                                <div className="col-sm-12 col-12">
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall || passwordRepeat !== undefined}>
                                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSignupPage;