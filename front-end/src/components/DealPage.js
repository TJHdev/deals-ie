import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ContentContainer from '../styled-components/ContentContainer';

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

    const facebookShareUri = `https://www.facebook.com/share.php?u=${encodeURIComponent(
      dealLink
    )}&title=${encodeURIComponent(dealTitle)}`;
    const twitterShareUri = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      dealLink
    )}&text=${encodeURIComponent(dealTitle)}&via=deals-ie`;

    return (
      <ContentContainer>
        <a href={dealLink} target="_blank" rel="noopener noreferrer">
          <DealPageImage src={imageUrl} />
        </a>
        <DealPageHeatContainer>
          {'-'}
          {dealLikes - dealDislikes}
          {'+'}
        </DealPageHeatContainer>
        <DealPageTitleContainer>{dealTitle}</DealPageTitleContainer>
        <DealPagePriceContainer>
          <DealPagePrice>{price}</DealPagePrice>
          <DealPageNextBestPrice>{nextBestPrice}</DealPageNextBestPrice>
          <DealPageUsername>{userName}</DealPageUsername>
          <a href={dealLink} target="_blank" rel="noopener noreferrer">
            <DealPageDealButton>Go to deal</DealPageDealButton>
          </a>
          <DealPageTextContainer>
            <DealPageText>{dealText}</DealPageText>
          </DealPageTextContainer>
          <a href={facebookShareUri} target="_blank" rel="noopener noreferrer">
            <DealPageFacebookPostButton>Post</DealPageFacebookPostButton>
          </a>
          <a href={twitterShareUri} target="_blank" rel="noopener noreferrer">
            <DealPageTwitterPostButton>Tweet</DealPageTwitterPostButton>
          </a>
        </DealPagePriceContainer>
      </ContentContainer>
    );
  }
}

const DealPageImage = styled.img`
  width: 200px;
  height: 200px;
`;

const DealPageHeatContainer = styled.div``;

const DealPageTitleContainer = styled.div``;

const DealPagePriceContainer = styled.div``;

const DealPagePrice = styled.span``;

const DealPageNextBestPrice = styled.span``;

const DealPageUsername = styled.span``;

const DealPageDealButton = styled.button``;

const DealPageTextContainer = styled.div``;

const DealPageText = styled.p``;

const DealPageFacebookPostButton = styled.button``;

const DealPageTwitterPostButton = styled.button``;

DealPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default DealPage;
