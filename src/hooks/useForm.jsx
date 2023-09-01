import { useState } from "react";

export default function useForm(formValues, callback) {
    const [errors, setErrors] = useState({});
    const regExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function validate(name, value, newErrors) {
        switch (name) {
            case "email":
                if(value.length === 0) {
                    newErrors[name] = "Email не может быть пустым";
                } else if(!regExp.test(value)) {
                    newErrors[name] = "Неверный формат email";
                }
                break;
            case "password":
                if(value.length === 0) {
                    newErrors[name] = "Пароль не может быть пустым";
                } else if(formValues.hasOwnProperty('password2') && (formValues.password2 !== value)) {
                    newErrors[name] = "Пароли не совпадают";
                } else if(formValues.hasOwnProperty('password2') && !isPassStrong(value)) {
                    newErrors[name] = "Пароль должен содержать заглавные буквы, цифры и символы (a-z, A-Z, 0-9), содержать минимум 8 символов и не содержать пробелов";
                }
                break;
            default:
                break
        }
    }

    function isPassStrong(value) {
        let passStr = 0;

        if(/(?=.*[a-z])/.test(value)) passStr++;
        if(/(?=.*[A-Z])/.test(value)) passStr++;
        if(/\d/.test(value)) passStr++;
        if(/(?=.*[!@#$%^&*.,';:])/.test(value)) passStr++;
        if(value.length >= 8) passStr++;
        if(/\s/.test(value)) passStr--;

        console.log(passStr);

        return passStr >= 5;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};   
        console.log('1');

        for(let key in formValues) {
            const value = formValues[key];
            validate(key, value, newErrors);
        }

        if(Object.keys(newErrors).length === 0 && Object.keys(formValues).length > 0) {
            callback();
        }
        console.log(newErrors);
        setErrors(newErrors);
    }
    return ({errors, handleSubmit});
}