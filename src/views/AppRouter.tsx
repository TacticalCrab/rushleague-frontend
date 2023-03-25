import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginView from './Login/LoginView';
import {AdminPanelView} from './AdminPanel/AdminPanelView';
import {RequireAuth} from '../component/RequireAuth/RequireAuth';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={'/login'}
                    element={<LoginView />}/>
                <Route
                    path={'admin'}
                    element={<RequireAuth><AdminPanelView /></RequireAuth>} />
            </Routes>
        </BrowserRouter>
    )
}