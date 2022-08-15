import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './popups/ImagePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import EditProfilePopup from './popups/EditProfilePopup';
import AddPlacePopup from './popups/AddPlacePopup';
import DeletePlacePopup from './popups/DeletePlacePopup';
import InfoTooltip from './popups/InfoTooltip';

import api from '../utils/api.js';
import handleError from '../utils/utils.js';
import * as auth from '../utils/auth';

import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [cardId, setCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const history = useHistory();

  // useEffect(() => {
  //   if (loggedIn)
  //   checkToken();
  // }, [checkToken, loggedIn]);

  // HANDLE CLOSE
  useEffect(() => {
    function handleEscClose(e) {
      const ESC_CODE = 'Escape';
      if (e.key === ESC_CODE) {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, []);

  useEffect(() => {
    function handleOverlayClose(e) {
      if (e.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }
    document.addEventListener('click', handleOverlayClose);
    return () => {
      document.removeEventListener('click', handleOverlayClose);
    };
  }, []);

// CHECK TOKEN
useEffect(() => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    auth
      .checkToken(jwt)
    }
  }, []);

// GET DATA
useEffect(() => {
  if (loggedIn) {
  api
    .getInitialData()
    .then(([profileData, cardsData]) => {
      setCurrentUser(profileData);
      setCards(cardsData);
    })
    .catch(handleError);
  }
}, [loggedIn]);

  // REGISTER
  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
          setLoggedIn(true);
          setIsInfoTooltipOpen(true);
          history.push('/signin');
      })
      .catch(() => {
        setLoggedIn(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // LOGIN
  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(() => {
        setLoggedIn(false);
        setIsInfoTooltipOpen(true);
      });
  }

  // SIGNOUT
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  // ADD CARD
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError);
  }
  
  // CARD LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map(c => c._id === card._id ? newCard : c));
      })
      .catch(handleError);
  }

  // CARD DELETE
  function handleCardDelete() {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId && c));
      })
      .catch(handleError);
  }

  // UPDATE USERDATA
  function handleUpdateUser(data) {
    api
      .editProfileInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(handleError);
  }

  // UPDATE AVATAR
  function handleUpdateAvatar({ avatar }) {
    api
      .editProfileAvatar({ avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(handleError);
  }
  
  // OPEN POPUPS
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(dataCard) {
    setSelectedCard(dataCard);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePlacePopupOpen(true);
    setCardId(card._id);
  }

  // CLOSE POPUPS
  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
    setIsDeletePlacePopupOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute
            exact
            path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />

          <Route path='/signup'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path='/signin'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route>{loggedIn ? <Redirect to='/' /> : <Redirect to='/signup' />}</Route>
        </Switch>
        <Footer />

        <InfoTooltip
          name={'info'}
          isOpen={isInfoTooltipOpen}
          state={loggedIn}
          onClose={closeAllPopups}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
