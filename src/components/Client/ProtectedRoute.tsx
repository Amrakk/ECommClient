import { RootState } from '@/stores/client/store';
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CustomerPaths } from '../Route/CustomerRoute';


import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const user = useSelector((state: RootState) => state.user);
    return user ? children : <Navigate to={CustomerPaths.auth.Login} />;
};

export default ProtectedRoute;