import mongoose from "mongoose";
import mongooseConnect from "../mongooseConnection";
import itemSchema from "./Item"

mongooseConnect();

const useSubscription = () => {
  const subSubscription = new mongoose.Schema(
    {
      duration: { type: String, required: true }, 
      quantity: { type: String, required: true },
      user:  { type: String, required: true },
      items: [{
        user: { type: String, required: true }, 
        catname: { type: String, required: true },
        cost: { type: String, required: true }
      }],
    },
    {
      timestamps: true,
    }
  );

  let Subscription;

  try {
    Subscription = mongoose.model("Subscription");
  } catch {
    Subscription = mongoose.model("Subscription", subSubscription);
  }

  return Subscription;
};

module.exports = useSubscription;
