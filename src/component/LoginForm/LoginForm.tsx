import {Input} from '../Input/Input';
import {SubmitButton} from '../SubmitButton/SubmitButton';
import './LoginForm.css';
import {ErrorBox} from '../ErrorBox/ErrorBox';
import {useEffect, useState} from 'react';
import {loginService} from '../../axios/Auth/loginService';
import {useNavigate} from 'react-router-dom';

export const LoginForm = () => {
    const navigate = useNavigate();

    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [errorBoxMessage, setErrorBoxMessage] = useState('');
    const handleLogin = async () => {
        const _passwordValue = passwordValue;
        setPasswordValue("");

        const response = await loginService({
            login: loginValue,
            password: _passwordValue
        });

        if (!response) {
            setErrorBoxMessage('Something went wrong...');
            return;
        }

        if (response.status === 200) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('../admin');
        } else if (response.status === 401 || response.status === 400) {
            setErrorBoxMessage('Wrong login or password!');
        }
    }

    const handleEnterPress = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
            (async () => {
                await handleLogin();
            })();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress);

        return () => {
            window.removeEventListener('keydown', handleEnterPress);
        }
    })


    return <div className={'login-form-wrapper'}>
        <div className={'inputs-wrapper'}>
            <Input
                value={loginValue}
                setValue={setLoginValue}
                labelText={'Login'}
                id={'LoginView-input'}
                type={'text'}
                placeholder={'Login'}
            />
            <Input
                value={passwordValue}
                setValue={setPasswordValue}
                labelText={'Password'}
                id={'password-input'}
                type={'password'}
                placeholder={'Password'}
            />
        </div>
        <div className={'error-box-wrapper'}>
            <ErrorBox hidden={!errorBoxMessage} message={errorBoxMessage} />
        </div>
        <div className={'login-button-wrapper'}>
            <SubmitButton onClick={handleLogin} text={'Login'} />
        </div>
    </div>
}