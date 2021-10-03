function InfoTooltip(props) {
    return (
        props.isOpen &&
        <div className="popup infoTooltipPopup">
            <div className="popup__container popup__container_content-infoTooltip">
                <img src={props.imgLink} alt='dd' />
                <p className='infoTooltipPopup__text'>{props.text}</p>
                <button
                    type="button"
                    className={`popup__close-button button ${props.name}-form__close-button`}
                    onClick={props.onClose}
                ></button>
            </div>

        </div>
    );
}

export default InfoTooltip;
