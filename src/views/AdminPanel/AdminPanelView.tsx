import './AdminPanelView.css';
import {Navbar} from '../../component/Navbar/Navbar';
import {TeamPanel} from '../../component/TeamPanel/TeamPanel';
import {SubmitButton} from '../../component/SubmitButton/SubmitButton';
import {useEffect, useState} from 'react';
import {getHeroSpecs, getTeamSettings, setTeamSettings as setAPITeamSettings} from '../../axios/Admin/AdminService';
import {HeroBans, HeroSpecs, TeamSettings} from '../../axios/Admin/AdminService.interface';
import {useImmer} from 'use-immer';
import {HeroSelector} from '../../component/HeroSelector/HeroSelector';

export const AdminPanelView = () => {
    const [teamSettings, setTeamSettings] = useImmer<TeamSettings | undefined>(undefined);
    const [heroSpecs, setHeroSpecs] = useState<HeroSpecs | undefined>(undefined);
    const [heroBans, setHeroBans] = useImmer<HeroBans>({team_1: 'default', team_2: 'default'});

    useEffect(() => {
        getTeamSettings().then((data) => {
            setTeamSettings(data);
        });

        getHeroSpecs().then((data) => {
            const formatData: HeroSpecs = {
                default: {
                    name: 'Default',
                    icon: API_URL + 'assets/hero/' + data.default.icon,
                    splash: API_URL + 'assets/hero/' + data.default.splash
                }
            };

            Object.entries(data).forEach(([name, specs]) => {

                formatData[name] = {
                    name: specs.name,
                    icon: specs.icon ? API_URL + 'assets/hero/' + specs.icon : null,
                    splash: specs.splash ? API_URL + 'assets/hero/' + specs.splash : null
                }
            });

            setHeroSpecs(formatData);
        });
    }, [])
    const handleOnClick = async () => {
        if (teamSettings) {
            await setAPITeamSettings(teamSettings);
        }
    }

    return<>
        <Navbar desc={'Admin Panel'}/>

        {!teamSettings
            ? <div className={'loading-message'}>Loading...</div>
            : <>
                <div className={'team-panels'}>
                    <TeamPanel
                        teamSettings={!teamSettings!.swap ? teamSettings.team_1 : teamSettings.team_2}
                        applyTeamSettingsChange={(updatedTeamSettings) =>
                            setTeamSettings(teamSettings => {
                                (!teamSettings!.swap)?
                                    teamSettings!.team_1 = updatedTeamSettings
                                    : teamSettings!.team_2 = updatedTeamSettings
                            })
                        }
                        id={'team-panel-left'}
                        header={'Team 1'}
                        align={'left'} />
                    <TeamPanel
                        teamSettings={!teamSettings!.swap ? teamSettings.team_2 : teamSettings.team_1}
                        applyTeamSettingsChange={(updatedTeamSettings) =>
                            setTeamSettings(teamSettings => {
                                (!teamSettings!.swap)?
                                    teamSettings!.team_2 = updatedTeamSettings
                                    : teamSettings!.team_1 = updatedTeamSettings
                            })
                        }
                        id={'team-panel-right'}
                        header={'Team 2'}
                        align={'right'} />
                </div>
                <div className={'team-panel-lower-container'}>
                    <div> {heroSpecs ?
                        <div className={'hero-selector-wrapper'}>
                            <div className={'hero-bans-label'}> Hero ban </div>
                            <HeroSelector
                                currentHero={heroBans.team_1}
                                onChange={(heroName) => {
                                setHeroBans(heroBans => {
                                   heroBans.team_1 = heroName;
                                });
                            }} heroSpecs={heroSpecs}/>
                        </div>

                        : <></> } </div>
                    <div className={'middle-actions-container'}>
                        <div onClick={() => {
                                setTeamSettings(teamSettings => {
                                    teamSettings!.swap = !teamSettings!.swap;
                                });

                                setHeroBans({
                                    team_1: heroBans.team_2,
                                    team_2: heroBans.team_1
                                });
                            }}
                             className={'swap-container'}>
                            <img alt={'swap icon'} src={'../../assets/swap-icon.svg'} />
                            <div className={'swap-teams-text'}>
                                Swap teams
                            </div>
                        </div>
                        <div className={'confirm-button-container'}>
                            <SubmitButton onClick={handleOnClick} text={'Confirm changes'}/>
                        </div>
                    </div>
                    <div> {heroSpecs ?
                        <div className={'hero-selector-wrapper'}>
                            <div className={'hero-bans-label'}> Hero ban </div>
                            <HeroSelector
                                currentHero={heroBans.team_2}
                                onChange={(heroName) => {
                                    setHeroBans(heroBans => {
                                        heroBans.team_2 = heroName;
                                    });
                                }} heroSpecs={heroSpecs}/>
                        </div>

                        : <></> } </div>
                </div>
            </>
        }
    </>
}