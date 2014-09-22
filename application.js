/* global console, indexedDB, document */
(function(document) {

  // 'global' variable to store reference to the database
  var db, input;

  function databaseError(e) {
    console.error('An IndexDB error has occurred', e);
  }

  function databaseOpen(callback) {
    // Open a database, specify the name and version
    var version = 1;
    var request = indexedDB.open('todos', version);

    console.log("request: ", request);

    // Run migrations if necessary
    request.onupgradeneeded = function(e) {
      console.log("onupgradeneeded triggered");
      db = e.target.result;
      e.target.transaction.onerror = databaseError;
      db.createObjectStore('todo', { keyPath: 'timeStamp' });
    };

    request.onsuccess = function(e) {
      db = e.target.result;
      callback();
    };
    request.onerror = databaseError;
  }

  function onSubmit(e) {
    e.preventDefault();
    databaseTodosAdd(input.value, function() {
      input.value = '';
    });
  }

  function databaseTodosAdd(text, callback) {
    var transaction = db.transaction(['todo'], 'readwrite');
    var store = transaction.objectStore('todo');
    var request = store.put({
      text: text,
      timeStamp: Date.now()
    });

    transaction.oncomplete = function() {
      callback();
    };
    request.onerror = databaseError;
  }

  databaseOpen(function() {
    input = document.querySelector('input');
    document.body.addEventListener('submit', onSubmit);
  });

})(document);
