const { Router } = require("express");
const {
  allDogsDb,
  getAllDogs,
  apiDb,
  searchByName,
  searchById,
  handleNewDog,
  searchEndPoint,
} = require("../controllers/dogController");
const { Dog, Temperament } = require("../db");

const router = Router();

router.get("/test", async (req, res) => {
  try {
    const query = await allDogsDb();
    res.status(200).json(query);
  } catch (err) {
    console.log(err + "----//test error");
  }
});

router.get("/", async (req, res) => {
  try {
    const query = await apiDb();
    console.log(query);
    res.status(200).json(query);
  } catch (err) {
    console.log(err);
  }
});
router.get("/search", async (req, res) => {
  let name = req.query.name;
  try {
    const searchQuery = await searchByName(name);
    if (!searchQuery) return res.status(404);

    res.status(200).json(searchQuery);
  } catch (err) {
    console.log(err + "///dogs req.query route");
  }
});
router.get("/:id", async (req, res) => {

  const id = req.params.id;
  try {
    const idQuery = await searchById(id);
    res.status(200).json(idQuery);
  } catch (err) {
    console.log(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const postQuery = await handleNewDog(req.body);
    res.send(postQuery);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
