import { Request, Response } from "express";
import { WELCOME_MESSAGE } from "../constants/pokeApi.constants";
import { MongooseDocument } from "mongoose";

// Models
import { Pokemon } from "../models/pokemon.model";

export class PokeService {
    public welcomeMessage(req: Request, res: Response): Response {
        return res.status(200).send(WELCOME_MESSAGE);
    }

    public async getAllPokemon(req: Request, res: Response): Promise<Response> {
        try {
            const pokemon: MongooseDocument[] = await Pokemon.find();
            return res.json(pokemon);
        } catch (err) {
            return res.send(err);
        }
    }

    public async addNewPokemon(req: Request, res: Response): Promise<Response> {
        try {
            const newPokemon: MongooseDocument = await new Pokemon(req.body).save();
            return res.json(newPokemon);
        } catch (err) {
            return res.send(err);
        }
    }

    public async deletePokemon(req: Request, res: Response): Promise<Response> {
        try {
            const deletePokemon: MongooseDocument = await Pokemon.findByIdAndDelete(req.params.id);
            return res.send(deletePokemon ? 'Deleted successfully' : 'Pokemon not found :(');
        } catch (err) {
            return res.send(err);
        }
    }

    public async updatePokemon(req: Request, res: Response): Promise<Response> {
        try {
            const updatePokemon: MongooseDocument = await Pokemon.findByIdAndUpdate(req.params.id, req.body);
            return res.send(updatePokemon ? 'Updated successfully' : 'Pokemon not found :(');
        } catch (err) {
            return res.send(err);
        }
    }
}