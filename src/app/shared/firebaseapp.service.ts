import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
@Injectable({
  providedIn: 'root',
})
export class FirebaseappService {
  app;
  db;

  constructor() {
    this.app = initializeApp({
      apiKey: 'AIzaSyCrZO0tF5O5Ms8au460-tmGbNS3mJ6QrEc',
      authDomain: 'drasti-37a06.firebaseapp.com',
      databaseURL: 'https://drasti-37a06-default-rtdb.firebaseio.com',
      projectId: 'drasti-37a06',
      storageBucket: 'drasti-37a06.appspot.com',
      messagingSenderId: '850147128578',
      appId: '1:850147128578:web:2153add74417b85d4fbe1b',
      measurementId: 'G-41JEDDFQT2',
    });

    this.db = getDatabase(this.app);
  }
}
