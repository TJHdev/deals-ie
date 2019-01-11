import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
// import { Formik, Form } from 'formik';
// import * as yup from 'yup';
// import format from 'date-fns/format';

import Label from '../../styled-components/Label';
import { ContentContainerPasswordForm } from '../../styled-components/ContentContainer';
import { Button } from '../../styled-components/Button';

class EmailVerificationPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      displayVerified: false
    };
    // this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  componentDidMount() {
    const { location, history } = this.props;

    const index = location.search.indexOf('=');

    const token = location.search.substring(index + 1);
    console.log('token: ', token);

    fetch(`${window.BACKEND_PATH}/profile/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.setState({ displayVerified: true });
        } else {
          this.setState({ displayVerified: false });
        }
      })
      .catch(console.log);
  }

  render() {
    console.log(this.state);
    const { displayVerified } = this.state;
    return (
      <div>
        {displayVerified ? (
          <ContentContainerPasswordForm>
            <CheckEmailContainer>
              <h2>Email Verified Success!</h2>
              <SmallListText>Thank you for verifying your email address.</SmallListText>
              <SmallListText>Click below to login.</SmallListText>
              <Button type="submit">Login page</Button>
            </CheckEmailContainer>
          </ContentContainerPasswordForm>
        ) : (
          <ContentContainerPasswordForm>
            <CheckEmailContainer>
              <h2>Verify email failed..</h2>
              <SmallListText>The token provided is not valid or has expired.</SmallListText>
              <SmallListText>
                Click the button below to request another verification email.
              </SmallListText>
              <Link to="/complete-signup-request">
                <Button type="submit">Request another email</Button>
              </Link>
            </CheckEmailContainer>
          </ContentContainerPasswordForm>
        )}
      </div>
    );
  }
}

const CheckEmailContainer = styled.div`
  margin: 5rem 0;
`;

const SmallList = styled.ul`
  margin-left: 1.8rem;
  /* list-style-position: inside; */
`;

const SmallListText = styled.p`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

export default withRouter(EmailVerificationPage);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>

// <CheckEmailContainer>
// <h2>Please check your email</h2>
// <SmallList>
//   <li>
//     <SmallListText> Click on the verify link provided in that email</SmallListText>
//   </li>
//   <li>
//     <SmallListText>
//       {' '}
//       If you did not recieve an email please make sure to check your spam folder
//     </SmallListText>
//   </li>
//   <li>
//     <SmallListText>
//       If there is still no sign of the email, you can request another using the form
//       below
//     </SmallListText>
//   </li>
// </SmallList>
// </CheckEmailContainer>
