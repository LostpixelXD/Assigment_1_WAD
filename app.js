const animeManager = require("./Alphonse_AnimeManager.js");


function printSummaryReport() {
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
}


try {
    // 1. Add Anime / Manga entries
    console.log(animeManager.addMedia("Fullmetal Alchemist: Brotherhood", "Anime", 10, "Masterpiece story and pacing."));
    console.log(animeManager.addMedia("Berserk", "Manga", 9, "Incredible artwork and dark fantasy world."));
    console.log(animeManager.addMedia("Attack on Titan", "Anime", 8, "Great action and plot twists."));

    // 2. Update Review & Rating
    console.log(animeManager.updateReview("Attack on Titan", 9, "Rewatched and appreciated the foreshadowing even more."));

    // 3. Delete Anime / Manga
    console.log(animeManager.deleteMediaByTitle("Berserk"));

    // 4. Print Watched & Read Summary Report
    printSummaryReport();

    // 5. Get All Raw Entries
    console.log("Raw Entries:", animeManager.getAllMedia());
} catch (error) {
    console.log("Error:", error.message);
}