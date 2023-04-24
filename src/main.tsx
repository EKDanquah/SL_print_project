import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// scroll bar
import 'simplebar/src/simplebar.css';
// font-import
// import 'style.css';

// apex-chart
import './assets/third-party/apex-chart.css';

// project import
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppBarContextProvider } from './store/state';
import { AuthContextProvider } from './context/auth/index.authContext';
import { NotificationContextProvider } from './context/notification/index.notificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement); // createRoot(container!) if you use TypeScript
root.render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter
                basename='/'
            >
                <AuthContextProvider>
                    <NotificationContextProvider>
                        <AppBarContextProvider>
                            <App />
                        </AppBarContextProvider>
                    </NotificationContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
