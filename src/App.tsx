// project import
import Routes from './routes';
// @ts-ignore
import ThemeCustomization from './themes';
import ScrollTop from './components/ScrollTop';
import { AuthContextProvider } from './context/auth/index.authContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <AuthContextProvider>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </AuthContextProvider>
    </ThemeCustomization>
);

export default App;
