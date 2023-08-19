import React from "react";
import "./datepicker.scss";
interface DatePickerProps {
    id?: string | undefined;
    onChange?: (e: {
        target: HTMLInputElement;
    }) => void | undefined;
    value?: string;
    placeholder?: string;
    name?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    otherAttributes?: object;
}
declare const DatePicker: React.FC<DatePickerProps>;
export default DatePicker;
