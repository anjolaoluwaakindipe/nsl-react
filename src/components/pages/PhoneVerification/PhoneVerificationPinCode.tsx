import React from "react";
import { useRef, useState, useEffect } from "react";

type PhoneVerificaitonPinCodeProps = {
    onChange: (...event: any[]) => void;
    value: string[];
};

function PhoneVerificationPinCode({
    value,
    onChange,
}: PhoneVerificaitonPinCodeProps) {
    const [pin, setPin] = useState<string[]>(["", "", "", ""]);

    const preventLetters = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.keyCode === 8) {
            if (index === 4) {
                e.preventDefault();
                setFourthDigit("");
                thirdDigitRef.current?.focus();
                return
            }
            if (index === 3) {
                e.preventDefault();
                setThirdDigit("");
                secondDigitRef.current?.focus();
                return
            }
            if (index === 2) {
                e.preventDefault();
                setSecondDigit("");
                firstDigitRef.current?.focus();
                return 
            }
            if (index === 1) {
                e.preventDefault();
                setFirstDigit("");
                return
            }
            
        }
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

    useEffect(() => {
        onChange(pin);
    }, [pin, onChange]);

    useEffect(() => {
        if (firstDigit || firstDigit === "") {
            setPin((prevpin: string[]) => {
                prevpin[0] = firstDigit;
                return [...prevpin];
            });
        }
    }, [firstDigit]);

    useEffect(() => {
        if (secondDigit || secondDigit === "") {
            setPin((prevpin: string[]) => {
               
                prevpin[1] = secondDigit;
                return [...prevpin];
            });
        }
    }, [secondDigit]);
    useEffect(() => {
        if (thirdDigit || thirdDigit === "") {
            setPin((prevpin: string[]) => {
                
                prevpin[2] = thirdDigit;
                return [...prevpin];
            });
        }
    }, [thirdDigit]);
    useEffect(() => {
        if (fourthDigit || fourthDigit === "") {
            setPin((prevpin: string[]) => {
                prevpin[3] = fourthDigit;
                return [...prevpin];
            });
        }
    }, [fourthDigit]);

    return (
        <div
            className="flex space-x-5"
        >
            <input
                type="text"
                className="w-8 md:w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={firstDigit}
                onChange={(e) => {
                    setFirstDigit(e.target.value.replace(firstDigit, ""));
                    secondDigitRef.current?.focus();
                }}
                onKeyDown={(e) => preventLetters(e, 1)}
                ref={firstDigitRef}
            />
            <input
                type="text"
                className="w-8 md:w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={secondDigit}
                onChange={(e) => {
                    setSecondDigit(e.target.value.replace(secondDigit, ""));
                    thirdDigitRef.current?.focus();
                }}
                onKeyDown={(e) => preventLetters(e, 2)}
                ref={secondDigitRef}
            />
            <input
                type="text"
                className="w-8 md:w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={thirdDigit}
                onChange={(e) => {
                    setThirdDigit(e.target.value.replace(thirdDigit, ""));
                    fourthDigitRef.current?.focus();
                }}
                onKeyDown={(e) => preventLetters(e, 3)}
                ref={thirdDigitRef}
            />
            <input
                type="text"
                className="w-8 md:w-16 h-16 border-b-2 border-primaryColor text-darkTextColor   text-center "
                placeholder="*"
                value={fourthDigit}
                onKeyDown={(e) => preventLetters(e, 4)}
                onChange={(e) => {
                    setFourthDigit(e.target.value.replace(fourthDigit, ""));
                    fourthDigitRef.current?.blur();
                }}
                ref={fourthDigitRef}
            />
        </div>
    );
}

export default PhoneVerificationPinCode;
