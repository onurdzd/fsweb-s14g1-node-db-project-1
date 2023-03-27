const router = require("express").Router();
const AccModel = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let accounts = await AccModel.getAll();
    res.status(201).json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let account = await AccModel.getById(req.id);
    res.status(201).json(account[0]);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let newUser = await AccModel.create(req.accCheckedPayload);
      res.status(201).json(newUser[0]);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountPayload,
  mw.checkAccountId,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      await AccModel.updateById(req.id, req.accCheckedPayload);
      let changedUser = await AccModel.getById(req.id);
      res.status(200).json(changedUser[0]);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let deletedUser = await AccModel.getById(req.id);
    await AccModel.deleteById(req.id);
    res
      .status(201)
      .json({ deletedUser, message: req.id + " id nolu account silindi" });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res
    .status(err.status || 400)
    .json({ message: err.message, customMessag: "Server hatası" });
});

module.exports = router;
