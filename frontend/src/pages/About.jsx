import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          alt="about_img"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          Welcome to Our Forever Store, where fashion meets quality and affordability. We are passionate about curating stylish, comfortable, and timeless clothing that suits every occasion. Whether you’re looking for everyday essentials or standout pieces to elevate your wardrobe, we’ve got you covered.

         </p>
          <p>
          At Our Store, we believe in making fashion accessible to everyone. Our collection is handpicked to reflect the latest trends while ensuring superior craftsmanship. We are committed to sustainability and ethical practices, ensuring that every piece you wear is made with care for both you and the planet.
 
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
          our mission is to empower individuals through fashion by offering high-quality, stylish, and affordable clothing for every lifestyle. We are dedicated to fostering confidence and self-expression in our customers while prioritizing sustainable and ethical practices.

Our goal is to create a shopping experience that is seamless, inclusive, and inspiring, ensuring that everyone can find clothing that makes them look and feel their best.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
          We guarantee premium craftsmanship and use only the finest materials to ensure durability and style in every piece. Each product is rigorously inspected to meet our high-quality standards.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">Enjoy a seamless shopping experience with easy navigation, secure payment options, and fast delivery to your doorstep. Your satisfaction and time are our priorities.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our dedicated support team is here to assist you with any questions or concerns, ensuring a smooth and pleasant shopping journey. Your happiness is our commitment.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
}

export default About;
