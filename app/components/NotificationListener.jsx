"use client";

import { useEffect } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { getDatabase } from "firebase/database";
import { app } from "@/lib/firebase";

export default function NotificationListener() {

  useEffect(() => {
    const messaging = getMessaging();

    Notification.requestPermission().then(() => {
      getToken(messaging, {
        vapidKey: "BP7krMXt9E47VhdHEqxD-S6MpnbNNGB0xBkNqU6pl_CPa9eQrbRsOhNpGjSWvs9CcCgQUGlr0x-iopQ6VTE1uEg"
      }).then((token) => {
        console.log("FCM Token:", token);
      });
    });

    // 🔥 REALTIME DB LISTENER
    const rtdb = getDatabase(app);
    const notifyRef = ref(rtdb, "notifications/latest");

    onValue(notifyRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      // Send notification
      new Notification(data.title, {
        body: data.body,
        icon: "/icon.png"
      });

      console.log("Real-time notification:", data);
    });

    // 🔥 FOREGROUND MESSAGE
    onMessage(messaging, (payload) => {
      console.log("Foreground msg:", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
    });

  }, []);

  return null;
    }
