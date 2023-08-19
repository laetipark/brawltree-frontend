import React, {useContext} from "react";
import CheckboxContext from "../../context/checkbox";

const CheckboxGroupItem = ({children, disabled, value, checked, onChange}) => {
    const context = useContext(CheckboxContext);

    if (!context) {
        return (
            <label>
                <input
                    type="checkbox"
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
                type="checkbox"
                disabled={isDisabled(disabled)}
                checked={isChecked(value)}
                onChange={({target: {checked}}) => toggleValue({checked, value})}
            />
            {children}
        </label>
    );
};

export default CheckboxGroupItem;

