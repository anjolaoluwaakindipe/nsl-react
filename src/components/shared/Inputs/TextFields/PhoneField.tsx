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
    readOnly?: boolean;
    errorMessage?: string | null;
};
function PhoneField({
    onChange,
    value,
    phoneElementClassName,
    style,
    placeholder,
    readOnly,
    errorMessage,
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

    const normalPlaceholderState = () => "";
    const floatingPlaceholderState = () =>
        " -translate-y-8  scale-75 ";

    return (
        <div className="w-full">
            <div className="border-0 border-b-2  border-underlineColor  ">
                <div className="relative floating-placeholder ">
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
                    <div
                        className={` absolute bottom-[15px] left-16 origin-left text-gray-400 ${
                            isPlaceholderVisilble
                                ? normalPlaceholderState()
                                : floatingPlaceholderState()
                        } pointer-events-none transition-all delay-200 ease-in-out`}
                    >
                        {placeholder}
                    </div>
                </div>
            </div>
            <p className="text-xs text-red-900 ">{errorMessage}</p>
        </div>
    );
}

export default PhoneField;

// {
//     (" ");
// }
// <div
//     className={`absolute bottom-[15px] left-14  ${
//         isPlaceholderVisilble ? "" : "bottom-12 origin-left scale-75 "
//     }text-gray-400 pointer-events-none transition-all delay-200 ease-in-out`}
// >
//     {placeholder}
// </div>;
