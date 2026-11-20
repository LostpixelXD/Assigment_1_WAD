const readline = require("readline");


let isConnected = false;
let mediaList = [];

const animeManager = {
    connect() {
        isConnected = true;
        return "Connected to local Anime/Manga Watchlist storage.";
    },

    addMedia(title, type, rating, review = "") {
        if (!isConnected) {
            throw new Error("Database not connected. Please select Option 1 first.");
        }
        if (!title || title.trim() === "") {
            throw new Error("Title is required.");
        }
        if (mediaList.some(item => item.title.toLowerCase() === title.trim().toLowerCase())) {
            throw new Error(`Media title: '${title}' already exists.`);
        }
        if (type !== "Anime" && type !== "Manga") {
            throw new Error("Type must be either 'Anime' or 'Manga'.");
        }
        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 10) {
            throw new Error("Rating must be a number between 1 and 10.");
        }

        mediaList.push({
            title: title.trim(),
            type: type,
            rating: numRating,
            review: review
        });

        return `Media title: '${title.trim()}' has been added`;
    },

    updateReview(title, rating, review) {
        if (!isConnected) {
            throw new Error("Database not connected. Please select Option 1 first.");
        }
        const item = mediaList.find(m => m.title.toLowerCase() === title.trim().toLowerCase());
        if (!item) {
            return "Unable to find record to update.";
        }

        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 10) {
            throw new Error("Rating must be a number between 1 and 10.");
        }

        item.rating = numRating;
        item.review = review;
        return `Record '${item.title}' is updated!`;
    },

    deleteMediaByTitle(title) {
        if (!isConnected) {
            throw new Error("Database not connected. Please select Option 1 first.");
        }
        const index = mediaList.findIndex(m => m.title.toLowerCase() === title.trim().toLowerCase());
        if (index === -1) {
            return "Unable to find a record to delete.";
        }

        const deletedItem = mediaList.splice(index, 1)[0];
        return `Record '${deletedItem.title}' is deleted!`;
    },

    getAllMedia() {
        if (!isConnected) {
            throw new Error("Database not connected. Please select Option 1 first.");
        }
        return mediaList;
    },

    disconnect() {
        isConnected = false;
        return "Disconnected from local storage.";
    }
};

module.exports = animeManager;

if (require.main === module) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const questions = "Choose an option:\n" +
        "1. Connect to database\n" +
        "2. Add Anime / Manga\n" +
        "3. Update Review & Rating\n" +
        "4. Delete Anime / Manga\n" +
        "5. Print Watched & Read Summary Report\n" +
        "6. Get All Raw Entries\n" +
        "7. Exit\n" +
        "==========================\n";

    function promptMenu() {
        setTimeout(() => {
            rl.question(questions, handleOption);
        }, 1000);
    }

    function handleOption(option) {
        switch (+option) {
            case 1:
                connect();
                break;
            case 2:
                addMedia();
                break;
            case 3:
                updateReview();
                break;
            case 4:
                deleteMedia();
                break;
            case 5:
                getSummaryReport();
                break;
            case 6:
                getAllEntries();
                break;
            case 7:
                animeManager.disconnect();
                rl.close();
                break;
            default:
                console.log("Invalid option selected.");
                promptMenu();
                break;
        }
    }

    rl.on("close", function () {
        console.log("\nProgram Shutdown");
        process.exit(0);
    });

    // Option 1: Connect to database
    function connect() {
        try {
            console.log(animeManager.connect());
        } catch (error) {
            console.log(error.message);
        }
        promptMenu();
    }

    // Option 2: Add Anime/Manga entry
    function addMedia() {
        rl.question("Enter Title: ", function (title) {
            rl.question("Enter Type (Anime/Manga): ", function (type) {
                rl.question("Enter Rating (1-10): ", function (rating) {
                    rl.question("Enter Review: ", function (review) {
                        try {
                            console.log(animeManager.addMedia(title, type, rating, review));
                        } catch (error) {
                            console.log(error.message);
                        }
                        promptMenu();
                    });
                });
            });
        });
    }

    // Option 3: Update review and rating by title
    function updateReview() {
        rl.question("Enter Title of item to update: ", function (title) {
            rl.question("Enter New Rating (1-10): ", function (rating) {
                rl.question("Enter New Review: ", function (review) {
                    try {
                        console.log(animeManager.updateReview(title, rating, review));
                    } catch (error) {
                        console.log(error.message);
                    }
                    promptMenu();
                });
            });
        });
    }

    // Option 4: Delete entry by title
    function deleteMedia() {
        rl.question("Enter Title to delete: ", function (title) {
            try {
                console.log(animeManager.deleteMediaByTitle(title));
            } catch (error) {
                console.log(error.message);
            }
            promptMenu();
        });
    }

    // Option 5: Print summary report of completed series & read manga
    function getSummaryReport() {
        try {
            const list = animeManager.getAllMedia();
            console.log("\n=============================================");
            console.log("       WATCHED & READ SUMMARY REPORT          ");
            console.log("=============================================");

            const animeList = list.filter(item => item.type === "Anime");
            const mangaList = list.filter(item => item.type === "Manga");

            console.log("\n--- WATCHED ANIME ---");
            if (animeList.length === 0) console.log("No anime entries in list.");
            animeList.forEach(item => {
                console.log(`• Title: ${item.title} | Rating: ${item.rating}/10`);
                console.log(`  Review: ${item.review || "No review provided"}`);
            });

            console.log("\n--- READ MANGA ---");
            if (mangaList.length === 0) console.log("No manga entries in list.");
            mangaList.forEach(item => {
                console.log(`• Title: ${item.title} | Rating: ${item.rating}/10`);
                console.log(`  Review: ${item.review || "No review provided"}`);
            });
            console.log("=============================================\n");
        } catch (error) {
            console.log(error.message);
        }
        promptMenu();
    }

    // Option 6: Get raw list from DB
    function getAllEntries() {
        try {
            console.log(animeManager.getAllMedia());
        } catch (error) {
            console.log(error.message);
        }
        promptMenu();
    }

    
    rl.question(questions, handleOption);
}