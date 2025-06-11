const express = require("express");
const userRouter = require("./src/routers/user.router");
const employeeRouter = require("./src/routers/employee.router");
const app = express();
const cors = require("cors");
const taskRouter = require("./src/routers/task.router");
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = 3000;
app.use(express.json());
app.use(userRouter);
app.use(employeeRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
