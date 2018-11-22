import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import format from 'date-fns/format';

import {
  TextField,
  TextareaField,
  CurrencyField,
  CheckboxField,
  StyledErrorMessage,
  ErrorSpan
} from '../styled-components/FormikStyles';
import {
  RadioContainer,
  RadioGroup,
  RadioInput,
  RadioLabel,
  RadioButton
} from '../styled-components/Radio';
import Label from '../styled-components/Label';
import ContentContainer, { ContentContainerHalf } from '../styled-components/ContentContainer';
import { Button } from '../styled-components/Button';

export default () => {
  const onSubmitDeal = values => {
    fetch(`${window.BACKEND_PATH}/deals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // if (data && data.name) {
        //   // loadUser(user);
        //   history.push('/');
        // }
      })
      .catch(console.log);
  };

  return (
    <ContentContainer>
      <h2>Submit a new deal</h2>
      <Formik
        initialValues={{
          deal_link: '',
          currency_pound: false,
          price: '',
          next_best_price: '',
          deal_title: '',
          deal_text: '',
          image_url: '',
          camel_url: '',
          deal_starts: format(new Date(), 'YYYY-MM-DD'),
          deal_ends: '',
          shipping_from: '',
          offline_deal: false,
          deal_NSFW: false
        }}
        // validationSchema={yup.object().shape({
        //   deal_link: yup.string(),
        //   currency_pound: yup.bool().required(),
        //   price: yup.number().positive(),
        //   next_best_price: yup.number().positive(),
        //   image_url: yup.string(),
        //   camel_url: yup.string(),
        //   deal_starts: yup.date().default(() => new Date()),
        //   deal_ends: yup.date(),
        //   shipping_from: yup.string(),
        //   offline_deal: yup.bool().required(),
        //   deal_NSFW: yup.bool().required(),
        //   deal_title: yup
        //     .string()
        //     .required()
        //     .max(140),
        //   deal_text: yup
        //     .string()
        //     .required()
        //     .max(1000)
        // })}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submit has been called');
          onSubmitDeal(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Label htmlFor="deal_link">
              Deal Link
              <StyledErrorMessage name="deal_link" component="span" />
              <TextField autoComplete="off" type="text" name="deal_link" />
            </Label>

            <Label htmlFor="currency_pound">
              <div>
                Currency
                <RadioContainer>
                  <RadioGroup>
                    <RadioInput
                      type="radio"
                      id="euro"
                      name="currency_pound"
                      value="true"
                      defaultChecked
                    />
                    <RadioLabel htmlFor="euro">
                      <RadioButton />
                      &euro;
                    </RadioLabel>
                  </RadioGroup>
                  <RadioGroup>
                    <RadioInput type="radio" id="pound" name="currency_pound" value="false" />
                    <RadioLabel htmlFor="pound">
                      <RadioButton />
                      &pound;
                    </RadioLabel>
                  </RadioGroup>
                </RadioContainer>
              </div>
            </Label>

            <Label htmlFor="price">
              Price
              <StyledErrorMessage name="price" component="span" />
              <CurrencyField autoComplete="off" type="text" name="price" placeholder="9.99" />
            </Label>

            <Label htmlFor="next_best_price">
              Next best price
              <StyledErrorMessage name="next_best_price" component="span" />
              <CurrencyField
                autoComplete="off"
                type="text"
                name="next_best_price"
                placeholder="15.99"
              />
            </Label>

            <Label htmlFor="deal_title">
              Title
              {errors.deal_title && touched.deal_title ? (
                <ErrorSpan>Title is required</ErrorSpan>
              ) : null}
              <TextField
                autoComplete="off"
                type="text"
                name="deal_title"
                placeholder="Please enter a short description of the deal"
              />
            </Label>

            <Label htmlFor="deal_text">
              Description
              {errors.deal_text && touched.deal_text ? (
                <ErrorSpan>Description is required</ErrorSpan>
              ) : null}
              <StyledErrorMessage name="deal_text" component="span">
                This is an error message
              </StyledErrorMessage>
              <TextareaField
                row="4"
                column="30"
                component="textarea"
                name="deal_text"
                placeholder="Enter your description of the deal here"
              />
            </Label>

            <Label htmlFor="image_url">
              Image Url
              <StyledErrorMessage name="image_url" component="span" />
              <TextField autoComplete="off" type="text" name="image_url" />
            </Label>

            <Label htmlFor="deal_starts">
              Deal starts
              <StyledErrorMessage name="deal_starts" component="span" />
              <TextField type="date" name="deal_starts" />
            </Label>

            <Label htmlFor="deal_ends">
              Deal expires
              <StyledErrorMessage name="deal_ends" component="span" />
              <TextField type="date" name="deal_ends" />
            </Label>

            <Label htmlFor="offline_deal">
              <CheckboxField type="checkbox" name="offline_deal" value="false" />
              Local deal (instore / offline)
              <StyledErrorMessage name="offline_deal" component="span" />
            </Label>

            <Label htmlFor="deal_NSFW">
              <CheckboxField type="checkbox" name="deal_NSFW" value="false" />
              NSFW deal
              <StyledErrorMessage name="deal_NSFW" component="span" />
            </Label>

            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </ContentContainer>
  );
};

// <NavLink to="/create" activeClassName="is-active">Create expense</NavLink>
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>

// <Label htmlFor="camel_url">
//   camelcamelcamel graph Url
//   <StyledErrorMessage name="camel_url" component="span" />
//   <StyledField type="text" name="camel_url" />
// </Label>
