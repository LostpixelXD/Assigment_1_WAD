module.exports = {
    mediaList: [],

    // Add Anime/Manga entry
    addMedia(title, type, rating, review = "") {
        if (!title || title.trim() === "") {
            throw new Error("Title is required.");
        }
        if (this.mediaList.some(item => item.title.toLowerCase() === title.trim().toLowerCase())) {
            throw new Error(`Media title: '${title}' already exists.`);
        }
        if (type !== "Anime" && type !== "Manga") {
            throw new Error("Type must be either 'Anime' or 'Manga'.");
        }
        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 10) {
            throw new Error("Rating must be a number between 1 and 10.");
        }

        this.mediaList.push({
            title: title.trim(),
            type: type,
            rating: numRating,
            review: review
        });

        return `Media title: '${title.trim()}' has been added`;
    },

    // Update review and rating by title
    updateReview(title, rating, review) {
        const item = this.mediaList.find(m => m.title.toLowerCase() === title.trim().toLowerCase());
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

    // Delete entry by title
    deleteMediaByTitle(title) {
        const index = this.mediaList.findIndex(m => m.title.toLowerCase() === title.trim().toLowerCase());
        if (index === -1) {
            return "Unable to find a record to delete.";
        }

        const deletedItem = this.mediaList.splice(index, 1)[0];
        return `Record '${deletedItem.title}' is deleted!`;
    },

    // Retrieve all entries
    getAllMedia() {
        return this.mediaList;
    }
};