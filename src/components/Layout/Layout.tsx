import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from './Layout.styled';

const Layout: React.FC = () => {
    return (
        <Container>
            <header></header>

            <main>
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </main>
        </Container>
    );
};

export default Layout;
