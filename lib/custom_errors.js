  // if the client passes an ID that isn't in the DB, we want to return 404
  const handle404 = (record) => {
    if (!record) {
      throw new DocumentNotFoundError();
    } else {
      return record;
    }
  };
  
  module.exports = {
    handle404
  };
  