var admin = require("firebase-admin");
var firestore = require("@google-cloud/firestore");

admin.initializeApp({ projectId: 'http2-repro' });
var db = admin.firestore();

function queryMore(size, startAt) {
  var query = db.collection('big').orderBy(firestore.FieldPath.documentId()).limit(250);
  if (startAt) {
    query = query.startAfter(startAt);
  }
  query.get().then(qs => {
    if (qs.size > 0) {
      size += qs.size;
      var lastDoc = qs.docs[qs.size - 1].id;
      console.log('Read ' + qs.size + ' docs (' + size + ' total). Last doc: ' + lastDoc);
      setTimeout(function () {
        queryMore(size, lastDoc)
      }, 0);
    } else {
      console.log('All done!');
    }
  });
}

queryMore(0);
