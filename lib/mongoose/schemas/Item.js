import mongoose from "mongoose";
import mongooseConnect from "../mongooseConnection";

mongooseConnect();

const useItem = () => {
  const itemSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, maxlength: 60 },
      cost: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  let Item;

  try {
    Item = mongoose.model("Item");
  } catch {
    Item = mongoose.model("Item", itemSchema);
  }

  return Employee;
};

module.exports = useItem;
