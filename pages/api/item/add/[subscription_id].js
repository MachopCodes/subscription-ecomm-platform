const { session } = require("next-auth/client");
const useSubscription = require("../../../../lib/mongoose/schemas/Subscription")
const mongooseConnect = require("../../../../lib/mongoose/mongooseConnection");
const customErrors = require("../../../../lib/custom_errors");
const requestLogger = require("../../../../lib/request_logger");
const handle404 = customErrors.handle404;

mongooseConnect();

const Subscription = useSubscription();

export default (req, res) => {
  requestLogger(req);
  if (req.method === "POST" && session) {
      Subscription.findById(req.query.subscription_id)
        .then(handle404)
        .then(subscription => {
            if(subscription.subscription === 'Purrrfect' && subscription.items.length < 10) {
                subscription.items.push(req.body.item)
            } else if(subscription.subscription === 'Basic' && subscription.items.length < 5) {
              subscription.items.push(req.body.item)
            } else {
              subscription.items.pop()
              subscription.items.push(req.body.item)
            }
            return subscription.save()
            })
            .then(subscription => res.status(201).json(subscription))
            .catch((err) => res.status(400).json({ message: err.message }));
        } 
    };
