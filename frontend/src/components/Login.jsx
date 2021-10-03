import SingForm from './SingForm';
import React, { useState } from 'react';

function Login(props) {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const formName = 'login';

    function handleChangeMail(e) {
        setMail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();
        props.onLogin(mail, password);
    }

    return (
        <div className='singСonteiner'>
            <SingForm title='Вход' onSubmit={onSubmit} submitButtonText='Войти' formName={formName}>
                <div className="form__inputs">
                    <input
                        value={mail || ''}
                        id="name"
                        required
                        minLength="2"
                        maxLength="40"
                        name="fild_name"
                        type="text"
                        placeholder="Email"
                        className="singForm__input profile-edit-form__input-fild-name"
                        onChange={handleChangeMail}
                    />
                    <span id="name-error" className="form__input-error"></span>
                    <input
                        value={password || ''}
                        id="about"
                        required
                        minLength="2"
                        maxLength="200"
                        name="fild_about"
                        type="password"
                        placeholder="Пароль"
                        className="singForm__input profile-edit-form__input-fild-about"
                        onChange={handleChangePassword}
                    />
                    <span id="about-error" className="form__input-error"></span>
                </div>
            </SingForm>
        </div >
    );
}

export default Login;

