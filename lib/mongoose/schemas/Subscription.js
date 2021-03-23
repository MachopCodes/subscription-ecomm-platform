import mongoose from "mongoose";
import mongooseConnect from "../mongooseConnection";

mongooseConnect();

const useSubscription = () => {
  const itemSchema = new mongoose.Schema(
    {
      catname: { type: String, required: true },
      cost: { type: String, required: true }
    },
  );

  const subSubscription = new mongoose.Schema(
    {
      subscription: { type: String, required: true }, 
      user:  { type: String, required: true },
      items: [itemSchema]
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
