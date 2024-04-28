"use client";

import { useEffect } from "react";
export default function NotiHandler() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      //make it send a notification every 30 minutes even when the tab is closed
    });
  }, []);
  return null;
}
