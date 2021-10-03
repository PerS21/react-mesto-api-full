import React from 'react';
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function onSubmit(e){
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm title='Обновить аватар' name='profile-img-edit' isOpen={props.isOpen} onClose={props.onClose} submitButtonText='Сохранить' onSubmit={onSubmit}>
            <div className="form__inputs">
                <input
                    ref={avatarRef}
                    id="avatar"
                    required
                    name="fild_img"
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="form__input profile-img-edit-popup__input-fild-link"
                />
                <span id="avatar-error" className="form__input-error"></span>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;