import {axiosInstance} from '../AxiosInstance';
import {HeroSpecs, TeamSettings} from './AdminService.interface';

export const getTeamSettings = async (): Promise<TeamSettings> => {
    return new Promise(async (resolve) => {
        const response = await axiosInstance.get('/api/match/teams_settings');
        resolve(response.data);
    });
}

export const getHeroSpecs = async (): Promise<HeroSpecs> => {
    return new Promise(async (resolve) => {
        const response = await axiosInstance.get('/api/hero/herospecs');
        resolve(response.data);
    });
}


export const setTeamSettings = async (teamSettings: TeamSettings) => {
    const response = await axiosInstance.patch('/api/match/teams_settings', teamSettings)
    console.log(response);
}

