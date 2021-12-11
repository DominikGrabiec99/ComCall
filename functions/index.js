const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.getSubCollections = functions.https.onCall(async (data, context) => {
  const { col, doc } = data;

  const collections = await admin.firestore().collection(col).doc(doc).listCollections();
  const collectionIds = collections.length === 0 ? [] : collections.map((col) => col.id);

  return { collections: collectionIds };
});
