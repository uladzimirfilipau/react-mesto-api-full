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
import Menu from './popups/Menu';

import api from '../utils/api.js';
import {
  handleError,
  SUCCESS_REGISTER,
  SOMETHING_WRONG,
  WRONG_DATA,
  CARD_DELETE,
  ERROR_DELETE,
} from '../utils/consts.js';
import * as auth from '../utils/auth';

import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import PageNotFound from './PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState({
    open: false,
    message: '',
    success: null,
  });
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  const [cardId, setCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ email }) => {
          setEmail(email);
          setLoggedIn(true);
          getInitialData();
          history.push('/');
        })
        .catch(handleError);
    }
  }, [setLoggedIn, history]);

  function getInitialData() {
    api
      .getInitialData()
      .then(([profileData, cardsData]) => {
        setCurrentUser(profileData);
        setCards(cardsData);
      })
      .catch(handleError);
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        setLoggedIn(true);
        setIsInfoTooltipOpen({
          open: true,
          message: SUCCESS_REGISTER,
          success: true,
        });
        history.push('/signin');
      })
      .catch(() => {
        setLoggedIn(false);
        setIsInfoTooltipOpen({
          open: true,
          message: SOMETHING_WRONG,
          success: false,
        });
      });
  }

  function handleLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token);
          setLoggedIn(true);
          setEmail(email);
          getInitialData();
          history.push('/');
        }
      })
      .catch(() => {
        setLoggedIn(false);
        setIsInfoTooltipOpen({
          open: true,
          message: WRONG_DATA,
          success: false,
        });
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setEmail('');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handlePlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch(handleError);
  }

  function handleCardDelete() {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId && c));
        setIsInfoTooltipOpen({
          open: true,
          message: CARD_DELETE,
          success: true,
        });
      })
      .catch((err) => {
        if (err.includes(403)) {
          setIsInfoTooltipOpen({
            open: true,
            message: ERROR_DELETE,
            success: false,
          });
        } else {
          handleError();
        }
      });
  }

  function handleUpdateUser(data) {
    api
      .editProfileInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(handleError);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editProfileAvatar({ avatar })
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(handleError);
  }

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

  function handleMenuOpen() {
    setIsMenuOpen(true);
  }

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen({
      open: false,
      message: '',
      success: null,
    });
    setIsDeletePlacePopupOpen(false);
    setIsMenuOpen(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Menu isOpen={isMenuOpen} email={email} onSignOut={handleSignOut} />

        <Header
          email={email}
          handleMenuOpen={handleMenuOpen}
          isOpen={isMenuOpen}
          onSignOut={handleSignOut}
          handleMenuClose={closeAllPopups}
        />

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

          <Route path='*' component={PageNotFound} />

          <Route>{loggedIn ? <Redirect to='/' /> : <Redirect to='/signup' />}</Route>
        </Switch>
        <Footer />

        <InfoTooltip name={'info'} isInfoTooltipOpen={isInfoTooltipOpen} onClose={closeAllPopups} />

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
          onAddPlace={handlePlaceSubmit}
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
