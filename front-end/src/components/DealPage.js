import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom;
import { Link } from '@reach/router';
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
import {
  SocialMediaImg,
  SocialMediaAnchorTag,
  FacebookPostButton,
  TwitterPostButton
} from '../styled-components/SocialMediaPosts';
import { LoadingContainer, LoadingImage } from '../styled-components/LoadingIcon';

class DealPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };

    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.onVisitDeal = this.onVisitDeal.bind(this);

    // Deal heat
    this.onSubmitChangeDealLikeHot = this.onSubmitChangeDealLikeHot.bind(this);
    this.onSubmitChangeDealLikeCold = this.onSubmitChangeDealLikeCold.bind(this);
    this.handleDealLikeSubmit = this.handleDealLikeSubmit.bind(this);
    this.handleDealLikeUpdate = this.handleDealLikeUpdate.bind(this);
    this.handleDealLikeDelete = this.handleDealLikeDelete.bind(this);
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');

    const { location } = this.props;
    const { pathname } = location;
    fetch(`${window.BACKEND_PATH}${pathname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.deal_title) {
          const newData = { dealsArray: [data], isLoading: false };
          this.setState(newData);
          // console.log(this.props);
          // console.log(data);
          // this.setState({ dealsArray: [data] });
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  }

  onSubmitComment() {}

  onVisitDeal() {}

  onSubmitChangeDealLikeHot(dealId, isLike) {
    const token = window.sessionStorage.getItem('token');
    if (token === 'undefined' || !token) {
      return console.log('No token, therefore redirect to signin modal');
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
    if (token === 'undefined' || !token) {
      return console.log('No token, therefore redirect to signin modal');
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
        if (typeof data.is_like === 'boolean') {
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
        }
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
        if (typeof data.is_like === 'boolean') {
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
        }
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
        if (data.is_like === null) {
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
        }
      })
      .catch(console.log);
  }

  render() {
    // console.log('renderState: ', this.state);
    const { dealsArray, isLoading } = this.state;

    const dealsElement =
      dealsArray && dealsArray[0] ? (
        dealsArray.map(deal => {
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

          const facebookShareUri = `https://www.facebook.com/share.php?u=${encodeURIComponent(
            dealLink
          )}&title=${encodeURIComponent(dealTitle)}`;
          const twitterShareUri = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            dealLink
          )}&text=${encodeURIComponent(dealTitle)}&via=deals-ie`;

          return (
            <DealPageContainer key={dealId}>
              <DealPageDealContainer>
                <DealPageImageContainer href={dealLink} target="_blank">
                  <DealPageImageStretchContainer>
                    <DealPageImage src={imageUrl} />
                  </DealPageImageStretchContainer>
                </DealPageImageContainer>
                <DealPageDetailsContainer>
                  <DealPageDetailsTopContainer>
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

                    <DealPageTitleContainer>{dealTitle}</DealPageTitleContainer>
                  </DealPageDetailsTopContainer>

                  <DealPageDetailsBottomContainer>
                    {fixedPrice ? (
                      <DealPagePriceContainer>
                        <DealPagePrice>
                          {currencyPound && fixedPrice ? <span>&pound;</span> : <span>&euro;</span>}
                          {fixedPrice}
                        </DealPagePrice>
                        {fixedNextBestPrice ? (
                          <DealPageNextBestPrice>
                            {currencyPound ? <span>&pound;</span> : <span>&euro;</span>}
                            {fixedNextBestPrice}
                          </DealPageNextBestPrice>
                        ) : null}
                      </DealPagePriceContainer>
                    ) : null}

                    <DealPageUserAndDealButtonContainer>
                      <DealPageUsernameLink to={userNameUrl}>
                        <UsernameImg src="/images/icons8-user-50.png" alt="username logo" />
                        <DealPageUsernameSpan>{userName}</DealPageUsernameSpan>
                      </DealPageUsernameLink>
                      <GoToDealAnchor href={dealLink} target="_blank" rel="noopener noreferrer">
                        <GoToDealButton>Go to deal &#10148;</GoToDealButton>
                      </GoToDealAnchor>
                    </DealPageUserAndDealButtonContainer>
                  </DealPageDetailsBottomContainer>
                </DealPageDetailsContainer>
              </DealPageDealContainer>

              <DealPageTextContainer>
                <DealPageText>{dealText}</DealPageText>
              </DealPageTextContainer>

              <SocialMediaAnchorTag
                href={facebookShareUri}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookPostButton>
                  <SocialMediaImg src="/images/facebook-icon-white-50px.png" />
                  <span>Post</span>
                </FacebookPostButton>
              </SocialMediaAnchorTag>

              <SocialMediaAnchorTag
                href={twitterShareUri}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterPostButton>
                  <SocialMediaImg src="/images/twitter-icon-white-50px.png" />
                  <span>Tweet</span>
                </TwitterPostButton>
              </SocialMediaAnchorTag>
            </DealPageContainer>
          );
        })
      ) : (
        <ErrorContainer>
          <h2>Error loading deal..</h2>
        </ErrorContainer>
      );

    return (
      <div>
        {isLoading ? (
          <LoadingContainer>
            <LoadingImage src="/images/loader.gif" />
          </LoadingContainer>
        ) : (
          dealsElement
        )}
      </div>
    );
  }
}

