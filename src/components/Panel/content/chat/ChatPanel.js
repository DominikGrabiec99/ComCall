/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from 'react';
import bemCssModules from 'bem-css-modules';
import { useParams } from 'react-router-dom';

import UserContext from '../../../../context/user';
import FirebaseContext from '../../../../context/firebase';

import {
  getMessagesByUserId,
  getUserByUserName,
  getAllMessagesByUserId
} from '../../../../services/firebase';

import WriteMessagesPanel from './WriteMessagesPanel';
import MessagessPanel from './MessagessPanel';
import SearchPanel from './SearchPanel';
import UsersChat from './UsersChat';

// eslint-disable-next-line import/no-named-default
import { default as ContentPanelMenuStyles } from '../../../../styles/panel/content/ChatPanel.module.scss';

const block = bemCssModules(ContentPanelMenuStyles);

const ChatPanel = () => {
  const { user } = useContext(UserContext);
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

    getAllGroupMessage();
  }, []);

  useEffect(() => {
    if (firstMessages.length !== 0) setUserToMessage(firstMessages[0]);
  }, [firstMessages]);

  return (
    <div className={block()}>
      {width > 950 ? (
        <>
          <div className={block('usersChat')}>
            <SearchPanel
              searchUser={searchUser}
              setSearchUser={setSearchUser}
              handleSubmitFindUser={handleSubmitFindUser}
              findedUser={findedUser}
              setUserToMessage={setUserToMessage}
            />
            <UsersChat
              firstMessages={firstMessages}
              setUserToMessage={setUserToMessage}
              isLoading={isLoading}
            />
          </div>
          <div className={block('content-box')}>
            <MessagessPanel
              messages={messages}
              userToMessage={userToMessage}
              user={user}
              scroll={scroll}
              setIsVisible={setIsVisible}
              isLoading={isLoading}
            />
            {!isLoading && (
              <WriteMessagesPanel
                message={message}
                setMessage={setMessage}
                handleSubmitMessage={handleSubmitMessage}
              />
            )}
          </div>
        </>
      ) : id === 'chat' ? (
        <>
          <div className={block('usersChat')}>
            <SearchPanel
              searchUser={searchUser}
              setSearchUser={setSearchUser}
              handleSubmitFindUser={handleSubmitFindUser}
              findedUser={findedUser}
              setUserToMessage={setUserToMessage}
              width={width}
            />
            <UsersChat
              firstMessages={firstMessages}
              setUserToMessage={setUserToMessage}
              isLoading={isLoading}
              width={width}
            />
          </div>
        </>
      ) : (
        <div className={block('content-box')}>
          <MessagessPanel
            messages={messages}
            userToMessage={userToMessage}
            user={user}
            scroll={scroll}
            setIsVisible={setIsVisible}
          />
          {isVisible && !isLoading && (
            <WriteMessagesPanel
              message={message}
              setMessage={setMessage}
              handleSubmitMessage={handleSubmitMessage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
