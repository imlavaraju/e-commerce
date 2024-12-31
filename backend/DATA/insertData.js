import mongoose from "mongoose";
import product from "../models/product.js";
import {data} from "./data.js";
import "dotenv/config";


mongoose
  .connect("mongodb+srv://imnanilavaraju:imnanilavaraju@chat.q85qs.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ecommerce")
  .then(() => console.log("db connection is success"))
  .catch(() =>
    console.log("db connection is not success some error is occured")
  );



const Pdata = data;

// console.log(Pdata)
function insertData() {
  product
    .create(Pdata)
    .then(() => console.log("data insert successfully "))
    .catch(() => console.log("data not insert some error is occured!"));
}

 //insertData();