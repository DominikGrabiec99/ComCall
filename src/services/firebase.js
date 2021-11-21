import { httpsCallable } from 'firebase/functions';
import { FieldValue, firebase, functions } from '../lib/firebase';

/// user

export const doesEmailAdressExist = async (emailAdress) => {
  const results = await firebase
    .firestore()
    .collection('users')
    .where('emailAddress', '==', emailAdress)
    .get();

  return results.docs.map((user) => user.data().length > 0);
};

export const getUserByUserId = async (userId) => {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
};

export const getUserByUserName = async (userName) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('fullName', '==', userName)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return user;
};

export const getCoursesByUserId = async (userId, setIsLoading) => {
  const result = await firebase
    .firestore()
    .collection('courses')
    .where('users', 'array-contains', userId)
    .get()
    .then((res) => {
      if (setIsLoading) {
        setIsLoading(false);
      }
      return res;
    });

  const course = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return course;
};

export const getCoursesByCourseId = async (courseId) => {
  const result = await firebase
    .firestore()
    .collection('courses')
    .where('courseId', '==', courseId)
    .get();

  const course = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }));

  return course;
};

/// get messages

export const getMessagesByUserId = async (userUid, userToMessage, setMessages) => {
  const result = firebase
    .firestore()
    .collection(`messages/${userUid}/${userToMessage}`)
    .orderBy('time', 'desc')
    .limit(50)
    .onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })).reverse());
    });
};

export const getAllMessagesByUserId = async (userUid, setFirstMess, setIsLoading) => {
  const getSubCollections = httpsCallable(functions, 'getSubCollections');

  getSubCollections({ col: 'messages', doc: userUid })
    .then((result) => {
      const { collections } = result.data;
      if (collections.length === 0) {
        setIsLoading(false);
        return null;
      }
      const cols = collections.map((col) =>
        firebase
          .firestore()
          .collection(`messages/${userUid}/${col}`)
          .orderBy('time', 'desc')
          .limit(1)
          .onSnapshot((snapshot) => {
            const messagess = Promise.all(
              snapshot.docs.map(async (doc) => {
                let obj = {};
                await getUserByUserId(col).then((result) => {
                  if (result.length === 0) {
                    return null;
                  }
                  const { fullName, userId } = result[0];
                  obj = {
                    docId: doc.id,
                    fullName,
                    userId,
                    ...doc.data()
                  };
                  return {
                    docId: doc.id,
                    fullName,
                    userId,
                    ...doc.data()
                  };
                });
                return obj;
              })
            )
              .then((obj) => setFirstMess((arr) => [...arr, ...obj]))
              .then(() => setIsLoading(false));
          })
      );
    })
    .catch((error) => {
      // Getting the Error details.
      const { code } = error;
      const { message } = error;
      const { details } = error;
      console.log('code:', code);
      console.log('messages:', message);
      console.log('detalis:', details);
    });
};

/// course messages

export const getMessagesCourse = async (courseId, setCourse) => {
  firebase
    .firestore()
    .collection(`courses`)
    .where('courseId', '==', courseId)
    .onSnapshot((snapshot) => {
      setCourse(snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })));
    });
};

/// admin

export const getAllCourse = async (setAllCourses, setIsLoading) => {
  firebase
    .firestore()
    .collection(`courses`)
    .onSnapshot((snapshot) => {
      setAllCourses(snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
};
