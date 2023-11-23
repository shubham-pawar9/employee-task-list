const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;
// Example CORS configuration in Express
const cors = require("cors");

const corsOptions = {
  origin: "https://employee-task-list.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://shubhpawar9596:DDQpCtncqlCoNENH@cluster0.3ggf80s.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const employeeSchema = new mongoose.Schema({
  employeeId: Number,
  employeeName: String,
  additionalData: [
    {
      date: String,
      data: String,
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

app.use(cors());
app.use(express.json());

app.get("/api/employee-list", async (req, res) => {
  try {
    const employeeList = await Employee.find({}, { _id: 0, __v: 0 });
    console.log("Employee List:", employeeList);
    res.json(employeeList);
  } catch (error) {
    console.error("Error fetching employee list:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the employee list" });
  }
});

app.post("/api/employee", async (req, res) => {
  const { employeeId, employeeName } = req.body;

  if (!employeeId || !employeeName) {
    return res
      .status(400)
      .json({ error: "Employee ID and Employee Name are required" });
  }

  try {
    const employeeExists = await Employee.exists({ employeeId });

    if (employeeExists) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    const newEmployee = new Employee({
      employeeId,
      employeeName,
      additionalData: [],
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the employee" });
  }
});

app.post("/api/update-additional-data", async (req, res) => {
  const { employeeId, additionalData } = req.body;

  if (!employeeId || !additionalData) {
    return res
      .status(400)
      .json({ error: "Employee ID and additional data are required" });
  }

  try {
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const currentDate = new Date().toLocaleDateString();
    employee.additionalData.push({
      date: currentDate,
      data: additionalData,
    });

    await employee.save();
    res.status(200).json({ message: "Additional data added successfully" });
  } catch (error) {
    console.error("Error updating additional data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating additional data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://shubhpawar9596:DDQpCtncqlCoNENH@cluster0.3ggf80s.mongodb.net/Cluster0?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
