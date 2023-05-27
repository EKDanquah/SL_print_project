import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import { MainRoutes, UsersRoutes } from './MainRoutes';
import { useContext } from 'react';
import { AuthContext } from '../context/auth/context';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const authContext = useContext(AuthContext);

    return useRoutes([authContext.role?(authContext.role !== 'ADMIN' ? MainRoutes : UsersRoutes):{}, LoginRoutes]);
}
