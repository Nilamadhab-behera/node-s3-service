import express from 'express';
import { PORT, WHITELIST_DOMAINS } from './utils/env.js';
import chalk from 'chalk';
import fileRouter from './routers/file.router.js';
import { errorMiddleware } from './utils/errorMiddleware.js';
import cors from 'cors';

let app = express();

// Setting Up For Handling Json & url bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting Up Cors Policy
app.use(cors({
    origin: function (origin, callback) {
        // Requests like Postman/server-to-server may not have Origin
        if (!origin) return callback(null, true);

        if (WHITELIST_DOMAINS.includes(origin)) return callback(null, true);

        return callback(new Error("Not Allowed By Cors"), null);
    },
    methods: ["GET", "POST"],
    allowedHeaders: ['content-Type', 'Authorization'],
    optionsSuccessStatus: 200
}));

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && WHITELIST_DOMAINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials","true");
    }

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.get('/health-check', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Health Is Ok!"
    });
});

app.use('/api/v1/file', fileRouter);

app.use((_, __, next) => {
    let error = new Error("Invalid Endpoint");
    error.status = 502;
    next(error);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(chalk.bgBlueBright(`Server is running on port ${PORT}`));
});
