import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCHRKR5nXaSKhDRaw3pCXMlRiu04Gf38Co',
    authDomain: 'your_auth_domain',
    projectId: 'imomobile-2500d',
    storageBucket: 'imomobile-2500d.appspot.com',
    messagingSenderId: '905991878125',
    appId: '1:905991878125:android:36bc936634573004fce3e4',
    measurementId: 'your_measurement_id' // optional
};

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db};

