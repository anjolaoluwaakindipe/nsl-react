import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
    DefaultInputComponentProps,
    Props,
    State,
} from "react-phone-number-input";
import { useState, useRef, useEffect } from "react";

type PhoneFieldProps = {
    onChange?: (...event: [any]) => void;
    value?: string | undefined;
    phoneElementClassName: string;
    style: object | undefined;
    placeholder?: string;
    readOnly?:boolean
};
function PhoneField({
    onChange,
    value,
    phoneElementClassName,
    style,
    placeholder,
    readOnly
}: PhoneFieldProps) {
    const [isPlaceholderVisilble, setPlaceholderVisibiltiy] = useState(true);
    const phoneRef: React.LegacyRef<
        React.Component<
            Props<DefaultInputComponentProps>,
            State<Props<DefaultInputComponentProps>>,
            any
        >
    > = useRef(null);

    useEffect(() => {
        if (value) {
            setPlaceholderVisibiltiy(false);
        } else {
            setPlaceholderVisibiltiy(true);
        }
    }, [value]);

    return (
        <div className="relative">
            <div
                className={`absolute bottom-[15px] left-14  ${
                    isPlaceholderVisilble
                        ? ""
                        : "bottom-12 origin-left scale-75 "
                }text-gray-400 pointer-events-none transition-all delay-200 ease-in-out`}
            >
                {placeholder}
            </div>
            <PhoneInput
                className={phoneElementClassName + "bg-transparent"}
                onChange={(value) => {
                    onChange && onChange(value);
                    if (value) {
                        setPlaceholderVisibiltiy(false);
                    } else {
                        setPlaceholderVisibiltiy(true);
                    }
                }}
                readOnly={readOnly}
                ref={phoneRef}
                value={value}
                style={style}
            />
        </div>
    );
}

export default PhoneField;
