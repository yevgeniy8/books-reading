import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Register = lazy(() => import('../pages/Register'));
const Login = lazy(() => import('../pages/Login'));

const App: React.FC = () => {
    return (
        <Routes>
            <Route index element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
