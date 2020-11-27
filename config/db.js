// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://XiruiZhang:%2CYq.Jr%25%3B%2CeHn8.p@cluster0-2okru.mongodb.net/test?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;