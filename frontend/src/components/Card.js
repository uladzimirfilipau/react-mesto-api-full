import { useContext } from 'react';
import deleteButton from '../images/button-delete.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardLike, onCardDelete, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__button-delete ${isOwn && 'elements__button-delete_visible'}`;

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `elements__item-like ${isLiked && 'elements__item-like_active'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className='elements__item'>
      <figure className='elements__figure'>
        <img
          src={deleteButton}
          alt='Удалить карточку'
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        />
        <img
          src={card.link}
          alt={card.name}
          className='elements__item-image'
          onClick={handleCardClick}
        />
        <figcaption className='elements__figure-caption'>
          <h2 className='elements__item-title'>{card.name}</h2>
          <div className='elements__like-container'>
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
            <span className='elements__like-number'>{card.likes.length}</span>
          </div>
        </figcaption>
      </figure>
    </li>
  );
}

export default Card;
