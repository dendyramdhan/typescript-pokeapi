import { Application } from "express";
import { PokeService } from "../services/pokemon.service";
import IController from "./IController";

export class PokeController implements IController {
    private pokeService: PokeService;

    constructor(private app: Application) {
        this.pokeService = new PokeService();
        this.routes();
    }

    public routes(): void {
        this.app.route('/').get(this.pokeService.welcomeMessage);
        this.app.route('/pokemons').get(this.pokeService.getAllPokemon);
        this.app.route('/pokemon').post(this.pokeService.addNewPokemon);
        this.app.route('/pokemon/:id')
            .delete(this.pokeService.deletePokemon)
            .put(this.pokeService.updatePokemon);
    }
}