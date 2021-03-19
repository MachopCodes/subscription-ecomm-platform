import { connect } from 'mongoose';

const mongooseConnect = () => {
	return connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
};

module.exports = mongooseConnect;