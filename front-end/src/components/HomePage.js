import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import format from 'date-fns/format';
import cloneDeep from 'lodash/cloneDeep';

// import ContentContainer from '../styled-components/ContentContainer';
import { Button } from '../styled-components/Button';
import {
  DealsHeatContainer,
  VoteDivCold,
  DealHeat,
  VoteDivHot
} from '../styled-components/deals-components/DealsHeatContainer';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmitChangeDealLikeHot = this.onSubmitChangeDealLikeHot.bind(this);
    this.onSubmitChangeDealLikeCold = this.onSubmitChangeDealLikeCold.bind(this);
    this.handleDealLikeSubmit = this.handleDealLikeSubmit.bind(this);
    this.handleDealLikeUpdate = this.handleDealLikeUpdate.bind(this);
    this.handleDealLikeDelete = this.handleDealLikeDelete.bind(this);
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');

    const { location } = this.props;
    const { search } = location;
    // console.log('props: ', this.props);
    fetch(`${window.BACKEND_PATH}/deals${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.constructor === Array && data[0].deal_title) {
          this.setState({ dealsArray: data });
        }
      })
      .catch(console.log);
  }

  onSubmitChangeDealLikeHot(dealId, isLike) {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      console.log('No token, therefore redirect to signin modal');
      return;
    }
    if (isLike === null) {
      // submit isLike: true
      this.handleDealLikeSubmit(dealId, true, true);
    } else if (isLike === false) {
      // patch deal_id in deal_likes to be true
      this.handleDealLikeUpdate(dealId, true, true);
    } else if (isLike === true) {
      // delete deal_id from deal_likes
      this.handleDealLikeDelete(dealId, true);
    } else {
      console.log('isLike: Not set to a valid data type');
    }
  }

  onSubmitChangeDealLikeCold(dealId, isLike) {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
      console.log('No token, therefore redirect to signin modal');
      return;
    }
    if (isLike === null) {
      // submit isLike: false
      this.handleDealLikeSubmit(dealId, false, false);
    } else if (isLike === true) {
      // patch deal_id in deal_likes to be false
      this.handleDealLikeUpdate(dealId, false, false);
    } else if (isLike === false) {
      // delete deal_id from deal_likes
      this.handleDealLikeDelete(dealId, false);
    } else {
      console.log('isLike: Not set to a valid data type');
    }
  }

  handleDealLikeSubmit(dealId, isLike, isHot) {
    const token = window.sessionStorage.getItem('token');

    fetch(`${window.BACKEND_PATH}/deals/${dealId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        is_like: isLike
      })
    })
      .then(response => response.json())
      .then(data => {
        const clonedState = cloneDeep(this.state);
        const index = clonedState.dealsArray.findIndex(deal => deal.id === dealId);
        clonedState.dealsArray[index].is_like = data.is_like;
        if (isHot) {
          clonedState.dealsArray[index].likes = Number(clonedState.dealsArray[index].likes) + 1;
        } else {
          clonedState.dealsArray[index].dislikes =
            Number(clonedState.dealsArray[index].dislikes) + 1;
        }
        this.setState(clonedState);
      })
      .catch(console.log);
  }

  handleDealLikeUpdate(dealId, isLike, isHot) {
    const token = window.sessionStorage.getItem('token');

    fetch(`${window.BACKEND_PATH}/deals/${dealId}/like`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({
        is_like: isLike
      })
    })
      .then(response => response.json())
      .then(data => {
        const clonedState = cloneDeep(this.state);
        const index = clonedState.dealsArray.findIndex(deal => deal.id === dealId);

        clonedState.dealsArray[index].is_like = data.is_like;
        if (isHot) {
          clonedState.dealsArray[index].likes = Number(clonedState.dealsArray[index].likes) + 2;
        } else {
          clonedState.dealsArray[index].dislikes =
            Number(clonedState.dealsArray[index].dislikes) + 2;
        }
        this.setState(clonedState);
      })
      .catch(console.log);
  }

  handleDealLikeDelete(dealId, hot) {
    const token = window.sessionStorage.getItem('token');

    fetch(`${window.BACKEND_PATH}/deals/${dealId}/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
      .then(response => response.json())
      .then(data => {
        const clonedState = cloneDeep(this.state);
        const index = clonedState.dealsArray.findIndex(deal => deal.id === dealId);
        clonedState.dealsArray[index].is_like = data.is_like;
        if (hot) {
          clonedState.dealsArray[index].likes = Number(clonedState.dealsArray[index].likes) - 1;
        } else {
          clonedState.dealsArray[index].dislikes =
            Number(clonedState.dealsArray[index].dislikes) - 1;
        }

        this.setState(clonedState);
      })
      .catch(console.log);
  }

  render() {
    console.log('renderState: ', this.state);
    const { dealsArray } = this.state;

    const dealsElement =
      dealsArray && dealsArray[0]
        ? dealsArray.map(deal => {
            const {
              id: dealId,
              image_url: imageUrl,
              is_like: isLike,
              likes: dealLikes,
              dislikes: dealDislikes,
              deal_title: dealTitle,
              price,
              next_best_price: nextBestPrice,
              username: userName,
              deal_link: dealLink,
              deal_starts: dealStarts,
              deal_ends: dealEnds,
              deal_text: dealText,
              created_at: createdAt,
              edited_at: editedAt,
              currency_pound: currencyPound,
              deal_expired: dealExpired
            } = deal;

            const fixedPrice = price ? Math.round(price * 100) / 100 : null;
            const fixedNextBestPrice = nextBestPrice ? Math.round(nextBestPrice * 100) / 100 : null;

            const userNameUrl = `/profile/${userName}`;
            const dealPageUrl = `/deals/${dealId}`;
            const foundDate = format(createdAt, 'Do MMM');
            const dealLikesTotal = dealLikes - dealDislikes;

            return (
              <DealsCardContainer key={dealId}>
                <DealsDealContainer>
                  <DealsTopFlexContainer>
                    <DealsHeatContainer>
                      <VoteDivCold
                        isLike={isLike}
                        onClick={() => this.onSubmitChangeDealLikeCold(dealId, isLike)}
                      >
                        -
                      </VoteDivCold>
                      <DealHeat dealLikesTotal={dealLikesTotal}>
                        {dealLikesTotal}
                        &#186;
                      </DealHeat>
                      <VoteDivHot
                        isLike={isLike}
                        onClick={() => this.onSubmitChangeDealLikeHot(dealId, isLike)}
                      >
                        +
                      </VoteDivHot>
                    </DealsHeatContainer>

                    <OptionsContainer>
                      <OptionsCircle />
                      <OptionsCircle />
                      <OptionsCircle />
                    </OptionsContainer>
                  </DealsTopFlexContainer>

                  <DealsImageContainer to={dealPageUrl}>
                    <DealsImageStretchContainer>
                      <DealsImage src={imageUrl} />
                    </DealsImageStretchContainer>
                  </DealsImageContainer>

                  <DealsDetailsMiddleContainer>
                    <DealsTitleContainer>{dealTitle}</DealsTitleContainer>
                    <DealsText>{dealText}</DealsText>
                  </DealsDetailsMiddleContainer>

                  <DealsDetailsBottomContainer>
                    <UserAndReadMoreFlexContainer>
                      <DealsUsernameLink to={userNameUrl}>
                        <UsernameImg src="/images/icons8-user-50.png" alt="username logo" />
                        <DealsUsernameSpan>{userName}</DealsUsernameSpan>
                      </DealsUsernameLink>
                      <ReadMoreAnchor to={dealPageUrl}>Read more</ReadMoreAnchor>
                    </UserAndReadMoreFlexContainer>

                    <PriceDateFoundFlexContainer>
                      {fixedPrice ? (
                        <DealsPriceContainer>
                          <DealsPrice>
                            {currencyPound && fixedPrice ? (
                              <span>&pound;</span>
                            ) : (
                              <span>&euro;</span>
                            )}
                            {fixedPrice}
                          </DealsPrice>

                          {fixedNextBestPrice ? (
                            <DealsNextBestPrice>
                              {currencyPound ? <span>&pound;</span> : <span>&euro;</span>}
                              {fixedNextBestPrice}
                            </DealsNextBestPrice>
                          ) : null}
                        </DealsPriceContainer>
                      ) : null}
                      <DealFoundDateContainer>
                        <DealFoundImg src="/images/icons8-search-48.png" alt="dealfound logo" />
                        <DealsFoundTextSpan>{foundDate}</DealsFoundTextSpan>
                      </DealFoundDateContainer>
                    </PriceDateFoundFlexContainer>

                    <GoToDealAnchorTag href={dealLink} target="_blank" rel="noopener noreferrer">
                      <GoToDealButton>Go to deal &#10148;</GoToDealButton>
                    </GoToDealAnchorTag>
                  </DealsDetailsBottomContainer>
                </DealsDealContainer>
              </DealsCardContainer>
            );
          })
        : null;

    return (
      <DealsContainer>
        <DealsGridContainer>{dealsElement}</DealsGridContainer>
      </DealsContainer>
    );
  }
}

const DealsContainer = styled.div`
  font-weight: 400;
  margin: 1rem auto;
  max-width: 124rem;
  border-radius: 5px;
`;

const DealsGridContainer = styled.div`
  margin: 0.5rem;
  font-size: 100%;
  display: grid;
  /* grid-template-rows: 150px 150px; // 1st value 1st row, 2nd value 2nd row */
  /* grid-template-rows: repeat(5, 1fr); */
  /* grid-template-columns: repeat(2, 150px) 1fr; */
  /* grid-template-columns: 50% 1fr 2fr; */
  grid-template-columns: repeat(5, 1fr);
  /* grid-row-gap: 30px; */
  /* grid-column-gap: 40px; */
  grid-gap: 15px;

  @media only screen and (max-width: 85rem) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 63rem) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 30rem) {
    grid-template-columns: repeat(1, 1fr);
  }
  /* @media only screen and (max-width: 50em) {
    grid-template-rows: 6rem calc(100vh - 6rem) repeat(6, min-content);
  } */
