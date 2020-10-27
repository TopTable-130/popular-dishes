/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DishEntry from './DishEntry.jsx';
import Popup from './Popup.jsx';
import icon from '../icons.jsx';

const Wrapper = styled.section`
  display: block;
  font-family: Halvetica, sans-serif;
  background-color: #fff;
  width: 678px;
  height: 400px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #2d333f;
  margin: 0px 0px 16px;
  padding: 0px 0px 16px;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1px solid #d8d9db;
`;

const DishesContainer = styled.nav`
  position: relative;
`;

const DishesOutter = styled.div`
  overflow: hidden;
`;

const DishesInner = styled.div`
  display: flex;
  padding-top: .5rem;
  width: 678px;
  transition: .5s;
`;

const Button = styled.button`
  text-align: center;
  outline: none;
  width: 40px;
  height: 40px;
  padding-top: 2px;
  border-radius: 50%;
  border: 1px solid #d8d9db;
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const PrevBtn = styled(Button)`
  left: -23px;
  padding-right: 7px;
`;
const NextBtn = styled(Button)`
  right: -20px;
  padding-left: 7px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      popup: false,
      popupDish: null,
      x: 0,
    };
    this.getAllDishes = this.getAllDishes.bind(this);
    this.handleDishClick = this.handleDishClick.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.handlePopupContent = this.handlePopupContent.bind(this);
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  componentDidMount() {
    const restaurant = Math.floor(Math.random() * 100);
    this.getAllDishes(restaurant);
  }

  getAllDishes(restrId) {
    axios.get(`/api/restaurants/${restrId}/dishes`)
      .then((result) => {
        this.setState({
          dishes: result.data,
        });
      });
  }

  handleDishClick(dishId) {
    this.setState((prevState) => ({
      popup: !prevState.popup,
      popupDish: dishId,
    }));
  }

  handlePopupClose() {
    this.setState((prevState) => ({
      popup: !prevState.popup,
    }));
  }

  handlePopupContent(dishId) {
    this.setState(() => ({
      popupDish: dishId,
    }));
  }

  goLeft() {
    this.setState((prevState) => ({
      x: prevState.x + 678,
    }));
  }

  goRight() {
    this.setState((prevState) => ({
      x: prevState.x - 678,
    }));
  }

  render() {
    const { dishes } = this.state;
    const { popup } = this.state;
    const { x } = this.state;
    const numOfDishes = Object.keys(dishes).length;
    return (
      <div>
        <div>{popup ? <Popup dishes={dishes} dishToRender={this.state.popupDish} closePopup={this.handlePopupClose} onContentChange={this.handlePopupContent} /> : null}</div>
        <Wrapper>
          <Title>Popular dishes</Title>
          <DishesContainer>
            <DishesOutter>
              <DishesInner className="dishes" style={{ transform: `translateX(${x}px)` }}>
                {Object.values(dishes).map((dish) => {
                  return (<DishEntry key={dish.id} dish={dish} handleDishClick={this.handleDishClick} />);
                })}
              </DishesInner>
            </DishesOutter>
            <div className="nav">
              {x !== 0 ? <PrevBtn onClick={this.goLeft}>{icon.leftArrow}</PrevBtn> : null}
              {Math.abs(x) < numOfDishes * 226 - 678 ? <NextBtn onClick={this.goRight}>{icon.rightArrow}</NextBtn> : null}
            </div>
          </DishesContainer>
        </Wrapper>
      </div>
    );
  }
}

export default App;
