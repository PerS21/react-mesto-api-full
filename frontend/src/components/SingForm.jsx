function SingForm(props) {
    const formName = props.formName;


    return (
        <form name={`${formName}-form`} className={`singForm ${formName}-form`} onSubmit={props.onSubmit}>
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button
                type="submit"
                className={`button singForm__button-save  ${formName}-form__button-save`}
            >
                {props.submitButtonText}
            </button>
        </form>
    )
}

export default SingForm;
