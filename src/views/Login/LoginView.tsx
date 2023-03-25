import './LoginView.css';
import {Navbar} from '../../component/Navbar/Navbar';
import {LoginForm} from '../../component/LoginForm/LoginForm';

const LoginView = () => {
    return <>
        <Navbar desc={'Admin Panel'}/>
        <div className={'title-text'}>
            Admin Panel Login
        </div>
        <div className={'from-container'}>
            <LoginForm />
        </div>
    </>
}

export default LoginView;
