const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./config/passport-googleAuth-strategy");

const path = require("path");

let port = process.env.PORT || 5000;
const app = express();
dotenv.config();
connectToMongo();
app.use(express.json())


app.use(
  cors({
    origin: process.env.ORIGIN_URL || "*", // Allow frontend origin, default to all if not set
    credentials: true, // Allow cookies and auth headers
    allowedHeaders: ["Content-Type", "Authorization"], // Allow commonly used headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow common HTTP methods
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: "ssid",
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("HELLO FROM API");
});

app.use("/user", require("./routes/user/User"));
app.use("/auth", require("./routes/user/Auth"));
app.use("/clubs", require("./routes/club/Club"));
app.use("/display", require("./routes/display/Display"));
app.use("/payment", require("./routes/payment/Payment"));
app.use("/product", require("./routes/shop/Products"));
app.use("/events", require("./routes/events/Event"));
app.use("/query", require("./routes/query/Request"));

app.listen(port, () => console.log("API IS RUNNING 🚀 at port:", port));
