import mongoose from "mongoose";
import mongooseConnect from "../mongooseConnection";

mongooseConnect();

const useItem = () => {
  const itemSchema = new mongoose.Schema(
    {
      catname: { type: String, required: true },
      cost: { type: Number, required: true }
    },
  );
};

module.exports = useItem;
