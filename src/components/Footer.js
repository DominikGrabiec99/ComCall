import React from 'react';
import { Link } from 'react-router-dom';
import bemCssModules from 'bem-css-modules';
import { footerText, socialMedia } from '../constans/text';

// eslint-disable-next-line import/no-named-default
import { default as FooterStyles } from '../styles/Footer.module.scss';

const block = bemCssModules(FooterStyles);

const Footer = () => {
  const socialMedaiMenu = socialMedia.map((media) => (
    <div key={media.id} className={block('icon-box')}>
      <Link to={media.url} target="_blank">
        <img src={media.icon} alt="" className={block('social-icon')} />
      </Link>
    </div>
  ));

  const footerInfo = footerText.map((text) => (
    <div key={text.id}>
      <h3 className={block('info-title')}>{text.name}</h3>
      {text.elemts.map((element) => (
        <div key={element.idElement} className={block('block-info-link')}>
          <Link to={element.url} className={block('info-link')}>
            {element.name}
          </Link>
        </div>
      ))}
    </div>
  ));

  const handleOnSubmitNew = (e) => {
    e.preventDefault();
  };

  return (
    <footer className={block()}>
      <div className={block('social-media')}>
        <h2 className={block('title-social')}>You can find us at:</h2>
        <div className={block('social-icons-box')}>{socialMedaiMenu}</div>
      </div>
      <div className={block('footer-info')}>
        <div className={block('footer-box')}>{footerInfo}</div>
        <div>
          <form action="" onSubmit={handleOnSubmitNew}>
            <p className={block('subscribe-text')}>
              Keep up to date with our latest and special offerts
            </p>
            <input
              type="text"
              placeholder="Your eamil address"
              className={block('subscribe-input')}
            />
            <button type="submit" className={block('subscribe-button')}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
