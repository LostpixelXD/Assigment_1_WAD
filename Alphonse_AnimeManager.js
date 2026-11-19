const db = require("./services/dbservice.js");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let questions = "Choose an option:\n"+
"1. Connect to MongoDB\n"+
"2. Add Anime / Manga\n"+
"3. Update Review & Rating\n"+
"4. Delete Anime / Manga\n"+
"5. Print Watched & Read Summary Report\n"+
"6. Get All Raw Entries\n"+
"7. Exit\n"+
"==========================\n";

let handleOption = function(option){
    switch(+option) {
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
            rl.close();
            break;
        default:
            console.log("Invalid option selected.");
            setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
            break;
    }
}
rl.question(questions, handleOption);

// Option 7: Disconnect from database
rl.on("close", function() {
    console.log("\nProgram Shutdown");
    process.exit(0);
});

// Option 1: Connect to database
function connect() {
    db.connect()
    .then(function(response){
        console.log(response);
        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    })
    .catch(function(error){
        console.log(error.message);
        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    });
}

// Option 2: Add Anime/Manga entry
function addMedia() {
    rl.question("Enter Title: ", function(title) {
        rl.question("Enter Type (Anime/Manga): ", function(type) {
            rl.question("Enter Rating (1-10): ", function(rating) {
                rl.question("Enter Review: ", function(review) {
                    db.addMedia(title, type, Number(rating), review)
                    .then(function(response){
                        console.log(response);
                        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
                    })
                    .catch(function(error){
                        console.log(error.message);
                        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
                    });
                });
            });
        });
    });
}

// Option 3: Update review and rating by title
function updateReview() {
    rl.question("Enter Title of item to update: ", function(title) {
        rl.question("Enter New Rating (1-10): ", function(rating) {
            rl.question("Enter New Review: ", function(review) {
                db.updateReview(title, Number(rating), review)
                .then(function(response){
                    console.log(response);
                    setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
                })
                .catch(function(error){
                    console.log(error.message);
                    setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
                });
            });
        });
    });
}

// Option 4: Delete entry by title
function deleteMedia() {
    rl.question("Enter Title to delete: ", function(title) {
        db.deleteMediaByTitle(title)
        .then(function(response){
            console.log(response);
            setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
        })
        .catch(function(error){
            console.log(error.message);
            setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
        });
    });
}

// Option 5: Print summary report of completed series & read manga
function getSummaryReport() {
    db.getAllMedia()
    .then(function(mediaList){
        console.log("\n=============================================");
        console.log("       WATCHED & READ SUMMARY REPORT          ");
        console.log("=============================================");

        let animeList = mediaList.filter(item => item.type === 'Anime');
        let mangaList = mediaList.filter(item => item.type === 'Manga');

        console.log("\n--- WATCHED ANIME ---");
        if (animeList.length === 0) console.log("No anime entries in list.");
        animeList.forEach(item => {
            console.log(`• Title: ${item.title} | Rating: ${item.rating}/10`);
            console.log(`  Review: ${item.review || 'No review provided'}`);
        });

        console.log("\n--- READ MANGA ---");
        if (mangaList.length === 0) console.log("No manga entries in list.");
        mangaList.forEach(item => {
            console.log(`• Title: ${item.title} | Rating: ${item.rating}/10`);
            console.log(`  Review: ${item.review || 'No review provided'}`);
        });
        console.log("=============================================\n");

        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    })
    .catch(function(error){
        console.log(error.message);
        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    });
}

// Option 6: Get raw list from DB
function getAllEntries() {
    db.getAllMedia()
    .then(function(response){
        console.log(response);
        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    })
    .catch(function(error){
        console.log(error.message);
        setTimeout(()=>{rl.question(questions, handleOption);}, 1500);
    });
}