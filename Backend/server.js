const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv/config");
const { errorHandler } = require("./Middleware/errorMiddleware");
const connectDB = require("./Config/db")

const port = process.env.PORT || 5000;

// run mongoose
connectDB();

// Boiler Plate middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", require("./Routes/GoalRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on Port:${port}`));
