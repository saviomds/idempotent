import express from "express";
import ejs from "ejs";
import getRoutes from "./routes/getRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files
app.use(express.static("public"));

// Use routes
app.use("/", getRoutes);
app.use("/", serviceRoutes);

// Optional: Render pages
app.get("/", (req, res) => {
  res.render("Home", {
    title: "Welcome | Idempotent ",
    header: "idempotent ",
  });
});
app.get("/Home", (req, res) => {
  res.render("Home", {
    title: "Home | Idempotent ",
    header: "idempotent ",
  });
});

app.get("/Register", (req, res) => {
  res.render("Register", {
    title: "Register",
    header: "Register ~ Idempotent",
  });
});

app.get("/Login", (req, res) => {
  res.render("Login", { title: "Login", header: "Login ~ Idempotent" });
});
app.get("/Forget-password", (req, res) => {
  res.render("Forget-password", {
    title: "Forget-password",
    header: "Verify your e-mail ",
  });
});
app.get("/Projects", (req, res) => {
  res.render("Projects", {
    title: "Projects",
    header: "Projects ~ Idempotent",
  });
});
app.get("/Blog", (req, res) => {
  res.render("Blog", {
    title: "Blog",
    header: "Blog ~ Idempotent",
  });
});
app.get("/Contact", (req, res) => {
  res.render("Contact", {
    title: "Contact",
    header: "Contact ~ Idempotent",
  });
});
app.get("/Service-detail", (req, res) => {
  res.render("Service-detail", {
    title: "Service-detail",
    header: "Service-detail ~ Idempotent",
  });
});
app.get("/Community", (req, res) => {
  res.render("Community", {
    title: "Join the Developer Community",
    header: "Join the Developer Community ~ Idempotent",
  });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 Not Found",
    header: "Page Not Found",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server Started On Port http://localhost:${port}`)
);
