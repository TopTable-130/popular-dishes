/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import Review from './Review.jsx';
import icon from '../icons.jsx';

const CloseBtn = styled.button`
  position: absolute;
  background-color: transparent;
  top: .5rem;
  right: .5rem;
  padding: 0;
  height: calc(1rem + .5rem);
  width: calc(1rem + .5rem);
  cursor: pointer;
  border: none;
  z-index: 1;
  outline: none;
`;

const BadgeIcon = styled.div`
  height: calc(1rem + .5rem);
  width: calc(1rem + .5rem);
  margin-right: .25rem;
`;

const DishName = styled.h2`
  display: block;
  font-size: 24px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  margin-bottom: .5rem;
  margin-top: 5px
`;

const Mentions = styled.div`
  display: flex;
  align-items: center;
  margin-left: calc(-1*.25rem);
  margin-bottom: .5rem;
  font-size: 14px;
  font-weight: 500;
`;

const Ingredients = styled.p`
  line-height: calc(1rem + .5rem);
  font-weight: 16px;
`;

const Reviews = styled.div`
  width: 100%;
  height: 420px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  overflow-y: scroll;
  flex-grow: 1;
`;

const OtherDishes = styled.div`
  width: 100%;
  padding-top: 4px;
`;

const OtherDishesHeader = styled.h3`
  height: calc(1rem + .5rem);
  margin-bottom: 1rem;
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const DishBtn = styled.button`
  margin: 2px calc(.5rem + 1px) 1px 1px;
  border-radius: 4px;
  border: 1px solid #d8d9db;
  font-size: 14px;
  font-weight: 500;
  padding: .5rem;
  text-align: left;
  background-color: transparent;
  font-family: inherit;
  line-height: 1.15;
  text-rendering: auto;
  display: inline-block;
  align-items: flex-start;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    margin: 0 .5rem 0 0;
    border: 2px solid #da3743;
    outline: none;
  }
`;

const Popup = ({
  dishes, closePopup, dishToRender, onContentChange,
}) => {
  console.log('dishToRender: ', dishToRender);
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  const node = useRef();
  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    closeModal();
    closePopup();
  };
  const dishObj = dishes.filter((dish) => dish.id === dishToRender)[0];
  const dishName = dishObj.name;
  const UcFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  // const user = (id) => info.users[`${id}`];
  const reviewsNum = dishObj.reviews.length;
  // const ingredients = dishes[`${dishToRender}`].ingredients.split(', ').slice(-4).join(', ');
  const otherDishesIds = Object.keys(dishes).filter((id) => id !== `${dishToRender}`);
  const { reviews } = dishObj;

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Modal
      className="popupContent"
      isOpen={modalIsOpen}
      ariaHideApp={false}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '200',
          backgroundColor: 'rgba(0,0,0,.56)',
        },
        content: {
          maxWidth: '520px',
          maxHeight: '700px',
          padding: '2rem',
          outline: 'none',
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontFamily: 'Halvetica, sans-serif',
        },
      }}
    >
      <div ref={node} onClick={handleOutsideClick}>
        <CloseBtn onClick={closePopup}>╳</CloseBtn>
        <div>
          <DishName>{dishName}</DishName>
          <Mentions>
            <BadgeIcon>{icon.badge}</BadgeIcon>
            {`${reviewsNum} reviews mention this dish`}
          </Mentions>
          {/* <Ingredients>{ingredients}</Ingredients> */}
          <Reviews>
            {reviews.map((review) => <Review key={review.id} review={review} />)}
          </Reviews>
          {/* <OtherDishes>
            <OtherDishesHeader>Other Popular Dishes</OtherDishesHeader>
            {otherDishesIds.map((id) => <DishBtn onClick={() => onContentChange(id)} key={id}>{UcFirstLetter(dishName(id).split(' ').slice(-1).join(''))}</DishBtn>)}
          </OtherDishes> */}
        </div>
      </div>
    </Modal >
  );
};

export default Popup;
