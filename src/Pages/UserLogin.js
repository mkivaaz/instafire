import '../CSS/userLogin.css'
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import InputCus from '../Component/InputCus';
import { useSelector, useDispatch  } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Redux/reduxIndex';
import { createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import Alert from '../Component/Alert';
import { storeUser } from '../Hooks/useStorage';

function UserLogin() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [validationSchema, setValidationSchema] = useState(Yup.object());
    const [finalValues, setFinalValues] = useState(null);
    const [message, setMessage] = useState(null);

    const state = useSelector((state) => state);
    const dispatch = useDispatch()
    const {actSignUp, actLogin} = bindActionCreators(actionCreators, dispatch);
    
    if(auth.currentUser){
        console.log(auth)

        navigate('./home')
    }

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    const signUpSchema = {
        firstName: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required'),
        lastName: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required'),
        email: Yup.string().email('Must be a valid email').required('Required'),
        password: Yup.string().required('Required')
    }

    const loginSchema = {
        email: Yup.string().email('Must be a valid email').required('Required'),
        password: Yup.string().required('Required')
    }

    const handleToggle = () =>{
        setToggle(!toggle)
        if(toggle){
            setValidationSchema(Yup.object().shape(signUpSchema))
        }else{
            setValidationSchema(Yup.object().shape(loginSchema))
        }
    }

    const signIn = async (values,data) =>{
        const {email, password} = values; 
        try{
            const user =  await createUserWithEmailAndPassword(auth, email, password);
            console.log("User:",values)
            storeUser(data)
            navigate('/home')
        }catch(error){
            setMessage(error.message)
            console.log(error.message)      
        }
    }

    const login = async (values) => {
        const {email, password} = values; 
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            navigate('/home')
        }catch (error){
            setMessage(error.message)
            console.log(error.message)
        }
    }



    const onSubmit = values =>{
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email
        }
        
        
        setFinalValues(values)
        console.log(finalValues)
        if(toggle){
            signIn(values, data);        
        }else{
            login(values);
        }
        
         
    }

    return (
            <div className='form-body'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({errors, touched}) => (
                        <Form className='form'> 

                        {/*          header      */}
                            <div className='con'>
                                <header className='header'>
                                    <h2>{toggle ? "Sign Up" : "Login"}</h2>
                                    <p>{toggle ? "Sign up here to create an account":"Login to your Account here"}</p>
                                    <ReactSwitch id='react-switch' onChange={handleToggle} onColor="#b97dc7" offColor="#77fdd5" offHandleColor='#ddc1e4' onHandleColor='#b9fce8' uncheckedIcon={false} checkedIcon  = {false} checked ={toggle}/><br/>                                   
                                </header><br/>
                            </div>  

                        {/*           FORM         */}
                            <div className='field-set'>

                                {toggle && <InputCus name={'firstName'} type={'text'} errors={errors.firstName} touched={touched.firstName} placeholder=" Enter your first name here"/> }
                                {toggle && <InputCus name={'lastName'} type={'text'} errors={errors.lastName} touched={touched.lastName} placeholder=" Enter your last name here"/>}
                                <InputCus name={'email'} type={'email'} errors={errors.email} touched={touched.email} placeholder=" Enter your email here"/>
                                <InputCus name={'password'} type={'password'} errors={errors.password} touched={touched.password} placeholder=" Enter your password here"/>
    
                                <button className='sign-up' type='submit'>{toggle ? 'Sign Up' : 'Login'}</button>
                            </div> 

                        </Form>
                    )}
                </Formik>
                {message && <Alert message={message} setMessage = {setMessage} />}
            </div>
            
  
    );
}

export default UserLogin
