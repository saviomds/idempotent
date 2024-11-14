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

dotenv.config(); // Load environment variables

const app = express();
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

  res.render("Followers", {
    title: "Followers",
    header: "",
  });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found | idempotent",
    header: "Page Not Found",
  });
});
// Endpoint to handle form submission
app.post("/Forget-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.render("Forget-password", {
      title: "Forget-password | idempotent",
      header: "Verify Your E-mail ~ Idempotent",
      message: "Email is required",
    });
  }

  // Generate a code and set its expiration time
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Store the code and expiration
  codes[email] = { code, expirationTime };

  // Send email using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is ${code}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Verification code sent!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Endpoint to verify code
app.post("/verify", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).send("Email and code are required");
  }

  const storedCodeData = codes[email];
  if (storedCodeData) {
    if (Date.now() > storedCodeData.expirationTime) {
      delete codes[email];
      return res.status(400).send("Code has expired");
    }
    if (storedCodeData.code === code) {
      delete codes[email];
      return res.send("Code verified successfully");
    } else {
      return res.status(400).send("Invalid code");
    }
  } else {
    return res.status(400).send("No code found for this email");
  }
});
app.get("/Followers", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    const allUsers = await User.find({ _id: { $ne: req.user._id } });
    console.log("Users fetched:", allUsers); // Log the fetched users

    res.render("Followers", { users: allUsers });
  } catch (err) {
    console.error("Error fetching users:", err);
    next(err); // Use centralized error handling
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server Started On Port http://localhost:${port}`)
);
