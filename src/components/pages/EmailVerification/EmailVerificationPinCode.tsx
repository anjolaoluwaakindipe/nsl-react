import React from "react";
import { useRef, useState, useEffect } from "react";

type EmailVerificaitonPinCodeProps = {
    onChange: (...event: any[]) => void;
    value: string;
};

function EmailVerificationPinCode({ value, onChange }: EmailVerificaitonPinCodeProps) {
    const [pin, setPin] = useState(value);

    const preventLetters: React.KeyboardEventHandler<HTMLInputElement> = (
        e
    ) => {
        if (!RegExp("[0-9]").test(e.key)) {
            e.preventDefault();
            return;
        }

        return e.key;
    };

    const firstDigitRef = useRef<HTMLInputElement>(null);
    const secondDigitRef = useRef<HTMLInputElement>(null);
    const thirdDigitRef = useRef<HTMLInputElement>(null);
    const fourthDigitRef = useRef<HTMLInputElement>(null);

    const [firstDigit, setFirstDigit] = useState("");
    const [secondDigit, setSecondDigit] = useState("");
    const [thirdDigit, setThirdDigit] = useState("");
    const [fourthDigit, setFourthDigit] = useState("");

    useEffect(()=>{
        onChange(pin)
    }, [pin, onChange])

    useEffect(() => {
        if (firstDigit) {
            setPin((prevpin: string) => {
                const prevpinChar = prevpin.split("");
                prevpinChar[0] = firstDigit;
                return prevpinChar.join("");
            });
        }
    }, [firstDigit]);

    useEffect(() => {
        if (secondDigit) {
            setPin((prevpin: string) => {
                const prevpinChar = prevpin.split("");
                prevpinChar[1] = secondDigit;
                return prevpinChar.join("");
            });
        }
    }, [secondDigit]);
    useEffect(() => {
        if (thirdDigit) {
            setPin((prevpin: string) => {
                const prevpinChar = prevpin.split("");
                prevpinChar[2] = thirdDigit;
                return prevpinChar.join("");
            });
        }
    }, [thirdDigit]);
    useEffect(() => {
        if (fourthDigit) {
            setPin((prevpin: string) => {
                const prevpinChar = prevpin.split("");
                prevpinChar[3] = fourthDigit;
                return prevpinChar.join("");
            });
        }
    }, [fourthDigit]);

    return (
        <div
            className="flex space-x-5"
            onChange={(e) => {
                onChange(e);
            }}
        >
            <input
                type="text"
                className="w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={firstDigit}
                onChange={(e) => {
                    setFirstDigit(e.target.value.replace(firstDigit, ""));
                    secondDigitRef.current?.focus();
                }}
                onKeyDown={preventLetters}
                ref={firstDigitRef}
            />
            <input
                type="text"
                className="w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={secondDigit}
                onChange={(e) => {
                    setSecondDigit(e.target.value.replace(secondDigit, ""));
                    thirdDigitRef.current?.focus();
                }}
                onKeyDown={preventLetters}
                ref={secondDigitRef}
            />
            <input
                type="text"
                className="w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={thirdDigit}
                onChange={(e) => {
                    setThirdDigit(e.target.value.replace(thirdDigit, ""));
                    fourthDigitRef.current?.focus();
                }}
                onKeyDown={preventLetters}
                ref={thirdDigitRef}
            />
            <input
                type="text"
                className="w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={fourthDigit}
                onKeyDown={preventLetters}
                onChange={(e) => {
                    setFourthDigit(e.target.value.replace(fourthDigit, ""));
                    fourthDigitRef.current?.blur();
                }}
                ref={fourthDigitRef}
            />
        </div>
    );
}

export default EmailVerificationPinCode;
