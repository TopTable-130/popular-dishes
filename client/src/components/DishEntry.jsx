/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
  width: 220px;
  border-radius: 4px;
  border: 1px solid #d8d9db;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  white-space: normal;
  box-sizing: border-box;
  justify-content: space-between;
  margin-right: 6px;
  cursor: pointer;
  &: hover {
    box-shadow: 0 2px 4px rgba(45,51,63,.2);
    transform: translate(0,-6px);
  }
`;

const Photo = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;
`;

const DishInfoContainer = styled.div`
  padding: 0 14px 14px 14px;
  height: 160px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
`;

const DishName = styled.h1`
  width: 168px;
  height: 45px;
  padding-top: 3px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const DishIngredients = styled.p`
  width: 168px;
  height: 48px;
  cursor: pointer;
  font-size: 14px;
  font-weight: lighter;
  text-align: left;
`;

const Reviews = styled.p`
  width: 168px
  display: block;
  font-size: 14px;
`;

const DishEntry = ({ dish, handleDishClick }) => (
  <div>
    <Wrapper onClick={() => handleDishClick(dish.id)}>
      {/* <Photo>
        <Image src={dish.picture} alt={dish.name} />
      </Photo> */}
      <DishInfoContainer>
        <DishName>{dish.name}</DishName>
        {/* <DishIngredients>{dish.ingredients.split(', ').slice(-4).join(', ')}</DishIngredients> */}
        <Reviews>{`${Object.keys(dish.reviews).length} reviews`}</Reviews>
      </DishInfoContainer>
    </Wrapper>
  </div>
);

export default DishEntry;
