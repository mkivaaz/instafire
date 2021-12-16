import '../CSS/userLogin.css'
import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';


function UserLogin() {

    let navigate = useNavigate();

    const initialValues = {
        firstName: "",
        lastname: "",
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        // Enter Schema Here
        // firstName: Yup.string().required('Required'),
        // lastName: Yup.string().required('Required'),
        // email: Yup.string().email('Must be a valid email').required('Required'),
        // password: Yup.string().required('Required')
 
    })

    const onSubmit = () =>{
       navigate('/home');
        
    }

    const renderError = (message) =>{
        <p className='error-msg'>{message}</p>
    }

    return (
            <div className='form-body'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {formik => (
                        <Form className='form'> 
                            <div className='con'>
                                <header className='header'>
                                    <h2>Sign Up</h2>
                                    <p>Sign up here to create an account</p>
                                </header><br/>
                            </div>  

                            <div className='field-set'>
                                <span className='input-item'>
                                    <input className='form-input' type="text" id='firstName' name='firstName' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.firstName} placeholder=" Enter you first name here"/><br/>                            </span>
                                <span className='input-item'>                                
                                    <input className='form-input' type="text" id='lastname' name='lastname' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.lastname} placeholder='Enter your last name here'/><br/>
                                    {formik.errors.lastname && <><div>{formik.errors.lastname}</div><br/></>}
                                </span>
                                <span className='input-item'>                                
                                    <input className='form-input' type="email" id='email' name='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} placeholder='Enter your email here'/><br/>
                                </span>
                                <span className='input-item'>                                
                                    <input className='form-input' type="text" id='password' name='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} placeholder='Enter your password here'/><br/>
                                </span>

                                <button className='sign-up' type='submit'>Submit</button>
                            </div>                      
                        </Form>
                    )}
                </Formik>
            </div>
            
  
    );
}

export default UserLogin
