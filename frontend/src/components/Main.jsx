import pencil from "../../src/images/Pencil.svg";
import addPlace from "../../src/images/Plus.svg";
import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IsLoginContext } from '../contexts/IsLoginContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);  
  const isLoggetIn = React.useContext(IsLoginContext);  

  return (
    isLoggetIn &&
    <main className="content">
      <section className="profile">
        <div className="profile__profile-info">
          <button className="profile__avatar" onClick={props.onEditAvatar}>
            <img src={currentUser.avatar} alt="аватар" className="profile__avatar-img" />
            <div className="profile__avatar-edit">
              <img
                className="profile__avatar-edit-icon"
                src={pencil}
                alt="Изменить"
              />
            </div>
          </button>
          <div className="profile__text">
            <div className="profile__name-line">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button button"
                onClick={props.onEditProfile}
              >
                <img src={pencil} alt="Изменить" />
              </button>
            </div>
            <p className="profile__prof">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button button"
          onClick={props.onAddPlace}
        >
          <img src={addPlace} alt="Добавить" />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => {
            return (
              <Card card={card} setCards={props.setCards} onCardClick={props.onCardClick} key={card._id} handleCardDelete={props.handleCardDelete} handleCardLike={props.handleCardLike}/>
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
