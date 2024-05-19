import React, { useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import "./ValidatedInput.scss";

interface ValidationResult {
    isValid: boolean;
    errorMessage: string;
}

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onIconClick?: () => void;
    validationFunction: (value: string, compareTo?: string) => ValidationResult;
    placeholder?: string;
    setIsProblem?: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    compareTo?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
                                                           onIconClick,
                                                           validationFunction,
                                                           placeholder,
                                                           setIsProblem,
                                                           compareTo,
                                                           ...props
                                                       }) => {
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (validationFunction) {
            const validationResult = compareTo
                ? validationFunction(event.target.value, compareTo)
                : validationFunction(event.target.value);
            setIsValid(validationResult.isValid);
            setErrorMessage(validationResult.errorMessage);
        }
        if (props.onChange) props.onChange(event);
    };

    useEffect(() => {
        if (compareTo) {
            const validationResult = validationFunction(props.value as string, compareTo);
            setIsValid(validationResult.isValid);
            setErrorMessage(validationResult.errorMessage);
        }
        if (typeof setIsProblem === "function") {
            setIsProblem((prev) => ({
                ...prev,
                [props.name]: !isValid,
            }));
        }
    }, [isValid, compareTo, props.value, props.name, validationFunction, setIsProblem]);

    return (
        <div className="inputContainer">
            <div className="label__div">
                <input
                    className={`myInput classes.input__animation ${
                        !isValid ? "invalidInput" : ""
                    }`}
                    {...props}
                    onChange={handleChange}
                    required
                    onFocus={(e: FocusEvent<HTMLInputElement>) => {
                        e.target.setAttribute("autocomplete", "off");
                    }}
                    placeholder={placeholder}
                />
            </div>
            {!isValid && <div className="errorText">{errorMessage}</div>}
        </div>
    );
};

export default ValidatedInput;
