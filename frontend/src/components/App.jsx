import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import "../App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from './InfoTooltip';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IsLoginContext } from '../contexts/IsLoginContext';

import api from '../utils/api.js';
import singApi from '../utils/singApi.js';

import good from "../../src/images/GoodReg.png";
import bad from "../../src/images/BadReg.png";



function App() {

  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setisLoading] = useState(true);


  const [currentUser, setСurrentUser] = useState({ name: "", about: "", avatar: "", _id: "", cohort: "" });

  useEffect(() => {
    if (isLoggedIn) {
      api.getUser().then((res) => setСurrentUser(res)).catch(error => console.log(error));
      api.getCards()
        .then(res => setCards(res))
        .catch(error => console.log(error));
    }
  }, [isLoggedIn]);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isGoodInfoTooltipOpen, setIsGoodInfoTooltipOpen] = useState(false);
  const [isBadInfoTooltipOpen, setIsBadInfoTooltipOpen] = useState(false);



  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsGoodInfoTooltipOpen(false);
    setIsBadInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(name, description) {
    api.patchUserInfo(name, description)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(error))
  }

  function handleUpdateAvatar(avatar) {
    api.patchUserImg(avatar)
      .then((res) => {
        setСurrentUser(res);
        closeAllPopups();
      })
      .catch(error => console.log(error))
  }

  const [cards, setCards] = useState([]);

  function handleCardDelete(card) {
    const cardId = card._id;

    api.deleteCard(cardId)
      .then(() => {
        setCards(cards.filter(card => card._id !== cardId))
      })
      .catch(error => console.log(error));
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard(name, link)
      .then((res) => { setCards([res, ...cards]); closeAllPopups() })
      .catch(error => console.log(error));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch(error => console.log(error));
  };

  function handleRegisration(mail, password) {
    singApi.signUp(mail, password)
      .then(() => {
        setIsGoodInfoTooltipOpen(true);
        history.push('/sign-in')
      })
      .catch(er => {
        setIsBadInfoTooltipOpen(true);
        console.log(er)
      })
  }

  function handleLogin(email, password) {
    singApi.signIn(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('email', email);
        setIsLoggedIn(true);
        history.push('/')
      })
      .catch(er => console.log(er))
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      singApi.check(jwt)
        .then((res) => {
          localStorage.setItem('_id', res.data._id);
          localStorage.setItem('email', res.data.email);
          setIsLoggedIn(true)
        })
        .catch(er => console.log(er))
        .finally(() => { setisLoading(false) })
      history.push('/')
    } else {
      setisLoading(false);
    }
  }, []);

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    history.push('/sign-in');
  }

  if (isLoading) { return <div>жди</div> }
  else {
    return (
      <IsLoginContext.Provider value={isLoggedIn}>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <div className="page__container">
              <Header setisLoggedIn={setIsLoggedIn} onSignOut={onSignOut} />

              <Switch>
                <Route path="/sign-up">
                  <Register onRegisration={handleRegisration} />
                </Route>
                <Route path="/sign-in">
                  <Login onLogin={handleLogin} />
                </Route>
                <ProtectedRoute path="/" >
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    handleCardDelete={handleCardDelete}
                    handleCardLike={handleCardLike}
                    setCards={setCards} cards={cards}
                  />
                </ProtectedRoute>
              </Switch>

              <Footer />
              <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />

              <PopupWithForm title='Вы уверены?' name='delete-card' isOpen='' onClose={closeAllPopups} submitButtonText='Да' />

              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <InfoTooltip isOpen={isGoodInfoTooltipOpen} onClose={closeAllPopups} text='Вы успешно зарегистрировались!' imgLink={good} />
              <InfoTooltip isOpen={isBadInfoTooltipOpen} onClose={closeAllPopups} text='Что-то пошло не так! Попробуйте ещё раз.' imgLink={bad} />
            </div>
          </div>
        </CurrentUserContext.Provider >
      </IsLoginContext.Provider>
    );
  }
}


export default App;
