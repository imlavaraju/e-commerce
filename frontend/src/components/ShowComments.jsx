// components/ShowComments.js
import  { useEffect, useState ,useContext} from "react";
import axios from "axios";
import { shopContext } from "../context/ShopContext";
const ShowComments = ({ postComment,productId,setCommentsData}) => {
      const { backendUrl} = useContext(shopContext);
  const [comments, setComments] = useState([]);

  // Fetch comments for the product from the API
  const fetchComments = async () => {
    console.log(productId)
    try {
        
    
    const response = await axios.get(`${backendUrl}/api/products/comments/${productId}`);
    
    
    
    setComments(response.data.comments);
    setCommentsData(response.data.comments)
    console.log(comments)
      
} catch (error) {
        console.log(error)
}
  };

  useEffect(() => {
    fetchComments();
  }, [productId,postComment]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4">Customer Reviews :  {comments.length}</h2>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to leave one!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="border-b pb-4 mb-4">
            <div className="flex items-center">
              <b className="mr-4">{comment.name}</b>
              {[...Array(comment.rating)].map((_, index) => (
                <span key={index} className="text-yellow-500">★</span>
              ))}
              {[...Array(5 - comment.rating)].map((_, index) => (
                <span key={index} className="text-gray-300">★</span>
              ))}
             {/* <p className="ml-2 text-gray-500">({comment.rating} / 5)</p>*/}
            </div>
            <p className="mt-2">{comment.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowComments;
