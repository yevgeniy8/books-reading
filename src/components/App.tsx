import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Layout = lazy(() => import('./Layout/Layout'));

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
};

export default App;
