import ReactPlayer from "react-player";
import { FaEllipsisH } from "react-icons/fa";
import {
  Article,
  SharedActor,
  Description,
  SharedMedia,
  SocialCounts,
  SocialActions,
} from "../../styles/stylesMain";
import { useEffect, useState } from "react";
import { AddComment } from "./AddComment";
import db, { auth } from "../../firebase";
import { SingleComment } from "./SingleComment";
import firebase from "firebase";
import { isUrl, splitString } from "./urlIdentifier";
import MediaContainer from "./MediaContainer";

//

export function SinglePost({ article, id }) {
  const user = auth.currentUser;
  const [showCommentBox, setshowCommentBox] = useState(false);
  const [comments, setcomments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [rerender, triggerPostRerender] = useState(1);
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  useEffect(() => {
    (async function getComments() {
      const articleRef = db.collection("articles").doc(id);
      const commentsRef = articleRef
        .collection("comments")
        .orderBy("timestamp", "asc");
      const snapshot = await commentsRef.get();
      const allComments = snapshot.docs.map((doc) => {
        const commentObject = { ...doc.data(), id: doc.id };
        return commentObject;
      });
      setcomments(allComments);
      const likedBy = article.likedBy;

      if (likedBy) {
        setLikes(likedBy);
        console.log(likedBy);
        if (likedBy.includes(user.uid)) {
          console.log("yes");
          setHasLiked(true);
        }
      } else {
        setLikes([]);
      }
    })();
  }, [showCommentBox, rerender]);

  const handleLike = async () => {
    try {
      if (hasLiked) {
        setHasLiked(false);
        const updatedLikes = likes.slice();
        const index = updatedLikes.indexOf(user.id);
        updatedLikes.splice(index, 1);
        setLikes(updatedLikes);
        const articleRef = db.collection("articles").doc(id);
        await articleRef.update({
          likedBy: firebase.firestore.FieldValue.arrayRemove(user.uid),
        });
      } else {
        setHasLiked(true);
        setLikes((likes) => [...likes, user.uid]);
        const articleRef = db.collection("articles").doc(id);
        await articleRef.update({
          likedBy: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
      }
    } catch (error) {
      triggerPostRerender(rerender + Math.random());
    }
  };
  return (
    <Article>
      <SharedActor>
        <a>
          <img src={article.actor.image} alt="" />
          <div>
            <span>{article.actor.title}</span>
            <span>
              {article.actor.date
                .toDate()
                .toLocaleDateString(undefined, dateOptions)}
            </span>
          </div>
        </a>
        <button>
          <FaEllipsisH size={20} style={{ margin: "8px", fill: "#99d3df" }} />
        </button>
      </SharedActor>
      <Description>
        {(() => {
          const res = splitString(article.description).map((str) =>
            isUrl(str) ? (
              <a href={str} target="_blank">
                {str}
              </a>
            ) : (
              str
            )
          );
          return res;
        })()}
      </Description>
      <MediaContainer article={article} />
      <SocialCounts>
        <li>
          <a>{likes?.length} Likes</a>
        </li>
        <li>
          <a>{comments.length} Comments</a>
        </li>
      </SocialCounts>
      <SocialActions>
        <button onClick={() => handleLike()}>
          <span>{hasLiked ? "Unlike" : "Like"}</span>
        </button>
        <button onClick={() => setshowCommentBox(true)}>
          <span>Comment</span>
        </button>
      </SocialActions>
      {showCommentBox && (
        <AddComment
          articleId={id}
          setshowCommentBox={setshowCommentBox}
          user={user}
        />
      )}
      {comments.length > 0 && (
        <>
          <p style={{ textAlign: "left", marginLeft: "15px" }}>Comments:</p>
          <div style={{ maxHeight: "300px", overflow: "scroll" }}>
            {comments.map((comment) => (
              <SingleComment
                comment={comment}
                articleAuthor={article.actor.uid}
                articleId={id}
                triggerPostRerender={triggerPostRerender}
              />
            ))}
          </div>
        </>
      )}
    </Article>
  );
}
