const projectData = require("./modules/projects");
const path = require("path");
const express = require('express');

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Setting up EJS view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
  res.render("home");
});

// About route
app.get('/about', (req, res) => {
  res.render("about");
});

// Projects route with sector filtering
app.get("/solutions/projects", async (req, res) => {
  try {
    let projects;

    if (req.query.sector) {
      projects = await projectData.getProjectsBySector(req.query.sector);
    } else {
      projects = await projectData.getAllProjects();
    }

    res.render("projects", { projects });
  } catch (err) {
    res.status(404).render("404", { error: err.message });
  }
});

// Project details route
app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const project = await projectData.getProjectById(req.params.id);
    res.render("project", { project });
  } catch (err) {
    res.status(404).render("404", { error: err.message });
  }
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).render("404");
});

// Initialize project data and start the server
projectData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.error(`Failed to start the server: ${err.message}`);
  });
