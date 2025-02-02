import  { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import { set } from "react-hook-form";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Comments from "../components/comments";
import ShowComments from "../components/ShowComments";
import axios from "axios";

function Product() {
  const { productId } = useParams();
  const { products, currency, addToCard ,backendUrl,token} = useContext(shopContext);
  const [productData, setProductData] = useState(false);
  const [isCommentsShow,setIsCommentsShow]=useState(true)
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [commentsData,setCommentsData]=useState([])
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const postComment=async(productId, comment, rating)=>{
    console.log(productId,comment,rating)
    const response = await axios.post(
      backendUrl + "/api/products/comment",
      {productId,comment,rating},
      { headers: { Authorization: "Bearer " + token } }
    );
    console.log(response)

  }

  const productRating = () => {
    if (!commentsData.length) return <p>No ratings yet</p>;
  
    // Calculate the average rating
    const totalRating = commentsData.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / commentsData.length;
  
    // Generate stars
    const fullStars = Math.floor(averageRating); // Number of full stars
    const halfStar = averageRating % 1 >= 0.5 ? 1 : 0; // Half star if the remainder is >= 0.5
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars
  
    return (
      <div className="flex items-center">
        {/* Full Stars */}
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <span key={`full-${index}`} className="text-yellow-500 text-lg">
              ★
            </span>
          ))}
        {/* Half Star */}
        {halfStar ? (
          <span className="text-yellow-500 text-lg">☆</span>
        ) : null}
        {/* Empty Stars */}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <span key={`empty-${index}`} className="text-gray-300 text-lg">
              ★
            </span>
          ))}
        <p className="ml-2 text-sm text-gray-600">({commentsData.length} reviews)</p>
      </div>
    );
  };
  
  


  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item) => {
              return (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={item}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              );
            })}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={image} className="w-full h-auto" />
          </div>
        </div>
        {/* ---------Products Info--------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            
            <p className="pl-2">{productRating()}(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item) => {
                return (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={item}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => addToCard(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CARD
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1"></div>
          <p>100% Original product.</p>
          <p>Cash on delivery is available on this product.</p>
          <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>
      {/* ---------------- description and review section -------------- */}
      <div className="mt-30">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <button onClick={()=>setIsCommentsShow(!isCommentsShow)} className="border px-5 py-3 text-sm">Reviews (122)</button>
        </div>{isCommentsShow?(<div><Comments
            postComment={postComment}
            productId={productId}
          />
          <ShowComments productId={productId} setCommentsData={setCommentsData} postComment={postComment}/></div>):
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
            exercitationem repellendus culpa libero quas sequi incidunt, nam
            facere beatae ipsam.
          </p>
          <p>
            dipisicing elit. Impedit, sit veniam? Culpa, neque labore
            praesentium odit laudantium rerum rem id. Vero totam dolores omnis,
            obcaecati ducimus voluptatibus harum ut at.
          </p>
        </div>}
      </div>
      {/* ----------------- display related products--------------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
