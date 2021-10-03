function ImagePopup(props) {
  return (
    (props.card !== null) && 
    <div className="popup imgPopup">
      <div className="popup__container popup__container_content-img">
        <img className="imgPopup__img" src={props.card.link} alt={props.card.name} />
        <p className="imgPopup__text">{props.card.name}</p>
        <button
          type="button"
          className="popup__close-button button imgPopup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
