import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ content: content });
    await tx.complete;
    console.log('putDb complete', content);
  } catch (error) {
    console.error('putDb not implemented');
  }
};


export const getDb = async () => {
  try {
    const db = openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    console.log('getDb complete', content);
    return content;
  } catch (error) {
    console.error('getDb not implemented'), error;
  }
};

initdb();
