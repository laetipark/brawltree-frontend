import {useContext} from "react";

import RadioContext from "../../context/radio";

const RadioGroupItem = ({children, disabled, value, checked, onChange}) => {
    const context = useContext(RadioContext);

    if (!context) {
        return (
            <label>
                <input
                    type="radio"
                    disabled={disabled}
                    checked={checked}
                    onChange={({target: {checked}}) => onChange(checked)}
                />
                {children}
            </label>
        );
    }

    const {isDisabled, isChecked, toggleValue} = context;

    return (
        <label>
            <input
                type="radio"
                disabled={isDisabled(disabled)}
                checked={isChecked(value)}
                onChange={() => toggleValue({value})}
            />
            {children}
        </label>
    );
};

export default RadioGroupItem;

