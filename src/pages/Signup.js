import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { doesEmailAdressExist } from '../services/firebase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as ROUTS from '../constans/routes';
import FirebaseContext from '../context/firebase';

// eslint-disable-next-line import/no-named-default
import { default as SignupStyles } from '../styles/login-signin/Signup.module.scss';

const block = bemCssModules(SignupStyles);

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isValid = password === '' || emailAddress === '';

  const handleOnChangeFullName = (e) => setFullName(e.target.value);
  const handleOnChangeEmailAddress = (e) => setEmailAddress(e.target.value);
  const handleOnChangePassword = (e) => setPassword(e.target.value);

  const handleCheckIsValid = () => {
    if (password.length < 8) {
      setError('Password length must be more than 8');
      return true;
    }

    let isUpper = false;
    let isSpecialChart = false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < password.length; i++) {
      if (password.charAt(i) === password.charAt(i).toUpperCase()) {
        isUpper = true;
      }

      if (password.charCodeAt(i) >= 33 && password.charCodeAt(i) <= 47) {
        isSpecialChart = true;
      }
    }

    if (!isUpper) {
      setError('You should use capital letter');
      return true;
    }

    if (!isSpecialChart) {
      setError('You should use special chart (!, #, @...)');
      return true;
    }

    return false;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (handleCheckIsValid()) {
      return;
    }
    const emailAddressDoesExist = await doesEmailAdressExist(emailAddress);

    if (emailAddressDoesExist.length) {
      setError('That email adress is already taken, please use another.');
      return;
    }

    try {
      const createdUserResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailAddress, password);

      await createdUserResult.user.updateProfile({
        displayName: fullName
      });

      await firebase.firestore().collection('users').add({
        userId: createdUserResult.user.uid,
        fullName,
        emailAddress,
        courses: [],
        isAdmin: false,
        // isTeacher: false,
        // calendar: [],
        dateCreated: Date.now()
      });

      await firebase.firestore().collection('messages').doc(createdUserResult.user.uid).set({});

      history.push(ROUTS.DASHBOARD);
    } catch (e) {
      setPassword('');
      setError(e.message);
    }
  };

  useEffect(() => {
    document.title = 'Signup - CollCam';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className={block()}>
        <div className={block('wrapper')}>
          <div className={block('wrapper-bg')} />
          <h1 className={block('title')}>Create your account</h1>
          <div className={block('div-form')}>
            {error && <p className={block('error')}>{error}</p>}
            <form action="POST" onSubmit={handleSignIn} className={block('form')}>
              <input
                type="text"
                id="fullName"
                placeholder="Full name"
                value={fullName}
                onChange={handleOnChangeFullName}
                className={block('input')}
              />
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
              <button type="submit" disabled={isValid} className={block('btn-submit')}>
                Sign up
              </button>
            </form>
            <p className={block('par')}>
              Are you having account?{' '}
              <Link to={ROUTS.LOGIN} className={block('link')}>
                Log in
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

export default Signup;
