/* global console, alert, indexDB */
(function() {

  // 'global' variable to store reference to the database
  var db;

  function databaseError(e) {
    console.error('An IndexDB error has occurred', e);
  }

  function databaseOpen(callback) {
    // Open a database, specify the name and version
    var version = 1;
    var request = indexDB.open('todos', version);

    request.onsuccess = function(e) {
      db = e.target.result;
      callback();
    };
    request.onerror = databaseError;
  }

  databaseOpen(function() {
    alert("the database has been opened");
  });

})();
