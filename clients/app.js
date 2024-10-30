import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import getRoutes from "./routes/getRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js"; // Importing the service routes

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.set("view engine", "ejs");
app.use(express.static("public"));

// Use auth routes
app.use("/", getRoutes);
app.use("/", serviceRoutes);

// Optional: If you want to render the login and register pages
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
    header: "register ~ Idempotent",
  });
});

app.get("/Login", (req, res) => {
  res.render("Login", { title: "Login", header: "register ~ Idempotent" });
});
app.get("/Projects", (req, res) => {
  res.render("Projects", {
    title: "Projects",
    header: "Projeccts ~ Idempotent",
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
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server Started On Port http://localhost:${port}`)
);
