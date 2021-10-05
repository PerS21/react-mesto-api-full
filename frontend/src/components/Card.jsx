import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__trash card__delete-button button ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );


    const isLiked = () => {
        if (props.card.likes) {
            return props.card.likes.some(i => i === currentUser._id);
        }
        return false;
    }

    const cardLikeButtonClassName = (
        `element__heart ${isLiked() ? 'element__heart_active' : 'element__heart_notActive'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleClickDelte() {
        props.handleCardDelete(props.card);
    }

    function handleCardLike() {
        props.handleCardLike(props.card);
    }

    return (
        <li className="element">
            <img src={props.card.link} alt={props.card.name} className="element__img" onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__text">{props.card.name}</h2>
                <div>
                    <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                    <p className="element__heart-quantity">{props.card.likes ? props.card.likes.length : 0}</p>
                </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleClickDelte}></button>
        </li>
    );
}

export default Card;