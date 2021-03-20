const { session } = require("next-auth/client");
const useSubscription = require("../../../lib/mongoose/schemas/Subscription")
const mongooseConnect = require("../../../lib/mongoose/mongooseConnection");
const customErrors = require("../../../lib/custom_errors");
const requestLogger = require("../../../lib/request_logger");
const handle404 = customErrors.handle404;

mongooseConnect();

const Subscription = useSubscription();

export default (req, res) => {
  requestLogger(req);
  if (req.method === "GET") {
    Subscription.findOne({ user: req.query.user})
      .then(handle404)
      .then((subscription) => {
        return res.status(200).json(subscription);
      })
      .catch((err) => res.status(400).json({ message: err.message }));
    } else if (req.method === "DELETE" && session) {
      Subscription.findOne({ user: req.query.user })
        .then(handle404)
        .then(subscription => subscription.deleteOne())
        .then(() => res.status(204).json({ message: "Subscription Deleted" }))
        .catch((err) => res.status(400).json({ message: err.message }));
    } else if (req.method === "PUT" && session) {
      Subscription.findOne({ user: req.query.user })
      .then(handle404)
      .then(() => {
        Object.assign(article, req.body);
        return article.save();
        })
        .then((editedSubscription) => res.status(202).json(editedSubscription))
        .catch((err) => res.status(400).json({ message: err.message }));
    } else {
      return res
        .status(405)
        .json({ message: `${req.method} method not allowed` });
    }
  };
