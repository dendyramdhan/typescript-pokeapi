import mongoose, { Model } from "mongoose";

const PokemonSchema = new mongoose.Schema({
    name: String,
    gender: String,
    type: String,
    height: String,
    weight: String,
    photo: String
});

export const Pokemon: Model<any, {}> = mongoose.model("Pokemon", PokemonSchema);