import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';

import { StyledField, StyledErrorMessage } from '../styled-components/FormikStyles';
import Label from '../styled-components/Label';
// import Button from '../styled-components/Button';

const ModalContainer = styled.div`
  background-color: gray;
  color: white;
  width: 30rem;
  outline: none;
  padding: var(--l-size);
  text-align: center;
`;

const LoginModal = ({ isLoginModal, handleCloseLoginModal, switchModal, onSubmitLogin }) => (
  <Modal
    isOpen={isLoginModal}
    onRequestClose={handleCloseLoginModal}
    contentLabel="Login Modal"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <h2>Login Vote, share and comment to earn points!</h2>
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
          onSubmitLogin(values, setErrors);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Label htmlFor="email">
              Email
              <StyledErrorMessage name="email" component="div" />
              <StyledField type="text" name="email" placeholder="Enter your email" />
            </Label>

            <Label htmlFor="password">
              Password
              <StyledErrorMessage name="password" component="div" />
              <StyledField type="password" name="password" placeholder="Enter your password" />
            </Label>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <hr />
      <button onClick={switchModal} type="button">
        Not already a member?
      </button>
    </ModalContainer>
  </Modal>
);

LoginModal.propTypes = {
  isLoginModal: PropTypes.bool.isRequired,
  handleCloseLoginModal: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
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
