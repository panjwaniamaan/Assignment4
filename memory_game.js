document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const beginnerButton = document.getElementById("beginner");
    const intermediateButton = document.getElementById("intermediate");
    const advancedButton = document.getElementById("advanced");
    const clearBoardButton = document.getElementById("clear-board");

    const images = {
        beginner: ["images/B1.png", "images/B2.png", "images/B3.png", "images/B4.png"],
        intermediate: ["images/I1.png", "images/I2.png", "images/I3.png", "images/I4.png", "images/I5.png"],
        advanced: ["images/A1.png", "images/A2.png", "images/A3.png", "images/A4.png", "images/A5.png", "images/A6.png"],
    };

    let flippedTiles = [];
    let matchedPairs = 0;

    function setupGame(level) {
        gameBoard.innerHTML = ""; // Clear the board
        gameBoard.dataset.level = level; // Set the grid level for CSS
        const levelImages = images[level];
        const pairedImages = [...levelImages, ...levelImages]; // Duplicate images for pairs
        const shuffledImages = pairedImages.sort(() => Math.random() - 0.5); // Shuffle images
        matchedPairs = 0;

        // Create tiles
        shuffledImages.forEach((img) => {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.dataset.image = img;

            const frontFace = document.createElement("div");
            frontFace.classList.add("front");
            frontFace.style.backgroundImage = "url('images/blank.png')"; // Use blank image
            frontFace.style.backgroundSize = 'contain';
            frontFace.style.backgroundPosition = 'center';
            frontFace.style.backgroundRepeat = 'no-repeat';

            const backFace = document.createElement("div");
            backFace.classList.add("back");
            backFace.style.backgroundImage = `url(${img})`;
            backFace.style.backgroundSize = 'contain';
            backFace.style.backgroundPosition = 'center';
            backFace.style.backgroundRepeat = 'no-repeat';

            tile.appendChild(frontFace);
            tile.appendChild(backFace);
            gameBoard.appendChild(tile);
        });

        setupTileEventListeners();
    }

    function setupTileEventListeners() {
        const tiles = document.querySelectorAll(".tile");

        tiles.forEach((tile) => {
            tile.addEventListener("click", () => {
                if (
                    flippedTiles.length < 2 &&
                    !tile.classList.contains("flipped") &&
                    !tile.classList.contains("matched")
                ) {
                    tile.classList.add("flipped");
                    flippedTiles.push(tile);

                    if (flippedTiles.length === 2) {
                        setTimeout(checkMatch, 500);
                    }
                }
            });
        });
    }

    function checkMatch() {
        const [tile1, tile2] = flippedTiles;
        if (tile1.dataset.image === tile2.dataset.image) {
            // It's a match
            tile1.classList.add("matched");
            tile2.classList.add("matched");
            matchedPairs++;

            // Check if all pairs are matched
            const totalPairs = images[gameBoard.dataset.level].length;
            if (matchedPairs === totalPairs) {
                setTimeout(() => {
                    alert("Congratulations! You matched all the pairs!");
                }, 500);
            }
        } else {
            // No match, flip back
            tile1.classList.remove("flipped");
            tile2.classList.remove("flipped");
        }
        flippedTiles = [];
    }

    beginnerButton.addEventListener("click", () => setupGame("beginner"));
    intermediateButton.addEventListener("click", () => setupGame("intermediate"));
    advancedButton.addEventListener("click", () => setupGame("advanced"));
    clearBoardButton.addEventListener("click", () => {
        gameBoard.innerHTML = "";
        matchedPairs = 0;
    });
});
