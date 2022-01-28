import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router';
import Error from '../../components/error/error-component'

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './auth.style.css'
const Auth = ({ isLogedIn, addNewMessagesStart, error }) => {
    const [page, setPage] = useState(true);

    return (
        <> {
            isLogedIn ? <Redirect to='/chats/' />
                : <>
                    <div className='container py-3'>
                        <div className='auth-page-btn-c'>
                            <div className='btn-group'>
                                <button className={`btn auth-btn auth-btn-l ${page ? 'auth-btn-active' : ''}`} onClick={() => setPage(!page)}>Login</button>
                                <button className={`btn auth-btn auth-btn-r ${!page ? 'auth-btn-active' : ''}`} onClick={() => setPage(!page)}>Register</button>
                            </div>
                            <div className='mt-3'>
                                <h2 className='display-4'>Welcome to PVBOX</h2>
                            </div>
                        </div>
                        <div className='pb-3'>
                            {page ?
                                <SignIn />
                                :
                                <SignUp />}
                        </div>
                    </div>
                    {error && <Error>{error?.message}</Error>}
                </>
        }
        </>
    )
}
const mapStateToProps = state => ({
    isLogedIn: !!state.user.currentUser,
    error: state.user.error
})

export default connect(mapStateToProps)(Auth);