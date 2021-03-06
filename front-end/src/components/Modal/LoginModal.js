import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Link } from '@reach/router';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { TextField, StyledErrorMessage } from '../../styled-components/FormikStyles';
import Label from '../../styled-components/Label';
import {
  Button,
  SmallBackgroundButton,
  BackgroundButton,
  SignUpHighlightSpan,
  StyledLink
} from '../../styled-components/Button';
import TitleContainer from '../../styled-components/TitleContainer';
import ModalContainer from '../../styled-components/ModalContainer';
import Modal from '../../styled-components/Modal';
import CentralDiv from '../../styled-components/CentralDiv';
import { CelticHeader2 } from '../../styled-components/CelticHeaders';

// context api
import { ModalConsumer } from './ModalContext';
import RegisterModal from './RegisterModal';

const LoginModal = ({ onRequestClose, onSubmitLogin }) => (
  <Modal
    isOpen
    onRequestClose={onRequestClose}
    contentLabel="Login Modal"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <TitleContainer>
        <CelticHeader2>Login</CelticHeader2>
        <h5>Vote, share and comment to earn points!</h5>
      </TitleContainer>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
          password: yup
            .string()
            // .min(8, 'Password must be at least 8 characters long!') // removed for easy login during development
            .required('Password is required!')
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onSubmitLogin(values, setErrors, setSubmitting);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Label htmlFor="email">
              <TextField
                type="text"
                name="email"
                placeholder="Enter your email"
                autoComplete="off"
              />
              <StyledErrorMessage name="email" component="div" />
            </Label>

            <Label htmlFor="password">
              <TextField
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
              />
              <StyledErrorMessage name="password" component="div" />
            </Label>
            <Button type="submit" disabled={isSubmitting}>
              Sign in
            </Button>
            <StyledLink to="/password-request" onClick={onRequestClose}>
              <SmallBackgroundButton type="button">Forgot Password?</SmallBackgroundButton>
            </StyledLink>
            <StyledLink to="/complete-signup-request" onClick={onRequestClose}>
              <SmallBackgroundButton type="button">Resend verification email</SmallBackgroundButton>
            </StyledLink>
          </Form>
        )}
      </Formik>
      <hr />
      <CentralDiv>
        <ModalConsumer>
          {({ showModal }) => (
            <BackgroundButton type="button" onClick={() => showModal(RegisterModal)}>
              Not joined yet?
              <SignUpHighlightSpan> Sign up</SignUpHighlightSpan>
            </BackgroundButton>
          )}
        </ModalConsumer>
      </CentralDiv>
    </ModalContainer>
  </Modal>
);

LoginModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired
};

export default LoginModal;

// import Button from '../styled-components/Button';

// const LoginLayout = styled.div`
//   background: url('/images/bg.jpg');
//   background-size: cover;

//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   height: 100vh;
//   width: 100vw;
// `;

// const LoginLayoutBox = styled.div`
//   background: rgba(255, 255, 255, 0.8);
//   border-radius: 3px;
//   text-align: center;
//   width: 30rem;
//   padding: var(--l-size) var(--m-size);
// `;

// export default () => (
//   <LoginLayout>
//     <LoginLayoutBox>
//       <Button>Login with Google</Button>
//       <hr />
//       <Link to="register">
//         <button type="button">Not joined yet? Sign up</button>
//       </Link>
//     </LoginLayoutBox>
//   </LoginLayout>
// );
