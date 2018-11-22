import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import { StyledField, StyledErrorMessage } from '../styled-components/FormikStyles';
import Label from '../styled-components/Label';
import ContentContainer from '../styled-components/ContentContainer';

const ErrorSpan = styled.span`
  margin-left: 2rem;
  color: red;
`;

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
        initialValues={{}}
        validationSchema={yup.object().shape({
          deal_link: yup.string(),
          price: yup.number().positive(),
          next_best_price: yup.number().positive(),
          image_url: yup.string(),
          camel_url: yup.string(),
          deal_starts: yup.date().default(() => new Date()),
          deal_ends: yup.date(),
          shipping_from: yup.string(),
          offline_deal: yup.bool().required(),
          deal_NSFW: yup.bool().required(),
          deal_title: yup
            .string()
            .required()
            .max(140),
          deal_text: yup
            .string()
            .required()
            .max(1000)
        })}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitDeal(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Label htmlFor="deal_link">
              Deal Link
              <StyledErrorMessage name="deal_link" component="span" />
              <StyledField type="text" name="deal_link" />
            </Label>

            <Label htmlFor="price">
              Price (&euro;)
              <StyledErrorMessage name="price" component="span" />
              <StyledField type="text" name="price" />
            </Label>

            <Label htmlFor="next_best_price">
              Next best price (&euro;)
              <StyledErrorMessage name="next_best_price" component="span" />
              <StyledField type="text" name="next_best_price" />
            </Label>

            <Label htmlFor="deal_title">
              Title
              {errors.deal_title && touched.deal_title ? (
                <ErrorSpan>Title is required</ErrorSpan>
              ) : null}
              <StyledField
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
              <StyledErrorMessage name="deal_text" component="ErrorSpan">
                This is an error message
              </StyledErrorMessage>
              <StyledField
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
              <StyledField type="text" name="image_url" />
            </Label>

            <Label htmlFor="deal_starts">
              Deal starts
              <StyledErrorMessage name="deal_starts" component="span" />
              <StyledField type="date" name="deal_starts" />
            </Label>

            <Label htmlFor="deal_ends">
              Deal expires
              <StyledErrorMessage name="deal_ends" component="span" />
              <StyledField type="date" name="deal_ends" />
            </Label>

            <Label htmlFor="offline_deal">
              Local deal (instore / offline)
              <StyledErrorMessage name="offline_deal" component="span" />
              <StyledField type="checkbox" name="offline_deal" />
            </Label>

            <Label htmlFor="deal_NSFW">
              NSFW deal
              <StyledErrorMessage name="deal_NSFW" component="span" />
              <StyledField type="checkbox" name="deal_NSFW" />
            </Label>

            <button style={{ display: 'block' }} type="submit" disabled={isSubmitting}>
              Submit
            </button>
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
