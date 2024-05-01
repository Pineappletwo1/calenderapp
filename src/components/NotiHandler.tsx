"use client";

import { useEffect } from "react";
export default function NotiHandler() {
  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setInterval(() => {
          //send notification to check planner
          new Notification("Check your planner!", {
            body: "Don't forget to check your planner!",
          });
        }, 1000 * 60 * 30);
      }
    });
  }, []);
  return null;
}
