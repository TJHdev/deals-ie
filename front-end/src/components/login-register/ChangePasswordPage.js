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
    this.onSubmitDeal = this.onSubmitPassword.bind(this);
  }

  onSubmitPassword(values) {
    // const token = window.sessionStorage.getItem('token');

    fetch(`${window.BACKEND_PATH}/deals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.deal_title) {
          // loadUser(user);
          history.push(`/deals/${data.id}`); // .push is not a function?
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
