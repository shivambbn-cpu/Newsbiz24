importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDVq4VY0Y0uGCoFqX1gy-D4sHdt2pI2gec",
  authDomain: "newsbiz24-1d93e.firebaseapp.com",
  projectId: "newsbiz24-1d93e",
  storageBucket: "newsbiz24-1d93e.appspot.com",
  messagingSenderId: "989219422488",
  appId: "1:989219422488:web:6a4d7dd843cb3fb09bcab6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});
