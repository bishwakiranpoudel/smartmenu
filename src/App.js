import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import SiteRoutes from './Routes';

const App = () => {
    return (
        <>
            <BrowserRouter>

                <AuthContextProvider>
                    <SiteRoutes />
                </AuthContextProvider>

            </BrowserRouter>
        </>
    )
}

export default App