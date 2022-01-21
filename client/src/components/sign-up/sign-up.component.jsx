import React from 'react'
import { connect } from 'react-redux';

import { signUpUserStart } from '../../redux/user/user-action';
// import { auth, createUserProfileDoc } from '../../firebase/firebase-utils'

import Input from '../input/input.component';
import Button from '../custom-button/custom-button.component';


import './sign-up.style.css'

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            passwordConfirm: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { signUpStart } = this.props;
        const { name, email, password, phone, passwordConfirm } = this.state;
        if (!name || !email || !password || !phone || !passwordConfirm) {
            alert("All fields are required.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("Password and confirm password not match");
            return;
        }

        signUpStart(this.state)
        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword(email, password);
        //     await createUserProfileDoc(user, { name });
        //     this.setState({
        //         name: '',
        //         email: '',
        //         password: '',
        //         passwordConfirm: ''
        //     })

        // } catch (ex) {
        //     console.error(ex);
        // }
        // createUserProfileDoc()
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { name, email, phone, password, passwordConfirm } = this.state;
        return (
            <div className='sign-up'>
                <h1 className='title'>I do not have a account</h1>
                <span>Sign up with your emmail and password</span>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        type='text'
                        name='name'
                        value={name}
                        onChange={this.handleChange}
                        label='Name'
                        required
                    />
                    <Input
                        type='tel'
                        name='phone'
                        value={phone}
                        label='phone'
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        type='email'
                        name='email'
                        value={email}
                        label='Email'
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        type='password'
                        name='password'
                        value={password}
                        label='Password'
                        onChange={this.handleChange}
                        required
                    />
                    <Input
                        type='password'
                        name='passwordConfirm'
                        value={passwordConfirm}
                        label='Confirm Password'
                        onChange={this.handleChange}
                        required
                    />
                    <Button type='submit'>Resister</Button>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    signUpStart: (user) => dispatch(signUpUserStart(user))
})

export default connect(null, mapDispatchToProps)(SignUp);
