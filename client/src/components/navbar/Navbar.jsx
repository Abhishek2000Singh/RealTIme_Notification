import "./navbar.css"
import Notification from "../../img/notification.svg";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import { useEffect, useState } from "react";

export default function Navbar({ socket }) {

    const [notification, setNotification] = useState([]);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        socket.on("getNotification", (data) => {
            setNotification((prev) => [...prev, data])
        })
    }, [socket])

    console.log(notification);

    const displayNotification = ({ senderName, type }) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented"
        } else {
            action = "shared"
        }

        return (
            <span className="notification">{`${senderName} ${action} your post`}</span>
        )
    }

    const handleRead = () => {
        setNotification([]);
        setOpen(false);
    };

    return (
        <div className="navbar">
            <span className="logo">My App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} alt="" className="iconImg" />
                    {notification.length > 0 &&
                        <div className="counter">{notification.length}</div>
                    }
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Message} alt="" className="iconImg" />

                </div>
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Settings} alt="" className="iconImg" />

                </div>
            </div>
            {open && (

                <div className="notifications">
                    {notification.map((n) => (displayNotification(n)))}
                    <button className="nButton" onClick={handleRead}>Mark as read!</button>
                </div>
            )}
        </div>
    );
};