import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContentContainer from '../styled-components/ContentContainer';
import { Button } from '../styled-components/Button';

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

    const fixedPrice = Math.round(price * 100) / 100;
    const fixedNextBestPrice = Math.round(nextBestPrice * 100) / 100;

    console.log(fixedNextBestPrice);

    const facebookShareUri = `https://www.facebook.com/share.php?u=${encodeURIComponent(
      dealLink
    )}&title=${encodeURIComponent(dealTitle)}`;
    const twitterShareUri = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      dealLink
    )}&text=${encodeURIComponent(dealTitle)}&via=deals-ie`;

    return (
      <DealPageContainer>
        <DealPageDealContainer>
          <a href={dealLink} target="_blank" rel="noopener noreferrer">
            <DealPageImage src={imageUrl} />
          </a>
          <DealPageDetailsContainer>
            <DealPageHeatContainer>
              {'-'}
              {dealLikes - dealDislikes}
              {'+'}
            </DealPageHeatContainer>
            <DealPageTitleContainer>{dealTitle}</DealPageTitleContainer>
            <DealPagePriceContainer>
              <DealPagePrice>{fixedPrice}</DealPagePrice>
              <DealPageNextBestPrice>{fixedNextBestPrice}</DealPageNextBestPrice>
            </DealPagePriceContainer>
            <DealPageUserAndDealButtonContainer>
              <DealPageUsername>{userName}</DealPageUsername>
              <a href={dealLink} target="_blank" rel="noopener noreferrer">
                <DealPageDealButton>Go to deal</DealPageDealButton>
              </a>
            </DealPageUserAndDealButtonContainer>
          </DealPageDetailsContainer>
        </DealPageDealContainer>
        <DealPageTextContainer>
          <DealPageText>{dealText}</DealPageText>
        </DealPageTextContainer>
        <a href={facebookShareUri} target="_blank" rel="noopener noreferrer">
          <DealPageFacebookPostButton>Post</DealPageFacebookPostButton>
        </a>
        <a href={twitterShareUri} target="_blank" rel="noopener noreferrer">
          <DealPageTwitterPostButton>Tweet</DealPageTwitterPostButton>
        </a>

        <DealPageCommentsContainer>
          <div>
            <p>Placeholder comment</p>
          </div>
        </DealPageCommentsContainer>
      </DealPageContainer>
    );
  }
}

const DealPageContainer = styled.div`
  font-weight: 400;
  margin: 1rem auto;
  padding: 2rem; /* m-size */
  max-width: 135rem;
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
  box-shadow: 5px;

  transition: all 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 6px -6px black;
  }
`;

const DealPageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  padding: 1rem;
`;

const DealPageHeatContainer = styled.div`
  display: inline-block;
`;

const DealPageTitleContainer = styled.div``;

const DealPagePriceContainer = styled.div``;

const DealPagePrice = styled.span``;

const DealPageNextBestPrice = styled.span``;

const DealPageUserAndDealButtonContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DealPageUsername = styled.span``;

const DealPageDealButton = styled(Button)``;

const DealPageTextContainer = styled.div``;

const DealPageText = styled.p`
  white-space: pre-line;
`;

const DealPageFacebookPostButton = styled.button``;

const DealPageTwitterPostButton = styled.button``;

const DealPageCommentsContainer = styled.div``;

DealPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default DealPage;
