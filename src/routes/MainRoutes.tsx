import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';

// render - dashboard

// render - sample page
const SamplePage = Loadable(lazy(() => import('../pages/extra-pages/SamplePage')));
const InstitutionDetails = Loadable(lazy(() => import('../pages/institution-details')));
const InstitutionDepartmentDetails = Loadable(lazy(() => import('../pages/institution-department-details')));

// render - utilities
const TablesPage = Loadable(lazy(() => import('../pages/components-overview/Tables')));
const Typography = Loadable(lazy(() => import('../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('../pages/components-overview/AntIcons')));

//  active
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));
const SettingPage = Loadable(lazy(() => import('../pages/setting')));
const PrintJobsPage = Loadable(lazy(() => import('../pages/print_jobs')));
const NotificationPage = Loadable(lazy(() => import('../pages/notification')));
const AgentPage = Loadable(lazy(() => import('../pages/agent')));
const ConsumersPage = Loadable(lazy(() => import('../pages/consumers')));
const CustomerInsightPage = Loadable(lazy(() => import('../pages/customerInsight')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'color',
            element: <Color />
        },

        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'tables',
            element: <TablesPage />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        },

        // ============ real routes

        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'setting',
            element: <SettingPage />
        },
        {
            path: 'pushNotification',
            element: <NotificationPage />
        },
        {
            path: 'agents',
            element: <AgentPage />
        },
        {
            path: 'consumers',
            element: <ConsumersPage />
        },
        {
            path: 'print-jobs',
            element: <PrintJobsPage />
        },
        {
            path: 'institutions',
            children: [
                {
                    path: '',
                    element: <CustomerInsightPage />
                },
                {
                    path: 'ministry', 
                    // element:,
                    children: [
                        {
                            path: '',
                            paramKey: 'id',
                            element:  <InstitutionDetails />
                        },
                        {
                            path: 'departments',
                            paramKey: ['id','insId'], 
                            element: <InstitutionDepartmentDetails/>
                        }
                    ]
                }
            ]
        }
    ]
};

const UsersRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/user',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'uploads',
            element: <SettingPage />
        },
        {
            path: 'pushNotification',
            element: <NotificationPage />
        },
        {
            path: 'agents',
            element: <AgentPage />
        },

        {
            path: 'consumers',
            element: <ConsumersPage />
        },
        {
            path: 'print-jobs',
            element: <PrintJobsPage />
        },
        // {
        //     path: 'institutions',
        //     element: <CustomerInsightPage />
        // }
    ]
};

export { MainRoutes, UsersRoutes };
