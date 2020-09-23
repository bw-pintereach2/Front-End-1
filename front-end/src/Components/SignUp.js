import React, { useState, useEffect }  from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as yup from "yup";
import styled from 'styled-components';
import {Redirect} from 'react-router-dom';
import {register} from '../actions/auth';


const defaultErrorState = {
  username: "",
    password: "",
  };
  
  const schema = yup.object().shape({
    username: yup
      .string()
      
      .required("Please enter you email."),
    password: yup
      .string()
      .required("Please type a password.")
      .min(6, "Requires a min of 6 symbols."),
  });

const SignUp = ({register, isAuthenticated }) => {

    const [formState, setFormState] = useState({
        username: "",
        password: "",
      });
      const [errors, setErrors] = useState(defaultErrorState);
      const [isDisabled, setIsDisabled] = useState(false);
    
      // Destructure state
      const { username, password } = formState;
    
      useEffect(
        () => {
          schema.isValid(formState).then((valid) => setIsDisabled(!valid));
        },
        [formState],
        schema
      );
    
      const validate = (e) => {
        e.persist();
        yup
          .reach(schema, e.target.name)
          .validate(e.target.value)
          .then((valid) => setErrors({ ...errors, [e.target.name]: "" }))
          .catch((err) => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
      };
    
      // Submit and Call Register Action
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormState({ username: "", password: "" });
        console.log(formState);
        register({ username, password });
      };
    
      const handleChange = (e) => {
        e.persist();
        validate(e);
        setFormState({ ...formState, [e.target.name]: e.target.value });
      };
    
      if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
      }
    

    return(
        <div>
            <p>Here is the SignUp</p>
            <Link to='/signIn'>Sign In</Link>
        <Container>
            <form onSubmit={handleSubmit} className='formContainer'>
        <label>
          <input
            type='username'
            name='username'
            onChange={handleChange}
            data-cy='username'
            value={username}
            placeholder='username'
          />
          {errors.username.length > 0 && (
            <p style={{ color: "red" }}>{errors.username}</p>
          )}
        </label>
        <label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            data-cy='password'
            value={password}
            placeholder='Password'
          />
          {errors.password.length > 0 && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </label>
        <button onClick={handleSubmit} type='submit' data-cy='submit-button' disabled={isDisabled}>
          Sign Up
        </button>
        <div>Or</div>
        <Link to='/signIn'>
          <button type='submit' data-cy='submit-button'>
            Sign In
          </button>
        </Link>
      </form>
      </Container>
        </div>
    )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(SignUp);


const Container = styled.div`
  width: 50rem;
  text-align: center;
  align-items: center;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
  padding: 2rem;
  margin-bottom: 3rem;
  border: black 0.1rem solid;

  h1 {
    font-size: 3rem;
  }

  .formContainer {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 7rem;
      margin: 0.5rem;
    }
  }
`;