import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    //id: string / Mongo ya me da un identificador unico

    @Prop({
        unique: true,
        index: true, //el indice sabe donde esta el elemento que buscasemos
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
