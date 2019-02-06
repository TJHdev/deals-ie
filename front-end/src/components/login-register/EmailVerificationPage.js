import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter, Link } from 'react-router-dom';
import { Link } from '@reach/router';
import styled from 'styled-components';
// import { Formik, Form } from 'formik';
// import * as yup from 'yup';
// import format from 'date-fns/format';

// context api test
import { ModalConsumer } from '../Modal/ModalContext';
import LoginModal from '../Modal/LoginModal';

// import Label from '../../styled-components/Label';
import { ContentContainerPasswordForm } from '../../styled-components/ContentContainer';
import { Button } from '../../styled-components/Button';

class EmailVerificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayVerified: false
    };
  }

  componentDidMount() {
    const { location } = this.props;

    const index = location.search.indexOf('=');

    const token = location.search.substring(index + 1);
    console.log('token: ', token);

    fetch(`${window.BACKEND_PATH}/profile/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
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
              <ModalConsumer>
                {({ showModal }) => (
                  <Button type="button" onClick={() => showModal(LoginModal)}>
                    Login page
                  </Button>
                )}
              </ModalConsumer>
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

export default EmailVerificationPage;
