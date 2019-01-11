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

  onSubmitEmail(values, setSubmitting, resetForm, setFieldValue, setStatus) {
    // const token = window.sessionStorage.getItem('token');
    setSubmitting(true);
    fetch(`${window.BACKEND_PATH}/profile/request-verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        // console.log('data: ', data);
        console.log('values: ', values);
        // if (data && data.deal_title) {
        //   // loadUser(user);
        //   history.push(`/deals/${data.id}`);
        // }
        resetForm();
        setSubmitting(false);
        setStatus({ success: 'Success: Check your inbox for a reset link!' });
        setFieldValue('email', '', false);
      })
      .catch(err => {
        resetForm();
        setSubmitting(false);
        setStatus({ success: 'Success: Check your inbox for a reset link!' });
        setFieldValue('email', '', false);
      });
  }

  render() {
    return (
      <ContentContainerPasswordForm>
        <CheckEmailContainer>
          <h2>Please check your email</h2>
          <SmallList>
            <li>
              <SmallListText> Click on the verify link provided in that email</SmallListText>
            </li>
            <li>
              <SmallListText>
                {' '}
                If you did not recieve an email please make sure to check your spam folder
              </SmallListText>
            </li>
            <li>
              <SmallListText>
                If there is still no sign of the email, you can request another using the form below
              </SmallListText>
            </li>
          </SmallList>
        </CheckEmailContainer>
        <h2>Request another email</h2>
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
          onSubmit={(values, actions) => {
            this.onSubmitEmail(
              values,
              actions.setSubmitting,
              actions.resetForm,
              actions.setFieldValue,
              actions.setStatus
            );
          }}
        >
          {props => {
            console.log(props.errors);
            console.log(props.touched);
            console.log(props.status);
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
                {props.status && props.status.success ? (
                  <SuccessNotification>{props.status.success}</SuccessNotification>
                ) : null}
                <Button type="submit" disabled={props.isSubmitting}>
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

const CheckEmailContainer = styled.div`
  margin: 5rem 0;
`;

const SmallList = styled.ul`
  margin-left: 1.8rem;
  /* list-style-position: inside; */
`;

const SmallListText = styled.p`
  font-size: 1.3rem;
`;

const SuccessNotification = styled.div`
  color: var(--green);
  font-size: 1.3rem;
`;

export default withRouter(EmailVerificationRequestPage);

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>
