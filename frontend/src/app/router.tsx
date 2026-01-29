import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { DashboardPage } from '../features/registros/pages/DashboardPage';
import { FormPage } from '../features/registros/pages/FormPage';
import { QrPagesPage } from '../pages/QrPagesPage';
import { SpotifyPage } from '../pages/public/spotify/SpotifyPage';
import { InstagramPage } from '../pages/public/instagram/InstagramPage';
import { PrizePage } from '../pages/public/premio/PrizePage';
import { FacebookPage } from '../pages/public/facebook/FacebookPage';

import { MainLayout } from '../shared/ui/MainLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/landing', // Hidden optional landing
        element: <LandingPage />,
    },
    {
        path: '/dashboard',
        element: (
            <MainLayout>
                <DashboardPage />
            </MainLayout>
        ),
    },
    {
        path: '/qr',
        element: (
            <MainLayout>
                <QrPagesPage />
            </MainLayout>
        ),
    },
    // Public Pages (The "Trap")
    {
        path: '/spotify',
        element: <SpotifyPage />,
    },
    {
        path: '/instagram',
        element: <InstagramPage />,
    },
    {
        path: '/premio',
        element: <PrizePage />,
    },
    {
        path: '/facebook',
        element: <FacebookPage />,
    },
    // Generic fallback
    {
        path: '/form/:pagina',
        element: <FormPage />,
    },
]);
