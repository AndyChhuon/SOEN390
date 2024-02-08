//Node .
// Runs on http://localhost:8080

const express = require("express");
const app = express();
const PORT = 8080;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.json());

app.post();
