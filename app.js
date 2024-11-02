// app.js
import express from "express";
import getRoutes from "./routes/getRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");
// Configure session middleware
app.use(
  session({
    secret: process.env.SECRET, // replace with an actual secret key in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // MongoDB URL
      collectionName: "sessions", // Name of the collection for sessions
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1-hour session
  })
);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Serve static files
app.use(express.static("public"));

// Use routes
app.use("/", getRoutes);
app.use("/", serviceRoutes);

// Route definitions
app.get("/", (req, res) => {
  res.render("Home", { title: "Welcome | Idempotent", header: "idempotent" });
});

app.get("/Home", (req, res) => {
  res.render("Home", {
    title: "Home | Idempotent",
    header: "idempotent",
  });
});

app.get("/Register", (req, res) => {
  res.render("Register", {
    title: "Register",
    header: "Register ~ Idempotent",
    errorMessage: null,
  });
});

app.get("/Login", (req, res) => {
  res.render("Login", {
    title: "Login",
    header: "Login ~ Idempotent",
    errorMessage: null,
  });
});

app.get("/Forget-password", (req, res) => {
  res.render("Forget-password", {
    title: "Forget Password",
    header: "Verify Your E-mail",
  });
});

app.get("/Projects", (req, res) => {
  res.render("Projects", {
    title: "Projects",
    header: "Projects ~ Idempotent",
  });
});

app.get("/Blog", (req, res) => {
  res.render("Blog", { title: "Blog", header: "Blog ~ Idempotent" });
});

app.get("/Contact", (req, res) => {
  res.render("Contact", { title: "Contact", header: "Contact ~ Idempotent" });
});

app.get("/Service-detail", (req, res) => {
  res.render("Service-detail", {
    title: "Service Detail",
    header: "Service Detail ~ Idempotent",
  });
});

app.get("/Community", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }
  res.render("Community", {
    title: "Join the Developer Community",
    header: "Join the Developer Community ~ Idempotent",
  });
});
app.get("/Profile", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }
  res.render("Profile", {
    title: "Profile",
    header: "Profile ~ Idempotent",
  });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
    header: "Page Not Found",
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server Started On Port http://localhost:${port}`)
);