`;

// **************
// Card Container
// **************

const DealsCardContainer = styled.div`
  background-color: var(--light-grey);
  padding: 1rem;
  border-radius: 5px;

  transition: box-shadow 0.2s;

  border: 1px solid white;

  &:hover {
    /* box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7); */
    border: 1px solid gray;
  }
`;

const DealsDealContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

// *********************
// Top flex container
// *********************

const DealsTopFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
`;

// **************
// Options button
// **************

const OptionsContainer = styled.div`
  cursor: pointer;
  border: solid 1px var(--medium-grey);
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  width: 34px;
  height: 19px;

  &:hover div {
    background-color: black;
  }
`;

const OptionsCircle = styled.div`
  background-color: grey;
  height: 4px;
  width: 4px;
  border-radius: 4px;
`;

// *********************
// Image container
// *********************

const DealsImageContainer = styled(Link)`
  margin: 0.75rem 0;
  position: relative;
  width: 100%;

  &:before {
    content: '';
    display: block;
    padding: 50%;
  }
`;

const DealsImageStretchContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: white;
  border-radius: 5px;

  transition: all 0.2s;

  &:hover {
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }
`;

const DealsImage = styled.img`
  margin: auto;
  display: flex;
  max-height: 100%;
  max-width: 100%;
  /* transform: translate(50%, 50%); */

  overflow: hidden;

  border-radius: 5px;
