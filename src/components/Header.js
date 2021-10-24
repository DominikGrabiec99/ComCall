/* eslint-disable import/no-named-default */
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import * as ROUTES from '../constans/routes';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';

import { default as HeaderStyles } from '../styles/Header.module.scss';

const block = bemCssModules(HeaderStyles);

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      if (e.target.documentElement.scrollTop) {
        setScrolling(true);
      }
      if (e.target.documentElement.scrollTop === 0) {
        setScrolling(false);
      }
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  return (
    <header className={`${block()} ${scrolling && block('scrool')} ${user && block('login')}`}>
      <div>
        <Link to={ROUTES.DASHBOARD}>
          <img src="/images/logo.png" alt="ComCall logo" className={block('logo')} />
        </Link>
      </div>
      <div className={block('wrapper')}>
        {user ? (
          <>
            <div>
              <Link to="#">
                <img
                  className={block('avatar')}
                  src="/images/avatars/avatar.png"
                  alt={`${user.displayName} profile`}
                />
              </Link>
            </div>
            <button
              type="button"
              title="Sign Out"
              className={block('button-signout')}
              onClick={() => firebase.auth().signOut()}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  firebase.auth().signOut();
                }
              }}
            >
              <img className={block('signout')} src="/images/logout.png" alt="log out" />
            </button>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN}>
              <button type="button" className={`${block('button')} ${block('button-login')}`}>
                LogIn
              </button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <button type="button" className={block('button')}>
                SignUp
              </button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
