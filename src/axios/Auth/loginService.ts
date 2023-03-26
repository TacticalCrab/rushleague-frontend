import {axiosInstance} from '../AxiosInstance';
import {LoginParams} from './loginService.interface';

export const loginService = async (loginParams: LoginParams) => {
    return axiosInstance.post('/api/auth/login', {
        ...loginParams
    });
}