document.addEventListener("DOMContentLoaded", () => {
  console.log("script is running");

  const ranking = document.querySelector("#ranking");
  console.log(ranking);

  let highScoreRanking = [];

  try {
    console.log("within try catch");
    highScoreRanking =
      JSON.parse(localStorage.getItem("highScoreRanking")) || [];
  } catch (error) {
    console.error("Error parsing highScoreRanking from localStorage:", error);
  }
  highScoreRanking.sort((current, next) => {
    return next.score - current.score;
  });
  topFivePlayers = highScoreRanking.slice(0, 5);

  topFivePlayers.forEach((entry, index) => {
    const rankingItem = document.createElement("div");
    rankingItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
    ranking.appendChild(rankingItem);
  });
});
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  const gameEnd = document.querySelector("#game-end");
  const gameIntro = document.querySelector("#game-intro");
  gameEnd.style.display = "none";
  gameIntro.style.display = "block";
});
