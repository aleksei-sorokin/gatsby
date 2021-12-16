import * as React from 'react'
import { Formik, Form } from 'formik'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const Contact = () => {
  return (
    <Formik
      initialValues={{
        'bot-field': '',
        'form-name': 'contact',
        message: '',
      }}
      onSubmit={(values) => {
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': 'formik',
            ...values,
          }),
        })
          .then((succ) => console.log('succ', succ))
          .catch((error) => console.log(error))
      }}
      render={({ handleChange, values }) => (
        <Form
          name="contact"
          method="post"
          data-netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="text"
            name="message"
            value={`${values.firstName}`}
            onChange={handleChange}
            label="Name"
          />
          <button title="Submit" type="submit" >send</button>
        </Form>
      )}
    />
  )
}
export default Contact