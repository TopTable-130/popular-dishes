/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import Stars from './Stars.jsx';

const Wrapper = styled.div`
  border-bottom: 1px solid #d8d9db;
  padding-bottom: calc(1rem + .5rem);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: calc(.5rem + .25rem);
  margin-top: calc(.5rem + .25rem);
`;

const Thumbnail = styled.div`
  width: calc(2rem + 1rem);
  height: calc(2rem + 1rem);
  border-radius: 50%;
  margin-right: .5rem;
  line-height: calc(2rem + 1rem);
  color: #fff;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
`;

const UserName = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
`;

const Status = styled.div`
  margin-left: .5rem;
  text-transform: uppercase;
  background-color: #fdaf08;
  padding: 2px .5rem;
  font-size: 12px;
  border-radius: 1rem;
  font-weight: 700;
  color: #fff;
`;

const ReviewInfo = styled.div`
  display: block;
  margin-top: .25rem;
`;

const DateComponent = styled.div`
  color: #6f737b;
  margin-left: .25rem;
  font-weight: 500;
`;

const Rating = styled.div`
  display: flex;
  margin-top: .25rem;
`;

const TextContainer = styled.div`
  max-height: ${(props) => (!props.expand ? '69px' : null)};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Text = styled.p`
  margin-bottom: calc(.25rem + .5rem);
  line-height: calc(1rem + .5rem);
`;

const ReadMoreLink = styled.a`
  color: #da3743;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  &: hover {
    text-decoration: underline;
  }
`;

const Review = ({ review }) => {
  const [readMore, setReadMore] = useState(false);
  const linkName = readMore ? '- Read less' : '+ Read more';
  const dateFormatter = (date) => {
    const e = new Date(date);
    return e.toString().split(' ').slice(1, 4).join(' ');
  };
  return (
    <Wrapper>
      <ReviewHeader>
        {/* <Thumbnail>
          <Image src={user.avatar} alt={user.name} />
        </Thumbnail> */}
        <ReviewInfo>
          {/* <UserName>
            <div>{user.name}</div>
            <div>{review.user_status ? <Status>vip</Status> : null}</div>
          </UserName> */}
          <Rating>
            <Stars rating={review.stars} />
            <DateComponent>{`${review.stars} · Dined on ${dateFormatter(review.dined_on)}`}</DateComponent>
          </Rating>
        </ReviewInfo>
      </ReviewHeader>
      <div>
        <TextContainer expand={readMore}>
          <Text className="text">{review.review}</Text>
        </TextContainer>
        <ReadMoreLink onClick={() => setReadMore(!readMore)}>
          <span>{linkName}</span>
        </ReadMoreLink>
      </div>
    </Wrapper>
  );
};

export default Review;
