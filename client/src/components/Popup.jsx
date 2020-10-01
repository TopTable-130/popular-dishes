/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';

const Content = styled.div`
  max-width: 480px;
  max-height: 700px;
  height: 70%;
  position: relative;
  padding: 2rem;
  outline: none;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Halvetica, sans-serif;
`;

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

const DishName = styled.h2`
  display: block;
  font-size: 24px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  margin-bottom: .5rem;
`;

const Mentions = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Ingredients = styled.p`
  line-height: calc(1rem + .5rem);
  font-weight: 16px;
`;

const Reviews = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 1rem;
  margin-top: 2rem;
  overflow-y: scroll;
  flex-grow: 1;
`;

const OtherDishes = styled.div`
  width: 100%;
  padding-top: 1rem;
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

// const OtherDishesBtns = styled.div`
//   display: flex;
// `;

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
  cursor: default;
  box-sizing: border-box;
  &:hover {
    margin: 0 .5rem 0 0;
    border: 2px solid #da3743;
    outline: none;
  }
`;

const Popup = ({
  info, closePopup, dishToRender, onContentChange,
}) => {
  const dishName = (id) => info.dishes[`${id}`].name;
  const UcFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const user = (id) => info.users[`${id}`];
  const reviewsNum = Object.keys(info.dishes[`${dishToRender}`].reviews).length;
  const ingredients = info.dishes[`${dishToRender}`].ingredients.split(', ').slice(-4).join(', ');
  const otherDishesIds = Object.keys(info.dishes).filter((id) => id !== `${dishToRender}`);
  const reviews = Object.values(info.dishes[`${dishToRender}`].reviews);
  return (
    <div>
      <Content>
        <CloseBtn onClick={closePopup}>╳</CloseBtn>
        <div>
          <DishName>{dishName(dishToRender)}</DishName>
          <Mentions>{`${reviewsNum} reviews mention this dish`}</Mentions>
          <Ingredients>{ingredients}</Ingredients>
          <Reviews>
            {reviews.map((review) => <Review key={review.id} review={review} user={user(review.user_id)} />)}
          </Reviews>
          <OtherDishes>
            <OtherDishesHeader>Other Popular Dishes</OtherDishesHeader>
            {otherDishesIds.map((id) => <DishBtn onClick={() => onContentChange(id)} key={id}>{UcFirstLetter(dishName(id).split(' ').slice(-1).join(''))}</DishBtn>)}
          </OtherDishes>
        </div>
      </Content>
    </div>
  );
};

export default Popup;