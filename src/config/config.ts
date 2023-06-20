const config = {
    PORT: Number(process.env.PORT) || 3000,
    HOSTNAME: process.env.HOSTNAME || "localhost",
    MONGODB_URI:
        process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/quizz-game",
};

export default config;
