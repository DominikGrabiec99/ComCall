import React, { createContext } from 'react';

const chatGlobal = createContext({
  messages: [],
  setMessages: () => {},
  message: '',
  setMessage: () => {},
  searchUser: '',
  setSearchUser: () => {},
  findedUser: [],
  setFindedUser: () => {},
  firstMessages: [],
  setFirstMessages: () => {},
  userToMessage: {},
  setUserToMessage: () => {},
  isLoading: true,
  setIsLoading: () => {},
  isVisible: false,
  setIsVisible: () => {},
  width: 0,
  setWidth: () => {},
  id: '',
  scroll: {},
  handleSubmitFindUser: () => {},
  handleSubmitMessage: () => {},
  user: {}
});

export default chatGlobal;
