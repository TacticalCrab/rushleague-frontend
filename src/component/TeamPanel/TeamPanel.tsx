import {ImageUploader} from '../ImageUploader/ImageUploader';
import React, {useEffect} from 'react';
import './TeamPanel.css';
import {Input} from '../Input/Input';
import {TeamScoreButtons} from '../TeamScoreButtons/TeamScoreButtons';
import {TeamSettingsSingleInterface} from '../../axios/Admin/AdminService.interface';
import {useImmer} from 'use-immer';

type TeamPanelProps = {
    id: string;
    header: string;
    align: 'left' | 'right';

    teamSettings: TeamSettingsSingleInterface
    applyTeamSettingsChange?: (teamSettings: TeamSettingsSingleInterface) => void;
}

const alignDict = {
    left: {
        body: 'start',
        flexOrder: ''
    },
    right: {
        body: 'end',
        flexOrder: '-reverse'
    }
}

export const TeamPanel: React.FC<TeamPanelProps> = ({
    id,
    header,
    align,
    teamSettings,
    applyTeamSettingsChange}
) => {

    const [teamSettingsState, setTeamSettings] = useImmer(teamSettings);

    if (applyTeamSettingsChange) {
        useEffect(() => {
            applyTeamSettingsChange(teamSettingsState);
        }, [teamSettingsState])
    }

    const alignment = alignDict[align];

    if (!teamSettings) {
        return <></>
    }

    return <div style={{ alignItems: alignment.body }} className={'team-panel'}>
        <div className={'team-panel-header'}>
            {header}
        </div>
        {/* @ts-ignore */}
        <div style={{ flexDirection: 'row' + alignment.flexOrder}} className={'team-panel-actions'}>

            <ImageUploader
                onChangeImage={(image) => {
                    setTeamSettings(teamSettings => { teamSettings.team_image = image })
                }}
                currentImageURL={teamSettings.team_image || '../../assets/ex_teamlogo.svg'} />
            <div className={'team-panel-inner'}>
                <div>
                    <label className={'team-panel-label'} htmlFor={id}>
                        Team name
                    </label>
                    <Input
                        value={teamSettings.team_name}
                        setValue={(teamName) =>
                            setTeamSettings(teamSettings => { teamSettings.team_name = teamName })
                        }
                        inputStyle={{ marginTop: '12px' }}
                        id={id}
                        type={'text'}/>
                </div>
                <div className={'map-scores-container'}>
                    <label className={'team-panel-label'} htmlFor={id}>
                        Current map score
                    </label>
                    <TeamScoreButtons
                        onScoreChange={(score) =>
                            setTeamSettings(teamSettings => {teamSettings.team_score = score})
                        }
                        currentScore={teamSettings.team_score}
                        maxScore={5} />
                </div>
            </div>
        </div>
    </div>
}

