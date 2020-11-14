const Router = require("koa-router");
const router = new Router({ prefix: "/sentences" });
const authentication = require("../middleware/authentication");
const { add, delete: del, query } = require("../controller/sentenceCTL");
router.post("/", add);
router.get("/", query);
router.delete("/:id", authentication, del);
module.exports = router;  