import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Notification = ({ userLoggedIn }) => {
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    if (userLoggedIn && !notificationShown) {
      toast.success("Successfully signed in!");
      setNotificationShown(true);
    }
  }, [userLoggedIn, notificationShown]);

  return null; 
};

export default Notification;
