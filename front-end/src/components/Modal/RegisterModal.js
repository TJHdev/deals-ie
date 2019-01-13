import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { TextField, StyledErrorMessage } from '../../styled-components/FormikStyles';
import Label from '../../styled-components/Label';
import { Button, BackgroundButton, SignUpHighlightSpan } from '../../styled-components/Button';
import TitleContainer from '../../styled-components/TitleContainer';
import ModalContainer from '../../styled-components/ModalContainer';
import Modal from '../../styled-components/Modal';
import CentralDiv from '../../styled-components/CentralDiv';
import { CelticHeader2 } from '../../styled-components/CelticHeaders';

// context api
import { ModalConsumer } from './ModalContext';
import LoginModal from './LoginModal';

const RegisterModal = ({ onRequestClose, onSubmitRegister }) => (
  <Modal
    isOpen
    onRequestClose={onRequestClose}
    contentLabel="Register Modal"
    closeTimeoutMS={200}
    className="modal"
    ariaHideApp={false}
  >
    <ModalContainer>
      <TitleContainer>
        <CelticHeader2>Join our community</CelticHeader2>
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
          onSubmitRegister(values, setErrors, setSubmitting);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Label htmlFor="email">
              <TextField type="email" name="email" placeholder="Email address" autoComplete="off" />
              <StyledErrorMessage name="email" component="div" />
            </Label>

            <Label htmlFor="username">
              <TextField type="text" name="username" placeholder="Username" autoComplete="off" />
              <StyledErrorMessage name="username" component="div" />
            </Label>

            <Label htmlFor="password">
              <TextField
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
        <ModalConsumer>
          {({ showModal }) => (
            <BackgroundButton type="button" onClick={() => showModal(LoginModal)}>
              Already a member?
              <SignUpHighlightSpan> Login</SignUpHighlightSpan>
            </BackgroundButton>
          )}
        </ModalConsumer>
      </CentralDiv>
    </ModalContainer>
  </Modal>
);

RegisterModal.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired
};

export default RegisterModal;
