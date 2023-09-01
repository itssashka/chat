import React, { useEffect, useState } from "react";
import MyInput from "./UI/MyInput";
import MyBtn from "./UI/MyBtn";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../hooks/useForm";
import { getError, getIsAuth, loginAsync, regAsync } from "../store/userSlice";

const Reg = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: "", password: "", password2: "" });
    const {errors, handleSubmit} = useForm(formValues, onReg);
    const regError = useSelector(getError);
    const dispatch = useDispatch(); 
    const isAuth = useSelector(getIsAuth);

    function onReg() {
        dispatch(regAsync(formValues));
    }

    useEffect(() => {
        
        console.log(isAuth)
        if (isAuth) {
            navigate('/chat')
        }
    }, [isAuth]);

    return (
        <>
            <div className="auth__header">Регистрация</div>
            <form className="auth__form" onSubmit={handleSubmit}>
                <MyInput
                    type="text"
                    value={formValues.email}
                    onChange={(e) =>
                        setFormValues({ ...formValues, email: e.target.value })
                    }
                    placeholder="почта"
                />
                {errors.email && <div className="form_error">{errors.email}</div>}
                <MyInput
                    type="password"
                    value={formValues.password}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            password: e.target.value,
                        })
                    }
                    placeholder="пароль"
                />
                <MyInput
                    type="password"
                    value={formValues.password2}
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            password2: e.target.value,
                        })
                    }
                    placeholder="повторите пароль"
                />
                {errors.password && <div className="form_error">{errors.password}</div>}
                <MyBtn type="submit">Зарегистрироваться</MyBtn>
                <Link to='/auth/login' className="auth__change_btn">Уже есть аккаунт</Link>
            </form>
        </>
    );
};

export default Reg;
