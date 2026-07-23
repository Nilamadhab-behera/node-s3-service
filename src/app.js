import express from 'express';
import { PORT } from './utils/env.js';
import chalk from 'chalk';
import fileRouter from './routers/file.router.js';
import { errorMiddleware } from './utils/errorMiddleware.js';

let app = express();

// Setting Up For Handling Json & url bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
