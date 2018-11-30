import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import ContentContainer from '../styled-components/ContentContainer';
import { Button } from '../styled-components/Button';
import { FacebookPostButton, TwitterPostButton } from '../styled-components/SocialMediaPosts';

class DealPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.onVisitDeal = this.onVisitDeal.bind(this);
  }

  componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    fetch(`${window.BACKEND_PATH}${pathname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (data && data.deal_title) {
          console.log(this.props);
          console.log(data);
          this.setState({ ...data });
        }
      })
      .catch(console.log);
  }

  onSubmitComment() {}

  onVisitDeal() {}

  render() {
    console.log(this.state);
    const {
      image_url: imageUrl,
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
    } = this.state;

    const fixedPrice = price ? Math.round(price * 100) / 100 : null;
    const fixedNextBestPrice = nextBestPrice ? Math.round(nextBestPrice * 100) / 100 : null;

    const facebookShareUri = `https://www.facebook.com/share.php?u=${encodeURIComponent(
      dealLink
    )}&title=${encodeURIComponent(dealTitle)}`;
    const twitterShareUri = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      dealLink
    )}&text=${encodeURIComponent(dealTitle)}&via=deals-ie`;

    const userNameUrl = `/profile/${userName}`;

    return (
      <div>
        <DealPageContainer>
          <DealPageDealContainer>
            <a href={dealLink} target="_blank" rel="noopener noreferrer">
              <DealPageImage src={imageUrl} />
            </a>
            <DealPageDetailsContainer>
              <DealPageHeatContainer>
                <VoteDivCold>-</VoteDivCold>
                <DealHeat>
                  {dealLikes - dealDislikes}
                  &#186;
                </DealHeat>
                <VoteDivHot>+</VoteDivHot>
              </DealPageHeatContainer>

              <DealPageTitleContainer>{dealTitle}</DealPageTitleContainer>

              {fixedPrice ? (
                <DealPagePriceContainer>
                  <DealPagePrice>
                    {currencyPound && fixedPrice ? <span>&pound; </span> : <span>&euro; </span>}
                    {fixedPrice}
                  </DealPagePrice>
                  {fixedNextBestPrice ? (
                    <DealPageNextBestPrice>
                      {currencyPound ? <span>&pound; </span> : <span>&euro; </span>}
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
                <a href={dealLink} target="_blank" rel="noopener noreferrer">
                  <GoToDealButton>Go to deal &#10148;</GoToDealButton>
                </a>
              </DealPageUserAndDealButtonContainer>
            </DealPageDetailsContainer>
          </DealPageDealContainer>

          <DealPageTextContainer>
            <DealPageText>{dealText}</DealPageText>
          </DealPageTextContainer>

          <a href={facebookShareUri} target="_blank" rel="noopener noreferrer">
            <FacebookPostButton>Post</FacebookPostButton>
          </a>

          <a href={twitterShareUri} target="_blank" rel="noopener noreferrer">
            <TwitterPostButton>Tweet</TwitterPostButton>
          </a>
        </DealPageContainer>
      </div>
    );
  }
}

// <DealPageContainer>
//   <DealPageCommentsContainer>
//     <div>
//       <p>Placeholder comment</p>
//     </div>
//   </DealPageCommentsContainer>
// </DealPageContainer>

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
`;

const DealPageImage = styled.img`
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 5px;

  transition: all 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 1px 2px 8px 0 rgba(0, 0, 0, 0.7);
  }
`;

const DealPageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  height: 200px;
  padding: 0 1rem;
`;

const DealPageHeatContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  flex-shrink: 1;
`;

const VoteDivHot = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.65rem;

  margin: 0 1rem;

  color: red;

  vertical-align: middle;
  line-height: 1.05;
  border-radius: 50px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: red;
  }
`;

const VoteDivCold = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.97rem;

  margin: 0 1rem;

  color: blue;

  vertical-align: middle;
  line-height: 0.87;
  border-radius: 50px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: blue;
  }
`;

const DealHeat = styled.span`
  font-size: 3rem;
  font-weight: 600;
  border-radius: 3px;
  margin: 0.5rem 0;
  padding: 0.2rem;
  line-height: 1;
`;

const DealPageTitleContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 0 1rem;

  font-weight: 600;
`;

const DealPagePriceContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 0 1rem;

  font-weight: 600;
`;

const DealPagePrice = styled.span``;

const DealPageNextBestPrice = styled.span`
  color: var(--light-grey);
  text-decoration: line-through;
  margin-left: 1rem;
`;

const DealPageUserAndDealButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
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

const GoToDealButton = styled(Button)`
  margin: 0;
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

DealPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default DealPage;
