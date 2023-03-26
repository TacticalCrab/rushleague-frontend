export interface TeamSettingsSingleInterface {
    team_name: string;
    team_score: number;
    team_image: string;
}

export interface TeamSettings {
    team_1: TeamSettingsSingleInterface,
    team_2: TeamSettingsSingleInterface,
    swap: boolean;
}


export interface HeroSpecs {
    default: {
        name: string;
        icon: string;
        splash: string;
    }

    [name: string]: {
        name: string;
        icon: string | null,
        splash: string | null
    }
}

export interface HeroBans {
    team_1: string,
    team_2: string
}