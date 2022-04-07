const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
const db = require("./app/models");
db.sequelize.sync();

require("./bulkOperations")

require("./app/routes/transaction.routes")(app);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})