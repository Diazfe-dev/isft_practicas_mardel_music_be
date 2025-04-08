import { Router } from "express";

const calendarRouter = Router();

calendarRouter.get('/', (req, res) => {
    res.send('Hello World!');
});

export default calendarRouter;