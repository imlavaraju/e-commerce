import  { useState,useContext } from "react";

import { shopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Comments = ({ postComment, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const {token} = useContext(shopContext)
  const navigate = useNavigate();

  const handlePostComment = async () => {
    if (comment.trim() === "") {
      return alert("Please write a comment");
    }
    postComment(productId, comment, rating);
    setComment("");
    setRating(0);
  };

  return (
    <div className="mt-8">
      {/* Textarea for Comment */}
      <textarea
        className="border w-full p-2 mb-4"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
        <span className="ml-2">{rating} / 5</span>
      </div>
      {/* Post Comment Button */}
      <button
      className="bg-black text-white px-4 py-2"
      onClick={token ? handlePostComment : () => navigate("/login")}
    >
      {token ? "Post Comment" : "Login Please"}
    </button>

      <div>
        
      </div>

    </div>

  );
};

export default Comments;
