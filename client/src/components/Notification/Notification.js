import React, { useEffect } from "react";

import classes from "./Notification.module.css";
export default function Notification({ message, onModalClose }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      onModalClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onModalClose]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.messageBox}>
        <h4 className={classes.header}>Error</h4>
        <p className={classes.message}>{message}</p>
      </div>
    </div>
  );
}
