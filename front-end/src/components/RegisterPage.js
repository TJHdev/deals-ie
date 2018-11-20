import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Modal from 'react-modal';

// import Button from '../styled-components/Button';

const ModalContainer = styled.div`
  background-color: gray;
  color: white;
  width: 30rem;
  outline: none;
  padding: var(--l-size);
  text-align: center;
`;

const RegisterModal = ({
  isRegisterModal,
  handleCloseRegisterModal,
  switchModal,
  onSubmitRegister
}) => (
  <Modal
    isOpen={isRegisterModal}
    onRequestClose={handleCloseRegisterModal}
    contentLabel="Register Modal"
    closeTimeoutMS={400}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <h2>Join our community</h2>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('E-mail is not valid!')
            .required('E-mail is required!'),
          username: yup
            .string()
            .min(4, 'Must be at least 4 characters long')
            .required('Username is required!'),
          password: yup
            .string()
            .min(6, 'Password has to be longer than 6 characters!')
            .required('Password is required!')
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitRegister(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
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
        Already a member?
      </button>
    </ModalContainer>
  </Modal>
);

RegisterModal.propTypes = {
  isRegisterModal: PropTypes.bool.isRequired,
  handleCloseRegisterModal: PropTypes.func.isRequired,
  switchModal: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired
};

export default RegisterModal;
