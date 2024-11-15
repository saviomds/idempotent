// app.js
import express from "express";
import getRoutes from "./routes/getRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import User from "./models/User.js";
import Message from "./models/Message.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const codes = {};

app.use(cors());

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    title: "Register | idempotent",
    header: "Register ~ Idempotent",
    errorMessage: null,
  });
});

app.get("/Login", (req, res) => {
  res.render("Login", {
    title: "Login | idempotent",
    header: "Login ~ Idempotent",
    errorMessage: null,
  });
});

app.get("/Forget-password", (req, res) => {
  res.render("Forget-password", {
    title: "Forget Password | idempotent",
    header: "Verify Your E-mail",
    message: null,
  });
});

app.get("/Projects", (req, res) => {
  res.render("Projects", {
    title: "Projects | idempotent",
    header: "Projects ~ Idempotent",
  });
});

app.get("/Blog", (req, res) => {
  res.render("Blog", {
    title: "Blog | idempotent",
    header: "Blog ~ Idempotent",
  });
});

app.get("/Contact", (req, res) => {
  res.render("Contact", {
    title: "Contact Us | idempotent",
    header: "Contact ~ Idempotent",
  });
});
app.get("/verify", (req, res) => {
  res.render("verify", {
    title: "Verify E-mail | idempotent",
    header: "verify ~ Idempotent",
  });
});

app.get("/Service-detail", (req, res) => {
  res.render("Service-detail", {
    title: "Service Detail | idempotent",
    header: "Service Detail ~ Idempotent",
  });
});

app.get("/Community", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }
  res.render("Community", {
    title: "Join the Developer Community | idempotent",
    header: "Join the Developer Community ~ Idempotent",
  });
});

app.get("/Profile", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }

  res.render("Profile", {
    title: "My Profile",
    header: "",
  });
});

app.get("/Followers", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/Login");
  }

  res.render("404", {
    title: "Try Again | idempotent",
    header: "Not Allow Use This Page, Ask Permission",
  });
});
app.get("/Chat", async (req, res) => {
  const messages = await Message.find().sort({ timestamp: 1 });
  res.render("Chat", { messages });
});

app.post("/Chat", async (req, res) => {
  try {
    const newMessage = new Message({
      username: req.body.username,
      message: req.body.message,
    });
    await newMessage.save(); // Use await instead of callback

    io.emit("newMessage", {
      username: req.body.username,
      message: req.body.message,
    });
    res.redirect("/chat");
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Error saving message");
  }
});

// Socket.io for real-time communication
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
// 404 Error Handling
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found | idempotent",
    header: "Page Not Found",
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server Started On Port http://localhost:${port}`)
);
