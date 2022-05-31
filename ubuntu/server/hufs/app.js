const app = require("express")();
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dayjs = require("dayjs");
require("dayjs/locale/ko");
const database = require("./utils/database");
const config = require("./config");
const { name, version } = require("./package");
const httpServer = require("http").createServer(app);
const { json } = require('./middlewares/result')
const session = require("express-session");
const FileStore = require('session-file-store')(session);



if (config.middleware.cors) app.use(cors());
app.use(session({
  secret: 'capstone',
  //http
  resave: false,
  saveUninitialized: true,
  store: new FileStore({ logFn: function () {} }),
  cookie: { maxAge: 60000 }
}))
dayjs.locale("ko");
logger.token("date", () => dayjs().format("YYYY-MM-DD HH:mm:ss"));
app.use(logger(config.middleware.morgan));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(database.sql.pool("pool", config.mysql));

// RESTful API
app.use("/api", require("./routes/common"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/myshop", require("./routes/myshop"));

//error
app.use(json.notFound);
app.use(json.result);
app.use(json.internalServerError);


httpServer.listen(process.env.PORT || config.port, async () => {
  const startMessage = `The ${name}(${config.env}) starts at ${
    process.env.PORT || config.port
  }(${version})`;
  console.info(startMessage);
});

module.exports = { app, httpServer };