const ErrorContainer = styled.div`
  font-weight: 400;
  margin: 1rem auto;
  max-width: 124rem;
  border-radius: 5px;
  min-height: 40vh;
`;

const DealPageContainer = styled.div`
  font-weight: 400;
  margin: 1rem auto;
  padding: 2rem; /* m-size */
  max-width: 124rem;
  background-color: var(--light-grey);
  border-radius: 5px;
`;

const DealPageDealContainer = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DealPageImageContainer = styled.a`
  margin: 0;
  position: relative;
  width: 200px;

  &:before {
    content: '';
    display: block;
    padding: 50%;
  }

  @media (max-width: 700px) {
    width: 300px;
  }
`;

const DealPageImageStretchContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: white;
  border-radius: 5px;

  transition: all 0.2s;

  overflow: hidden;

  &:hover {
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }
`;

const DealPageImage = styled.img`
  object-fit: contain;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  border-radius: 5px;
`;

const DealPageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  max-height: 200px;
  width: 100%;
  padding: 0 1rem;

  @media (max-width: 700px) {
    padding: 1.5rem 0;
    max-height: 300px;
  }
`;

const DealPageDetailsTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* height: 100px; */
`;

const DealPageTitleContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 0 1rem;
  margin-top: 0.75rem;

  font-weight: 600;
`;

const DealPagePriceContainer = styled.div`
  font-size: 2.5rem;
  font-weight: 600;

  margin-top: 0.5rem;
  background-color: white;
  border-radius: 5px;
  padding: 0 1rem;
`;

const DealPageDetailsBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const DealPagePrice = styled.span`
  color: var(--red);
`;

const DealPageNextBestPrice = styled.span`
  color: var(--light-grey);
  text-decoration: line-through;
  margin-left: 1rem;
`;

const DealPageUserAndDealButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0;
  }
`;

const DealPageUsernameLink = styled(Link)`
  color: black;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;

  font-weight: 600;
  transition: all 0.2s;

  text-decoration: none;

  &:visited {
    text-decoration: none;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 700px) {
    margin-bottom: 1rem;
  }
`;

const UsernameImg = styled.img`
  height: 2rem;
`;

const DealPageUsernameSpan = styled.span`
  text-decoration: none;

  &:visited {
    text-decoration: none;
  }
`;

const GoToDealAnchor = styled.a`
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const GoToDealButton = styled(Button)`
  margin: 0;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const DealPageDealButton = styled(Button)``;

const DealPageTextContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
`;

const DealPageText = styled.p`
  white-space: pre-line;
  font-size: 1.5rem;
`;

const DealPageCommentsContainer = styled.div``;

// DealPage.propTypes = {
//   location: PropTypes.shape({
//     pathname: PropTypes.string.isRequired
//   }).isRequired
// };

export default DealPage;
