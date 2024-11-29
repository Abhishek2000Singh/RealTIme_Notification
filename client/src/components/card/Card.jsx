import "./card.css"

import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";
import { useState } from "react";

export default function Card({ post, socket, user }) {

    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        setLiked(true)
        console.log("Notification clicked");
        socket?.emit("sendNotification", {
            senderName: user,
            receiverName: post.username,
            type,
        })
    }

    return (
        <div className="card">
            <div className="info">
                <img className="userImg" src={post.userImg} alt="" />
                <span>{post.fullname}</span>
            </div>
            <img className="postImg" src={post.postImg} alt="" />
            <div className="interaction">
                {liked ? (
                    <img className="cardIcon" src={HeartFilled} alt=""
                        onClick={() => setLiked(false)} />
                ) : (
                    <img src={Heart} alt="" className="cardIcon" onClick={() => handleNotification(1)} />
                )}
                <img src={Comment} alt="" className="cardIcon" onClick={() => handleNotification(2)} />
                <img src={Share} alt="" className="cardIcon" onClick={() => handleNotification(3)} />
                <img src={Info} alt="" className="cardIcon infoIcon" />
            </div>
        </div>
    )
}
