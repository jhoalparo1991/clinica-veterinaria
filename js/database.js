export class Database {
  crearDB() {
    let db = window.indexedDB.open("veterinaria", 1.0);

    db.onerror = function (e) {
      console.log("Error al crear la base de datos ", e.target.errorCode);
    };

    db.onsuccess = function (e) {
      console.log("Se creó con exito la base de datos, ", e.target.result.name);
    };

    db.onupgradeneeded = function (e) {
      let database = e.target.result;
      let objectStore = database.createObjectStore("citas", {
        keyPath: "id",
      });

      objectStore.createIndex("mascota", "mascota", { unique: false });
      objectStore.createIndex("propietario", "propietario", { unique: false });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("fecha", "fecha", { unique: false });
      objectStore.createIndex("hora", "hora", { unique: false });
      objectStore.createIndex("sintomas", "sintomas", { unique: false });
    };

    return db;
  }
}
