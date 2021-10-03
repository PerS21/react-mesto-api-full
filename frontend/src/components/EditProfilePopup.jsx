import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        props.onUpdateUser(name,description);
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='profile-edit' isOpen={props.isOpen} onClose={props.onClose} submitButtonText='Сохранить' onSubmit={onSubmit}>
            <div className="form__inputs">
                <input
                    value={name || ''} 
                    id="name"
                    required
                    minLength="2"
                    maxLength="40"
                    name="fild_name"
                    type="text"
                    placeholder="Название"
                    className="form__input profile-edit-form__input-fild-name"
                    onChange={handleChangeName}
                />
                <span id="name-error" className="form__input-error"></span>
                <input
                    value={description || ''} 
                    id="about"
                    required
                    minLength="2"
                    maxLength="200"
                    name="fild_about"
                    type="text"
                    placeholder="Проффесия"
                    className="form__input profile-edit-form__input-fild-about"
                    onChange={handleChangeDescription}
                />
                <span id="about-error" className="form__input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
