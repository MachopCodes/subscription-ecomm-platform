import mongoose from "mongoose";
import mongooseConnect from "../mongooseConnection";

mongooseConnect();

const useItem = () => {
  const itemSchema = new mongoose.Schema(
    {
      user: { type: String, required: true }, 
      catname: { type: String, required: true },
      cost: { type: String, required: true }
    },
    {
      timestamps: true,
    }
  );
};

module.exports = useItem;
