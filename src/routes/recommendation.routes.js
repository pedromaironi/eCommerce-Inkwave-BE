const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const recommendationController = require("../controllers/recommendation.controller");

// Define the route for recommendation
router.route("/:id_usuario").get(async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);

  const pythonProcess = spawn("python", [
    "./python/BasedContentRecommendation.py",
    id_usuario,
  ]);
  let errors = "";
  let recommendations = "";

  pythonProcess.stdout.on("data", (data) => {
    recommendations += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errors += data.toString();
  });

  await pythonProcess.on("close", async (code) => {
    if (code === 0) {
      const recommendationNumbers = recommendations
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => parseInt(line.trim()));

      const recommendedProducts =
        await recommendationController.fetchRecommendedProducts(
          id_usuario,
          recommendationNumbers
        );
      res.json(recommendedProducts);
    } else {
      console.error(`Python process finished with exit code ${code}`);
      console.error("Python script errors:", errors);
      res
        .status(500)
        .send("An error occurred while generating recommendations.");
    }
  });
});
router.route("/interactions/:id_usuario").get(async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);
  if (id_usuario >= 0) {
    const pythonProcess = spawn("python", [
      "./python/ClicksContentRecommendation.py",
      id_usuario,
    ]);
    let errors = "";
    let recommendations = [];

    pythonProcess.stdout.on("data", (data) => {
      recommendations += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errors += data.toString();
    });

    await pythonProcess.on("close", async (code) => {
      if (code === 0) {
        const recommendedProducts =
          await recommendationController.fetchRecommendedProducts(
            id_usuario,
            JSON.parse(recommendations.trim())
          );
        res.json(recommendedProducts);
      } else {
        console.error(`Python process finished with exit code ${code}`);
        console.error("Python script errors:", errors);
        res
          .status(500)
          .send("An error occurred while generating recommendations.");
      }
    });
  }
});

module.exports = router;
