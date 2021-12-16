import * as React from 'react';
import { useFormik } from 'formik'

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      'bot-field': '',
      'form-name': 'contact',
      message: '',
    },
    onSubmit: (values) => {
      console.log('values', values);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'formik',
          ...values,
        }),
      })
        .then((succ) => console.log('succ', succ))
        .catch((error) => console.log(error));
    },
  });

  return (
    <form name='contact' method='post' data-netlify-honeypot='bot-field' data-netlify='true' onSubmit={formik.handleSubmit}>
      <input type='hidden' name='form-name' value='contact' />
      <input type='text' name='message' value={formik.values.message} onChange={formik.handleChange} label='Name' />
      <button title='Submit' type='submit'>
        send
      </button>
    </form>
  );
};
export default Contact;
