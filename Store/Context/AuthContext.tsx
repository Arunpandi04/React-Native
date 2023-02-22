import { createContext, PropsWithChildren } from 'react';
import { authProp } from '../../Types/authContext';

const defaultValue = {
    auth: false,
    handleAuth: (value: boolean) => { }
}
export const AuthContext = createContext<authProp | null>(defaultValue);

interface AuthProviderType extends PropsWithChildren {
    value: boolean,
    handleAuth: (value: boolean) => void
}
export const AuthProvider = ({ children, value, handleAuth }: AuthProviderType) => {
    const data = {
        auth: value,
        handleAuth
    }
    return (<AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>)
}