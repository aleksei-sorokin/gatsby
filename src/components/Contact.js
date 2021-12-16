import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ApplyFormFormik = ({ data }) => {
  const [validationFlag, setValidationFlag] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const formik = useFormik({
    initialValues: {
      'bot-field': '',
      'form-name': 'resume',
      job_position: 'great position',
      first_name: 'qwe',
      last_name: 'qwe',
      phone: '123123123',
      email: 'qwe@we.we',
      resume_file: [],
    },
    onSubmit: (values) => {
      sendForm(values);
    },
  });

  const handleAddingFile = (event) => {
    const files = event.target.files;
    let myFiles = Array.from(files);
    if (myFiles.length && myFiles[0]) {
      const allowedExtensions = ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'];
      const size = myFiles[0].size / 1024 / 1024 < 5;
      const format = myFiles[0].name.split('.').pop();
      if (size && allowedExtensions.includes(format)) {
        setResumeName(myFiles[0].name);
        formik.setFieldValue('resume_file', myFiles[0]);
      }
    }
  };

  const sendForm = (data) => {
    console.log('send form');
    const formData = new FormData();
    data.last_name = data.first_name;
    
    for (let i in data) {
      if (i !== 'bot-field' && i !== 'form-name') {
        formData.append(`job_application[${i}]`, data[i]);
      } 
      // else {
      //   formData.append(i, data[i]);
      // }
    }

    formData.append('token', process.env.FORM_TOKEN);

    axios
      .post(`/`, encode({'form-name': 'resume', ...formData}), {
        headers: {
          //Authorization: `Basic ${process.env.HEADER_TOKEN}`,
        },
        // auth: {
        //   username: 'anahoret',
        //   password: 'epyfnm'
        // }
      })
      .then((res) => {
        if (res && res.status === 200) {
          formik.resetForm();
          setResumeName('');
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  return (
    <div>
      <div>
        <div>
          <form name='resume' method='POST' netlify-honeypot='bot-field' data-netlify='true' onSubmit={formik.handleSubmit}>
            <p style={{display: 'none'}}>
              <label>
                Don’t fill this out if you’re human: <input name='bot-field'  onChange={formik.handleChange} value={formik.values['bot-field']}/>
              </label>
            </p>
            <div>
              <div>
                <input id='first_name' type='text' name='first_name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.first_name} />
              </div>
              <div className='InputGroup-label'>
                <label htmlFor='name'>Name:</label>
              </div>
            </div>

            <div>
              <div>
                <input id='phone' type='text' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
              </div>
              <div className='InputGroup-label'>
                <label htmlFor='phone'>Phone:</label>
              </div>
            </div>

            <div>
              <div>
                <input id='emeil' type='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
              </div>
              <div className='InputGroup-label'>
                <label htmlFor='email'>Email:</label>
              </div>
            </div>

            <div>
              <label htmlFor='resumeField'>
                <span>{resumeName ? resumeName : 'Attach a resume'}</span>
              </label>
              <div>
                <input data-size='5000' accept='.png, .jpg, .jpeg, .pdf, .doc, .docx' className='jsFileInput' type='file' name='resumeField' id='resumeField' onChange={(e) => handleAddingFile(e)} />
              </div>
            </div>
            <button disabled={formik.isSubmitting} type='submit' onClick={() => setValidationFlag(Object.values(formik.errors).find((key) => key === true))}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyFormFormik;
