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

class EmailVerificationRequestPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  onSubmitEmail(values) {
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
        <h2>Resend Register Email</h2>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('E-mail is not valid!')
              .required('E-mail is required!')
          })}
          onSubmit={(values, { setSubmitting }) => {
            this.onSubmitEmail(values);
            setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => {
            console.log(errors);
            console.log(touched);
            return (
              <Form>
                <Label htmlFor="email">
                  Email
                  <StyledErrorMessage name="email" component="span" />
                  <TextField
                    autoComplete="off"
                    type="text"
                    name="email"
                    placeholder="Please enter your email address"
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

export default withRouter(EmailVerificationRequestPage);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>