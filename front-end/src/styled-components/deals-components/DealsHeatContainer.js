import styled from 'styled-components';

// <DealsHeatContainer>
// <VoteDivCold
//   isLike={isLike}
//   onClick={() => this.onSubmitChangeDealLikeCold(dealId, isLike)}
// >
//   -
// </VoteDivCold>
// <DealHeat dealLikesTotal={dealLikesTotal}>
//   {dealLikesTotal}
//   &#186;
// </DealHeat>
// <VoteDivHot
//   isLike={isLike}
//   onClick={() => this.onSubmitChangeDealLikeHot(dealId, isLike)}
// >
//   +
// </VoteDivHot>
// </DealsHeatContainer>

// **************
// Heat Container
// **************

export const DealsHeatContainer = styled.div`
  border: solid 1px var(--medium-grey);
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  flex-shrink: 1;
`;

export const DealHeat = styled.span`
  font-size: 2.2rem;
  font-weight: 600;
  border-radius: 3px;
  margin: 0.5rem 0;
  padding: 0 0.35rem;
  line-height: 1;

  color: ${props => (Number(props.dealLikesTotal) >= 0 ? 'var(--red)' : 'var(--blue)')};
  /* background-color: ${props => (Number(props.dealLikes) >= 0 ? 'red' : 'blue')}; */
`;

export const VoteDivHot = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.65rem;

  margin: 0.3rem;

  color: ${props => (props.isLike === true ? 'white' : 'var(--red)')};
  background-color: ${props => (props.isLike === true ? 'var(--red)' : 'white')};

  vertical-align: middle;
  line-height: 1.05;
  border-radius: 5px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: ${props => (props.isLike === true ? 'red' : 'var(--red)')};
  }
`;

export const VoteDivCold = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;

  height: 3rem;
  width: 3rem;
  padding-left: 0.97rem;

  margin: 0.3rem;

  color: ${props => (props.isLike === false ? 'white' : 'var(--blue)')};
  background-color: ${props => (props.isLike === false ? 'var(--blue)' : 'white')};

  vertical-align: middle;
  line-height: 0.87;
  border-radius: 5px;

  transition: background-color 0.4s;

  &:hover {
    color: white;
    background-color: ${props => (props.isLike === false ? 'blue' : 'var(--blue)')};
  }
`;
