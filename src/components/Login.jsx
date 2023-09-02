import React, { useEffect, useState } from "react";
import MyInput from "./UI/MyInput";
import MyBtn from "./UI/MyBtn";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getError, getIsAuth, getRespStatus, loginAsync } from "../store/userSlice";

const Login = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const {errors, handleSubmit} = useForm(formValues, onLogin);
    const loginError = useSelector(getError);
    const dispatch = useDispatch(); 
    const isAuth = useSelector(getIsAuth);

    function onLogin() {
        dispatch(loginAsync(formValues));
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/chat');
        }
    }, [isAuth]);

    return (
        <>
            <div className="auth__header">Авторизация</div>
            <form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__form_block">
                    <MyInput
                        type="text"
                        value={formValues.email}
                        onChange={(e) =>
                            setFormValues({ ...formValues, email: e.target.value })
                        }
                        placeholder="почта"
                    />
                    {errors.email && <div className="form_error">{errors.email}</div>}
                </div>
                <div className="auth__form_block">
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
                    {errors.password && <div className="form_error">{errors.password}</div>}
                </div>

                {loginError && <div className="form_error">неправильный логин или пароль</div>}
                <MyBtn type="submit">Войти</MyBtn>
                <Link to="/auth/reg" className="auth__change_btn">Создать аккаунт</Link>
            </form>
        </>
    );
};

export default Login;
