import { useState } from 'react';
import PopupWithForm from "./PopupWithForm.jsx";

function AddPlacePopup(props) {

    const [fildPlace, setFildPlace] = useState('');
    const [fildImg, setFildImg] = useState('');

    function handleChangeFildPlace(e) {
        setFildPlace(e.target.value);
    }

    function handleChangeFildImg(e) {
        setFildImg(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();
        props.onAddCard(fildPlace, fildImg);
    }
    
    return (
        <PopupWithForm title='Новое место' name='add-place' isOpen={props.isOpen} onClose={props.onClose} submitButtonText='Сохранить' onSubmit={onSubmit}>
        <div className="form__inputs">
          <input
            value={fildPlace}
            id="place"
            required
            minLength="2"
            maxLength="30"
            name="fild_place"
            type="text"
            placeholder="Название"
            className="form__input add-place-form__input-fild-text"
            onChange={handleChangeFildPlace}
          />
          <span id="place-error" className="form__input-error"></span>
          <input
            value={fildImg}
            id="img"
            required
            name="fild_img"
            type="url"
            placeholder="Ссылка на картинку"
            className="form__input add-place-form__input-fild-link"
            onChange={handleChangeFildImg}
          />
          <span id="img-error" className="form__input-error"></span>
        </div>
      </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;