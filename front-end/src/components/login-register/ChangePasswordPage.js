import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import format from 'date-fns/format';

import { TextField, StyledErrorMessage } from '../../styled-components/FormikStyles';

import Label from '../../styled-components/Label';
import { ContentContainerPasswordForm } from '../../styled-components/ContentContainer';
import { Button } from '../../styled-components/Button';

import { ModalConsumer } from '../Modal/ModalContext';
import LoginModal from '../Modal/LoginModal';

class PasswordChangePage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);

    this.state = {
      displayVerified: false
    };
  }

  onSubmitPassword(values, setSubmitting, setErrors) {
    setSubmitting(true);
    const { location } = this.props;

    const index = location.search.indexOf('=');

    const token = location.search.substring(index + 1);
    console.log('token: ', token);

    fetch(`${window.BACKEND_PATH}/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        new_password: values.new_password,
        repeat_password: values.repeat_password
      })
    })
      .then(response => response.json())
      .then(data => {
        setSubmitting(false);
        if (data.email) {
          this.setState({ displayVerified: true });
        }
        if (data.error) {
          setErrors(data.error);
        }
      })
      .catch(err => {
        console.log(err);
        // this.setState({ displayVerified: false });
        setSubmitting(false);
      });
  }

  render() {
    const { displayVerified } = this.state;
    return (
      <Fragment>
        {displayVerified ? (
          <ContentContainerPasswordForm>
            <h2>Password changed success!</h2>
            <ModalConsumer>
              {({ showModal }) => (
                <Button type="button" onClick={() => showModal(LoginModal)}>
                  Login page
                </Button>
              )}
            </ModalConsumer>
          </ContentContainerPasswordForm>
        ) : (
          <ContentContainerPasswordForm>
            <h2>Change Password</h2>
            <Formik
              initialValues={{
                new_password: '',
                repeat_password: ''
              }}
              validationSchema={yup.object().shape({
                new_password: yup
                  .string()
                  .min(8, 'Password has to be longer than 8 characters!')
                  .required('Password is required!'),

                repeat_password: yup.string().required('Confirming password field is required!')
                // .oneOf([yup.ref('new_password')], 'Passwords fields must match!')
              })}
              onSubmit={(values, { setSubmitting, setErrors }) => {
                this.onSubmitPassword(values, setSubmitting, setErrors);
              }}
            >
              {({ errors, touched, isSubmitting }) => {
                console.log(errors);
                console.log(touched);
                return (
                  <Form>
                    <Label htmlFor="new_password">
                      New Password
                      <TextField
                        autoComplete="off"
                        type="password"
                        name="new_password"
                        placeholder="Please enter new password"
                      />
                      <StyledErrorMessage name="new_password" component="span" />
                    </Label>
                    <Label htmlFor="repeat_password">
                      Confirm Password
                      <TextField
                        autoComplete="off"
                        type="password"
                        name="repeat_password"
                        placeholder="Please repeat new password"
                      />
                      <StyledErrorMessage name="repeat_password" component="span" />
                    </Label>
                    <Button type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </ContentContainerPasswordForm>
        )}
      </Fragment>
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

export default withRouter(PasswordChangePage);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>
