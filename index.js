var admin = require("firebase-admin");
var firestore = require("@google-cloud/firestore");

var cert = undefined; // require('./key.json');

if (!cert) {
  console.log('This repro needs a valid certificate.  Please contact @mikelehen for help (e.g. via https://github.com/nodejs/node/issues/29223).');
  process.exit(-1);
}

admin.initializeApp({ projectId: 'http2-repro', credential: admin.credential.cert(cert) });
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
