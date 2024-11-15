const projectData = require("./modules/projects");
const path = require("path");

const express = require('express');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render("home");
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.get("/solutions/projects", async (req, res) => {
  try {
    if (req.query.sector) {
      let projects = await projectData.getProjectsBySector(req.query.sector);
      res.render("projects", { projects: projects });
    } else {
      let projects = await projectData.getAllProjects();
      res.render("projects", { projects: projects });
    }
  } catch (err) {
    res.status(404).render("404", { error: err });
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  try {
    let project = await projectData.getProjectById(req.params.id);
    res.render("project", { project: project });
  } catch (err) {
    res.status(404).render("404", { error: err });
  }
});

app.use((req, res, next) => {
  res.status(404).render("404");
});


projectData.initialize().then(() => {
  app.listen(HTTP_PORT, () => { console.log(`server listening on: ${HTTP_PORT}`) });
});