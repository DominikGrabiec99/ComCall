import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getFunctions } from 'firebase/functions';

const config = {
  apiKey: <secret>,
  authDomain: <secret>,
  projectId: <secret>,
  storageBucket: <secret>,
  messagingSenderId: <secret>,
  appId: <secret>
};

const firebase = Firebase.initializeApp(config);

const functions = getFunctions(firebase);

const { FieldValue } = Firebase.firestore();

export { firebase, FieldValue, functions };
