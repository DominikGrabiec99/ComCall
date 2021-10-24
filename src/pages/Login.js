import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as ROUTS from '../constans/routes';
import FirebaseContext from '../context/firebase';

// eslint-disable-next-line import/no-named-default
import { default as SignupStyles } from '../styles/login-signin/Signup.module.scss';

const block = bemCssModules(SignupStyles);

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = password === '' || emailAddress === '';

  const handleOnChangeEmailAddress = (e) => setEmailAddress(e.target.value);
  const handleOnChangePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTS.DASHBOARD);
    } catch (e) {
      setPassword('');
      setError(e.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - CollCam';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className={block()}>
        <div className={block('wrapper')}>
          <div className={block('wrapper-bg')} />
          <h1 className={block('title')}>Login to your account</h1>
          <div className={block('div-form')}>
            {error && <p className={block('error')}>{error}</p>}
            <form action="POST" onSubmit={handleLogin} className={block('form')}>
              <input
                type="email"
                id="emailAdress"
                placeholder="Email adress"
                value={emailAddress}
                onChange={handleOnChangeEmailAddress}
                className={block('input')}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handleOnChangePassword}
                className={block('input')}
              />
              <Link to="#" className={block('forgot')}>
                Forgot password
              </Link>
              <button type="submit" className={block('btn-submit')} disabled={isValid}>
                Log in
              </button>
            </form>
            <p className={block('par')}>
              Don't have an account yet?{' '}
              <Link to={ROUTS.SIGN_UP} className={block('link')}>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <p className={block('author')}>
          Photo by{' '}
          <a
            className={block('author')}
            href="https://unsplash.com/@napr0tiv?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Vasily Koloda
          </a>{' '}
          on{' '}
          <a
            className={block('author')}
            href="https://unsplash.com/s/photos/school?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Unsplash
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Login;
