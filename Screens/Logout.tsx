import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '../Store/Context/AuthContext';
import { useAppDispatch } from '../Store/hooks';
import { logout } from '../Store/Reducer/auth';
import { authProp } from '../Types/authContext';

const Logout = () => {
    const { handleAuth } = React.useContext(AuthContext) as authProp;
    const dispatch = useAppDispatch();
    useEffect(() => {
        handleAuth(false);
        dispatch(logout())
    }, [])

    return <ActivityIndicator />;
};

export default Logout;