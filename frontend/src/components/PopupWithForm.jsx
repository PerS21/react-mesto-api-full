function PopupWithForm(props) {
  return (
    props.isOpen && (
    <div className={`popup ${props.name}-popup`}>
      <div className="popup__container popup__container_content-form">
      <form name={`${props.name}-form`} className={`form ${props.name}-form`} onSubmit={props.onSubmit}>
        <h2 className="form__title">{props.title}</h2>
        {props.children}
        <button
          type="submit"
          className={`form__button-save ${props.name}-form__button-save`}
          >
          {props.submitButtonText}
          </button>
        <button
          type="button"
          className={`popup__close-button button ${props.name}-form__close-button`}
          onClick={props.onClose}
        ></button>
      </form>
      </div>
    </div>)
  );
}

export default PopupWithForm;
