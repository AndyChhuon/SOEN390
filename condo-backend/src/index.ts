const { app } = require("./app");
const PORT = 8080;

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
