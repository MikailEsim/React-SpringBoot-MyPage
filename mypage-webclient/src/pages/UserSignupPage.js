import React from 'react';
import { signup } from '../api/apiCalls';

class UserSignupPage extends React.Component {

    state = {
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    }

    onChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
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
        } catch (error) { }

        this.setState({ pendingApiCall: false })

    }

    render() {
        const { pendingApiCall } = this.state;

        return (
            <div className="container">
                <form style={{ margin: "12.5% 0 0 0" }}>
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center">Sign Up</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="form-group">
                                <label>User Name :</label>
                                <input className="form-control" name="userName" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8 offset-2">
                            <div className="form-group">
                                <label>Display Name :</label>
                                <input className="form-control" name="displayName" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-2">
                            <div className="form-group">
                                <label>Password :</label>
                                <input className="form-control" name="password" type="password" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label>Password Repeat :</label>
                                <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall}>
                                    {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;