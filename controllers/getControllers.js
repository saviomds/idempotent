import User from "../models/User.js";

import bcrypt from "bcryptjs";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user exists, set an error message
      return res.render("Register", {
        title: "Register",
        header: "Register ~ Idempotent",
        errorMessage: "User already exists with this email.",
      });
    }

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });

    // Save the user in the database
    await newUser.save();
    res.render("Login", {
      title: "Welcome | Idempotent",
      header: "Log in idempotent",
      errorMessage: "",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.render("Register", {
      title: "Register",
      header: "Register ~ Idempotent",
      errorMessage: "An error occurred while registering. Please try again.",
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("Login", {
        title: "Login",
        header: "Login ~ Idempotent",
        errorMessage: "No account found with this email.",
      });
    }

    // Compare the entered password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("Login", {
        title: "Login",
        header: "Login ~ Idempotent",
        errorMessage: "Incorrect password.",
      });
    }

    // Set session data for the logged-in user
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    // Redirect to the Dashboard or home page after successful login
    res.redirect("/Community");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.render("Login", {
      title: "Login",
      header: "Login ~ Idempotent",
      errorMessage: "An error occurred while logging in. Please try again.",
    });
  }
};

export const Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.redirect("/");
    }
    res.redirect("/Login");
  });
};
