import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';

import Button from '../styled-components/Button';

const ModalContainer = styled.div`
  background-color: greenyellow;
  color: white;
  width: 30rem;
  outline: none;
  padding: var(--l-size);
  text-align: center;
`;

const LoginModal = ({ isLoginModal, handleCloseLoginModal, switchModal }) => (
  <Modal
    isOpen={isLoginModal}
    onRequestClose={handleCloseLoginModal}
    contentLabel="Confirm Remove Expense"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <Button>Login with Google</Button>
      <p>or</p>
      <hr />
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
          password: yup
            .string()
            .min(6, 'Password has to be longer than 6 characters!')
            .required('Password is required!')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>test</div>
            <Field type="text" name="username" />
            <ErrorMessage name="username" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
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
  switchModal: PropTypes.func.isRequired
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
