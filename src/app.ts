import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// Controllers
import { PokeController } from "./controllers/pokemon.controller";

// Constants
import { MONGO_URL } from "./constants/pokeApi.constants";

class App {
    public app: Application;
    private pokeController: PokeController;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        this.pokeController = new PokeController(this.app);
    }

    private setConfig(): void {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
    }

    private setMongoConfig(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(MONGO_URL, { useNewUrlParser: true }).then(() => console.log(`MongoDB connected on ${MONGO_URL}`), err => console.log(err));
    }
}

export default new App().app;