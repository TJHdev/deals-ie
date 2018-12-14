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

  onSubmitPassword(values) {
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
        password: password
      })
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
    return (
      <ContentContainerPasswordForm>
        <h2>Change Password</h2>
        <Formik
          initialValues={{
            password: ''
          }}
          validationSchema={yup.object().shape({
            new_password: yup
              .string()
              .min(8, 'Password has to be longer than 8 characters!')
              .required('Password is required!')
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.onSubmitPassword(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => {
            console.log(errors);
            console.log(touched);
            return (
              <Form>
                <Label htmlFor="new-password">
                  New Password
                  <StyledErrorMessage name="new-password" component="span" />
                  <TextField
                    autoComplete="off"
                    type="text"
                    name="new-password"
                    placeholder="Please enter new password"
                  />
                </Label>
                <Label htmlFor="repeat-password">
                  Repeat Password
                  <StyledErrorMessage name="repeat-password" component="span" />
                  <TextField
                    autoComplete="off"
                    type="text"
                    name="repeat-password"
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
