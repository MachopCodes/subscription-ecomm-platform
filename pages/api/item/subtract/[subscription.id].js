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
      Subscription.findById(req.query['subscription.id'])
      .then(handle404)
      .then(subscription => {
            const name = req.body.item.name, cost = req.body.item.cost
            const index = subscription.items.findIndex(i => {
                i.name === name && i.cost === cost
            })
            subscription.items.splice(index, 1)
            return subscription.save()
            })
            .then(subscription => res.status(201).json(subscription))
            .catch((err) => res.status(400).json({ message: err.message }));
        } 
    };
