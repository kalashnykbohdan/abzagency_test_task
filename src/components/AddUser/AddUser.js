import React, { Component } from 'react';
import {Formik, Field} from 'formik';
import UsersAPI from '../FetchRequest';
import style from './AddUser.module.css';
import UsersList from '../UserList';

import success_image from '../../img/success-image.svg';
// import { formPost } from "./formPost";

// import { Formik } from 'formik';

class AddUser extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        position_id: null,
        photo: '',
        positionList: [],
        token: '',
        currentPage: '',
        status: false,
        isLoading: false
    };

    initialValues = { name: '', email: '', phone: '', position_id: null,};


    handlePosition = e => {
        // console.log('use handlePosition');
        this.setState({
            position: e.target.value,
        })
    }

    componentDidMount(){
        UsersAPI.fetchPosition().then(userPosition => {
            this.setState({positionList: userPosition})
            })
            UsersAPI.fetchToken().then(userToken => {
                this.setState({token: userToken});
                // console.log(userToken)
                })
    }

    validate = values => {
        const errors = {};

        if (!values.name) {
        errors.name = 'Username not specified';
        }else if(values.name.length < 2 || values.name.length > 60){
            errors.name = 'Username should contain 2-60 characters';
        }
        if (!values.email) {
            errors.email = 'E-mail not specified';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Wrong E-mail';
        }
        if (!values.phone) {
            errors.phone = 'No phone number provided';
        } 
        else if (!/^[\+]{0,1}380([0-9]{9})$/i.test(values.phone)) {
            errors.phone = 'Wrong number';
        }
        if (!values.position_id) {
            errors.position_id = 'Select value position';
        } 
        if(!values.photo){
            errors.photo = 'File not added';
        }else if (values.photo.size > 5242880) {
            errors.photo = 'The photo size must not be greater than 5 Mb';
        }
        else if (!(values.photo.type === 'image/jpeg' || values.photo.type === 'image/jpg')) {
            errors.photo = 'The photo format must be jpeg/jpg type';
        }
        
      return errors;
    };
  
    handleSubmit = async values => {

        this.setState({
            isLoading: true,
        })

        // setTimeout(() => {this.setState({
        //     isLoading: false,
        // })}, 5000);

        UsersAPI.fetchPostUser(values, this.state.token)
            .then(data => { 
                    if(data.status === 201){
                        this.setState({ status: true})
                        this.props.submitTrue();
                        console.log(data.status, 'submitTrue true')
                    }
                else{
                    this.setState({ status: false})
                    console.log(data.status, 'submitTrue false')
                }
            })
            .finally(() => this.setState({isLoading: false}));
  
    };

    render() {
        const {name, email, phone, positionList, position, status, isLoading} = this.state;
        return (
            <section id="post_request">
                <div className={style.wrap_form}>
                    <h1 className='h1'>Working with POST request</h1>
                    {isLoading && <div className='loading'></div>}
                    {status && !isLoading &&
                    <div className={style.user__success_image}>
                        <img src={success_image} alt='success'/>
                    </div>}
                    {/* <div className={status ? style.user__success_image + ' '+ style.visible : style.user__success_image}>
                        <img src={success_image} alt='success'/>
                    </div> */}
                    {!isLoading &&
                    <Formik 
                        
                        initialValues={{ name:'', email: '', phone: '', position_id: null, photo: ''}}
                        validate={this.validate}
                        onSubmit={this.handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
                            isValid,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit} className={status ? style.form + ' '+ style.unvisible : style.form}>
                                <label className={style.name__label}>
                                    <input type="text"
                                    name="name"
                                    placeholder="Your name"
                                    className={errors.name && touched.name ? style.name__input + ' ' + style.error__input : style.name__input}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    autoFocus
                                    />
                                    <span className={values.name !== '' ? style.lable__text + ' ' + style.visible: style.lable__text}>name</span>
                                    <span className={style.error__text}>{errors.name && touched.name && errors.name}</span>
                                </label>
                                <label className={style.email__label}>
                                    <input type="email"
                                    name="email"
                                    placeholder="Email"
                                    className={errors.email && touched.email ? style.email__input + ' ' + style.error__input : style.email__input}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    autoFocus
                                    />
                                    <span className={values.email !== '' ? style.lable__text + ' ' + style.visible: style.lable__text}>email</span>
                                    <span className={style.error__text}>{errors.email && touched.email && errors.email}</span>
                                </label>
                                <label className={style.phone__label}>
                                    <input type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    className={errors.phone && touched.phone ? style.phone__input + ' ' + style.error__input : style.phone__input}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    autoFocus
                                    />
                                    <span className={values.phone !== '' ? style.lable__text + ' ' + style.visible: style.lable__text}>phone</span>
                                    <span className={style.phone_exemple}>+38 (XXX) XXX - XX - XX</span>
                                    <span className={style.error__text}>{errors.phone && touched.phone && errors.phone}</span>
                                </label>
                                <div className={style.redio__block}>
                                    <span className={style.file__span}>Select your position</span>
                                    {
                                        positionList.map(({id, name}) =>(
                                            <label className={style.redio__input}>
                                                <Field id={id} type="radio" name="position_id" value={id} checked={values.position_id == id} className={style.input_radio}/>
                                                {name}
                                            </label>
                                        ))
                                    }
                                    {/* <span className={style.error__text}>{errors.position_id && touched.position_id && errors.position_id}</span>    */}
                                </div>
                                <div className={style.file__wrap_input}>
                                    <input 
                                        type="file" 
                                        hidden
                                        onChange={(e) => {
                                            setFieldValue("photo", e.target.files[0])
                                        }}
                                        ref={fileUpload => this.fileUpload = fileUpload}
                                        />
                                    <button type='button' onClick={() => this.fileUpload.click()} className={style.file__bth}>Upload</button>
                                    <div className={style.file__bth_wpar_name}>
                                        <span className={style.file__bth_span}>{values.photo.name}</span>
                                    </div>
                                    <span className={style.error__text + ' ' + style.error__text_photo}>{errors.photo && touched.photo && errors.photo}</span>
                                </div>
                                
                                <button type="submit" 
                                    disabled={!isValid || isSubmitting}
                                    className={!isValid ? style.sub__bth + ' ' + style.sub__bth_disabled : style.sub__bth}
                                    >Sign up</button>
                            </form>
                        )}
                    </Formik>}
                </div>
            </section>
        );
    }
}

export default AddUser;