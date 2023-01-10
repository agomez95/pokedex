import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
//import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class SeedService {

  constructor( 
    /// constructor para seed de pokemon PROPIO
    /// private readonly pokemonService: PokemonService,

    // Inyeccion del model pokemon en el seed
    // Segun el video
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter //con este custom provider tambien puedo hacer uso de mi forma PROPIA
  ) {}

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    // https://pokeapi.co/api/v2/pokemon?limit=650 para cuando quiera implementar una pokedex entera pero no sobrecargar la api de pokeapi, cuidado
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650'); 

    const pokemonToInsert: {name:string, no:number}[] = [];
    
    data.results.forEach(async({name,url}) => {
      const segments = url.split('/'); // con esto separo los / de los url -> https://pokeapi.co/api/v2/pokemon/1/
      const no: number = +segments[segments.length - 2]; // con esto extraigo el numero del pokemon de segmentos(en la penultima posicion) y lo convierto a numero

      /// funcion importada del service PROPIO this.pokemonService.fillPokemon({name, no});      

      pokemonToInsert.push({name,no});  ///forma apropiada para insertar un lote grande
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return `Data Seeded`;
  }

}
