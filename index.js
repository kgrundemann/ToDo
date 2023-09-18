import express from "express";

const app = express();
const port = 3000;
const tasks = [];

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 

function getCurrentDate() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
}



app.get("/", (req, res) => {
  res.render("index", { currentDate: getCurrentDate(), tasks: tasks });
});

app.get("/work", (req, res) => {
  res.render("work",{ currentDate: getCurrentDate(), tasks: tasks });
});

app.post("/addWorkTask", (req, res) => {
  const newTask = req.body.task;
  if (newTask.trim() !== "") { 
    tasks.push(newTask);
  }
  res.redirect("/work"); 
});

app.post("/addTask", (req, res) => {
  const newTask = req.body.task;
  if (newTask.trim() !== "") { 
    tasks.push(newTask);
  }
  res.redirect("/"); 
});

app.post("/removeTask", (req, res) => {
  const indexToRemove = req.body.index;
  if (indexToRemove >= 0 && indexToRemove < tasks.length) {
    tasks.splice(indexToRemove, 1);
  }
  res.redirect("/");
});

app.post("/removeWorkTask", (req, res) => {
  const indexToRemove = req.body.index;
  if (indexToRemove >= 0 && indexToRemove < tasks.length) {
    tasks.splice(indexToRemove, 1);
  }
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
