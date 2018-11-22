import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { StyledField, StyledErrorMessage } from '../styled-components/FormikStyles';
import Label from '../styled-components/Label';
import { Button, BackgroundButton } from '../styled-components/Button';
import TitleContainer from '../styled-components/TitleContainer';
import ModalContainer from '../styled-components/ModalContainer';
import Modal from '../styled-components/Modal';
import CentralDiv from '../styled-components/CentralDiv';

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
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <TitleContainer>
        <h2>Join our community</h2>
        <h5>Get deals found, shared and rated by real people.</h5>
      </TitleContainer>
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
            .min(8, 'Password has to be longer than 8 characters!')
            .required('Password is required!')
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          onSubmitRegister(values, setErrors);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Label htmlFor="email">
              <StyledField
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="off"
              />
              <StyledErrorMessage name="email" component="div" />
            </Label>

            <Label htmlFor="username">
              <StyledField type="text" name="username" placeholder="Username" autoComplete="off" />
              <StyledErrorMessage name="username" component="div" />
            </Label>

            <Label htmlFor="password">
              <StyledField
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
              />
              <StyledErrorMessage name="password" component="div" />
            </Label>

            <Button type="submit" disabled={isSubmitting}>
              Sign up!
            </Button>
          </Form>
        )}
      </Formik>
      <hr />
      <CentralDiv>
        <BackgroundButton onClick={switchModal}>Already a member? Login</BackgroundButton>
      </CentralDiv>
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
