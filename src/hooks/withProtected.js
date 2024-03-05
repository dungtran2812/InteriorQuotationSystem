import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/currenUserSlice';
export function ProtectedAdminRoute({
    children
}) {
    const authenticated = useSelector((store) => store.currentUser.authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currenUser = useSelector((store) => store?.currentUser?.user);

    if(currenUser?.role !== "ROLE_ADMIN"){
        navigate("/login")
    }

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch(login());
            } else {
                console.log('You need to login first');
                navigate('/login');
            }
        }
        init();
    }, []);


    return authenticated ? <div>{children}</div> : 
     <div className='w-screen h-screen flex items-center justify-center'>
        Loading...
    </div>;
}

export function ProtectedStaffRoute({
    children
}) {
    const authenticated = useSelector((store) => store.currentUser.authenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currenUser = useSelector((store) => store?.currentUser?.user);

    if(currenUser?.role !== "ROLE_STAFF"){
        navigate("/login")
    }

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch(login());
            } else {
                console.log('You need to login first');
                navigate('/login');
            }
        }
        init();
    }, []);

    return authenticated ? <div>{children}</div> : 
     <div className='w-screen h-screen flex items-center justify-center'>
        Loading...
    </div>;
}