`;

// *********************
// Middle flex container
// *********************

const DealsDetailsMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  height: 160px;
  padding: 0;

  /* overflow: hidden; */
`;

const DealsTitleContainer = styled.div`
  font-weight: 600;
  font-size: 1.35rem;
  flex-grow: 0;
  flex-shrink: 0;

  background-color: white;
  border-radius: 5px;
  padding: 0 0.75rem;

  max-height: 160px;
  overflow: hidden;
`;

const DealsText = styled.p`
  /* display: -webkit-box; */
  font-size: 1.05rem;
  flex-shrink: 1;
  background-color: white;
  border-radius: 5px;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;

  word-wrap: break-word;
  word-break: break-word;

  overflow: hidden;

  /* Fades text out at the bottom of the box */
  position: relative;
  max-height: 350px; /* change the height */

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 1) 100%);
  }
`;

// *********************
// Bottom flex container
// *********************

const DealsDetailsBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

// ***************************
// UserName ReadMore container
// ***************************

const UserAndReadMoreFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* justify-content: flex-start; */
  width: 100%;
`;

// ********
// UserName
// ********

const DealsUsernameLink = styled(Link)`
  position: relative;
  color: black;
  cursor: pointer;

  display: flex;
  align-items: center;

  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  margin: 0;

  font-weight: 600;
  font-size: 80%;
  transition: all 0.2s;
  text-decoration: none;

  flex: 0 1 auto;
  overflow: hidden;
  /* &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  } */
  &:hover {
    text-decoration: underline;
  }
`;

const UsernameImg = styled.img`
  height: 1.5rem;
`;

const DealsUsernameSpan = styled.p`
  /* flex: 1 1 auto; */
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// *********
// Read More
// *********

const ReadMoreAnchor = styled(Link)`
  flex-shrink: 0;
  flex-grow: 0;

  cursor: pointer;
  color: var(--green);
  font-weight: 600;
  font-size: 1.3rem;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  margin: 0;
  margin-left: 0.5rem;

  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// *********************
// Price Date Found Flex
// *********************

const PriceDateFoundFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
`;

// ***************
// Price Container
// ***************

const DealsPriceContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
  overflow: hidden;

  font-size: 1.8rem;
  font-weight: 600;

  background-color: white;
  border-radius: 5px;
  padding: 0 0.75rem;
  margin: 0.5rem 0;
  margin-right: 0.5rem;
`;

const DealsPrice = styled.span`
  color: var(--red);
`;

const DealsNextBestPrice = styled.span`
  color: var(--light-grey);
  text-decoration: line-through;
  margin-left: 0.6rem;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// **********************
// DealFoundDateContainer
// **********************

const DealFoundDateContainer = styled.div`
  position: relative;
  color: black;
  display: flex;
  align-items: center;

  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  margin: 0.5rem 0;

  font-weight: 600;
  font-size: 80%;
  transition: all 0.2s;
  text-decoration: none;

  flex: 0 0 auto;
  overflow: hidden;
`;

const DealFoundImg = styled.img`
  height: 1.5rem;
`;

const DealsFoundTextSpan = styled.p`
  font-size: 1.1rem;
`;

// ***********
// Deal Button
// ***********

const GoToDealAnchorTag = styled.a`
  width: 100%;
`;

const GoToDealButton = styled(Button)`
  margin: 0;
  width: 100%;
`;

HomePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default HomePage;
