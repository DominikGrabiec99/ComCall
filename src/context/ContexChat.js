import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import chatGlobal from './chatGlobal';
import UserContext from './user';
import {
  getMessagesByUserId,
  getUserByUserName,
  getAllMessagesByUserId
} from '../services/firebase';
import FirebaseContext from './firebase';

const ContextChat = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [findedUser, setFindedUser] = useState([]);
  const [firstMessages, setFirstMessages] = useState([]);
  const [userToMessage, setUserToMessage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const scroll = useRef();
  const { id } = useParams();

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateSize);

    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (!message) {
      return null;
    }

    if (Object.keys(userToMessage).length === 0) {
      return null;
    }

    try {
      await firebase.firestore().collection(`messages/${user.uid}/${userToMessage.userId}`).add({
        text: message,
        author: user.uid,
        time: Date.now()
      });

      await firebase.firestore().collection(`messages/${userToMessage.userId}/${user.uid}`).add({
        text: message,
        author: user.uid,
        time: Date.now()
      });

      setMessage('');
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitFindUser = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scroll.current, messages]);

  useEffect(() => {
    if (Object.keys(userToMessage).length === 0) {
      return;
    }

    async function getMessages() {
      await getMessagesByUserId(user.uid, userToMessage.userId, setMessages);
    }

    getMessages();
  }, [userToMessage]);

  useEffect(() => {
    async function getUser() {
      setFindedUser(await getUserByUserName(searchUser));
    }

    getUser();
  }, [searchUser]);

  useEffect(() => {
    async function getAllGroupMessage() {
      await getAllMessagesByUserId(user.uid, setFirstMessages, setIsLoading);
    }
    if (firstMessages.length === 0) {
      getAllGroupMessage();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (firstMessages.length !== 0) setUserToMessage(firstMessages[0]);
  }, [firstMessages]);

  return (
    <chatGlobal.Provider
      value={{
        messages,
        setMessages,
        message,
        setMessage,
        searchUser,
        setSearchUser,
        findedUser,
        setFindedUser,
        firstMessages,
        setFirstMessages,
        userToMessage,
        setUserToMessage,
        isLoading,
        setIsLoading,
        isVisible,
        setIsVisible,
        width,
        setWidth,
        id,
        scroll,
        handleSubmitFindUser,
        handleSubmitMessage,
        user
      }}
    >
      {children}
    </chatGlobal.Provider>
  );
};

export default ContextChat;

ContextChat.propTypes = {
  children: PropTypes.object
};
