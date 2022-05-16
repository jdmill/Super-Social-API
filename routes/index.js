const router = require("express").Router();
const apiRoutes = require("./api");

route.use("/api", apiRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;