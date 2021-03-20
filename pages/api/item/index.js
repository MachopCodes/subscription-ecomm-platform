const { session } = require("next-auth/client");
const useItem = require("../../../lib/mongoose/schemas/Item");
const mongooseConnect = require("../../../lib/mongoose/mongooseConnection");
const customErrors = require("../../../lib/custom_errors");
const requestLogger = require("../../../lib/request_logger");
const handle404 = customErrors.handle404;

mongooseConnect();

const Item = useItem();

export default (req, res) => {
  requestLogger(req);
  if (req.method === "GET") {
    Item.find()
      .then((items) => {
        return res.status(200).json(items);
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  } else if (req.method === "POST" && session) {
    Item.create(req.body.data)
      .then((item) => res.status(201).json(item))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else if (req.method === "DELETE" && session) {
    Item.findById(req.body)
      .then(handle404)
      .then((item) => item.deleteOne())
      .then(() => res.status(204).json({ message: "Item Deleted" }))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else if (req.method === "PUT" && session) {
    Item.findById(req.body)
      .then(handle404)
      .then((item) => {
        Object.assign(item, req.body);
        return item.save();
      })
      .then((editedItem) => res.status(202).json(editedItem))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} method not allowed` });
  }
};
