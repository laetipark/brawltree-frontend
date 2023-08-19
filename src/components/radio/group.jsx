import {useContext, useRef} from "react";

import RadioContext from "../../context/radio";
import useWindowClick from "../../hooks/use_window_click";

import "../../css/component.css";

const RadioGroup = ({
                        children,
                        disabled: groupDisabled,
                        checkedValue,
                        context,
                        contextColumn,
                        onChange
                    }) => {
    const dropDownRef = useRef();
    const [checked, setChecked] = useWindowClick(dropDownRef, false);
    const content = useContext(context)[`${contextColumn}`];

    const isDisabled = (disabled) => disabled || groupDisabled;
    const isChecked = (value) => {
        return checkedValue === value;
    };
    const toggleValue = ({value}) => {
        checkedValue = value;
        onChange(value);
        setChecked(!checked)
    };

    console.log(children.props.children)

    return (
        <div className={"radio-box"}
             ref={dropDownRef}>
            <button className={"radio-box__button font-bold"}
                    onClick={() => {
                        setChecked(!checked)
                    }}>{children.props.children.find(item => item.key === String(content))?.props.children.props.children}</button>
            <div className={"radio-box__list"}
                 style={{display: checked ? "block" : "none"}}>
                <RadioContext.Provider value={{isDisabled, isChecked, toggleValue}}>
                    {children}
                </RadioContext.Provider>
            </div>
        </div>
    );
};

export default RadioGroup;