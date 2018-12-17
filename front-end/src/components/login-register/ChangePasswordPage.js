import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import format from 'date-fns/format';

import {
  TextField,
  TextareaField,
  NumericField,
  CheckboxField,
  StyledErrorMessage,
  ErrorSpan
} from '../../styled-components/FormikStyles';
import {
  RadioContainer,
  RadioGroup,
  RadioInput,
  RadioLabel,
  RadioButton
} from '../../styled-components/Radio';
import Label from '../../styled-components/Label';
import { ContentContainerPasswordForm } from '../../styled-components/ContentContainer';
import { Button } from '../../styled-components/Button';

class PasswordChangePage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);

    this.state = {
      displayVerified: false
    };
  }

  onSubmitPassword(values, setSubmitting, setErrors) {
    setSubmitting(true);
    const { location, history } = this.props;

    const index = location.search.indexOf('=');

    const token = location.search.substring(index + 1);
    console.log('token: ', token);

    fetch(`${window.BACKEND_PATH}/profile/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
        new_password: values.new_password,
        repeat_password: values.repeat_password
      })
    })
      .then(response => response.json())
      .then(data => {
        setSubmitting(false);
        if (data.email) {
          this.setState({ displayVerified: true });
        } else {
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ displayVerified: false });
        setSubmitting(false);
      });
  }

  render() {
    return (
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

            repeat_password: yup
              .string()
              .min(8, 'Password has to be longer than 8 characters!')
              .oneOf([yup.ref('new_password'), null], 'Passwords fields must match!')
              .required('Password is required!')
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
                  <StyledErrorMessage name="new_password" component="span" />
                  <TextField
                    autoComplete="off"
                    type="password"
                    name="new_password"
                    placeholder="Please enter new password"
                  />
                </Label>
                <Label htmlFor="repeat_password">
                  Repeat Password
                  <StyledErrorMessage name="repeat_password" component="span" />
                  <TextField
                    autoComplete="off"
                    type="password"
                    name="repeat_password"
                    placeholder="Please repeat new password"
                  />
                </Label>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </ContentContainerPasswordForm>
    );
  }
}

export default withRouter(PasswordChangePage);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>
