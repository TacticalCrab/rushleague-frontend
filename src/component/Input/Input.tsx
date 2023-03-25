import './Input.css';
import React, {CSSProperties} from 'react';

type InputProps = {
    id: string;
    type: string;
    placeholder?: string;
    labelText?: string;
    value?: string;
    setValue?: (value: string) => void;
    inputStyle?: CSSProperties;
}

export const Input: React.FC<InputProps> = (
    {
        id,
        type,
        placeholder= "",
        labelText,
        value = "",
        setValue = () => {},
        inputStyle
    }
) => {
    return <div className={'input-wrapper'}>
        {labelText &&
            <label htmlFor={id} className={'input-label'}>
                {labelText}
            </label>
        }
        <input style={inputStyle}
               value={value}
               id={id}
               type={type}
               placeholder={placeholder}
               className={'input-field'} onChange={(e) => setValue(e.target.value)}/>
    </div>
}