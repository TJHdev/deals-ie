import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import ContentContainer from '../styled-components/ContentContainer';
import { Button } from '../styled-components/Button';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { location } = this.props;
    const { search } = location;
    console.log('props: ', this.props);
    fetch(`${window.BACKEND_PATH}/deals${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('data: ', data);
        if (data && data.constructor === Array && data[0].deal_title) {
          console.log('data before setState:', data);
          this.setState({ dealsArray: data });
        }
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

            return (
              <DealsCardContainer>
                <DealsDealContainer>
                  <DealsTopFlexContainer>
                    <DealsHeatContainer>
                      <VoteDivCold>-</VoteDivCold>
                      <DealHeat>
                        {dealLikes - dealDislikes}
                        &#186;
                      </DealHeat>
                      <VoteDivHot>+</VoteDivHot>
                    </DealsHeatContainer>
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
                        <DealsFoundTextSpan>Nov 15th</DealsFoundTextSpan>
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
  font-size: 100%;
  display: grid;
  /* grid-template-rows: 150px 150px; // 1st value 1st row, 2nd value 2nd row */
  grid-template-rows: repeat(5, 1fr);
  /* grid-template-columns: repeat(2, 150px) 1fr; */
  /* grid-template-columns: 50% 1fr 2fr; */
  grid-template-columns: repeat(5, 1fr);
  /* grid-row-gap: 30px; */
  /* grid-column-gap: 40px; */
  grid-gap: 20px;
`;

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
  align-items: center;
  width: 100%;
`;

// **************
// Heat Container
// **************

const DealsHeatContainer = styled.div`
  border: solid 1px var(--medium-grey);
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  flex-shrink: 1;
`;

const DealHeat = styled.span`
  font-size: 2.2rem;
  font-weight: 600;
  border-radius: 3px;
  margin: 0.5rem 0;
  padding: 0;
  line-height: 1;
`;

const VoteDivHot = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.65rem;

  margin: 0.3rem;

  color: var(--red);

  vertical-align: middle;
  line-height: 1.05;
  border-radius: 50px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: var(--red);
  }
`;

const VoteDivCold = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.97rem;

  margin: 0.3rem;

  color: var(--blue);

  vertical-align: middle;
  line-height: 0.87;
  border-radius: 50px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: var(--blue);
  }
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
  margin: 0;

  font-weight: 600;
  font-size: 80%;
  transition: all 0.2s;
  text-decoration: none;

  flex: 0 1 auto;
  overflow: hidden;
`;

const DealFoundImg = styled.img`
  height: 1.5rem;
`;

const DealsFoundTextSpan = styled.p`
  flex: 1 1 auto;
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
    background-image: linear-gradient(rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 1) 100%);
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
  flex: 1 1 auto;
  font-size: 1.1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

// *********
// Read More
// *********

const ReadMoreAnchor = styled(Link)`
  /* width: 40%; */
  flex-shrink: 0;
  flex-grow: 0;
  cursor: pointer;
  color: var(--blue);
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

// ***************
// Price Container
// ***************

const PriceDateFoundFlexContainer = styled.div`
  /* display: flex;
  justify-content: space-between; */
`;

const DealsPriceContainer = styled.div`
  font-size: 1.8rem;
  background-color: white;
  border-radius: 5px;
  padding: 0 1rem;
  margin: 0.5rem 0;

  font-weight: 600;
`;

const DealsPrice = styled.span`
  color: var(--red);
`;

const DealsNextBestPrice = styled.span`
  color: var(--light-grey);
  text-decoration: line-through;
  margin-left: 0.6rem;
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
