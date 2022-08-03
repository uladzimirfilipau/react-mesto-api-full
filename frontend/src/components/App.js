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

  // CHECK TOKEN
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          const { email } = data;
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        })
        .catch(handleError);
    }
  }, [history]);

  // GET DATA
  useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [profileData, cardsData] = data;
        setCurrentUser(profileData);
        setCards(cardsData);
      })
      .catch(handleError);
  }, []);

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

  // REGISTER
  function handleRegister(data) {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
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
      .catch(handleError);
  }

  // SIGNOUT
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
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

  // CARD LIKE
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
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
  function handleUpdateAvatar(data) {
    api
      .editProfileAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(handleError);
  }

  // ADD PLACE
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError);
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

          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>

          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>

          <Route>{loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-up' />}</Route>
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
