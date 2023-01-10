import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) //con esto hace que nest permita la injeccion de modelos en este servicio
    private readonly pokemonModel: Model<Pokemon> //La entidad
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    try {

      createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return `Added new pokemon No: "${pokemon.no}"`;
    } catch(error) {
      this.handleException(error, 'create');
    }
  }

  findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;

    // No - Con esto verifica si es un numero, buscara el numero del pokemon
    if(!isNaN(+term)) pokemon = await this.pokemonModel.findOne({ no: term });

    // MongoID - Con esto verifica si es un objecto del Mongo, buscara el Id
    if(!pokemon && isValidObjectId(term)) pokemon = await this.pokemonModel.findById(term);

    // Name - si con los metodos superiores no obtengo un pokemon aun, buscaremos por nombre
    if(!pokemon) pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });

    if(!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if(updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
    try {
      await pokemon.updateOne(updatePokemonDto, { new: true}); // Funcion para actualizar, con new en true regresa el nuevo registro
  
      const res = {...pokemon.toJSON(), ...updatePokemonDto}; // Esparzo todas las propiedades que tiene el pokemon y las sobreescribo con el DTO
  
      return `Pokemon "${res.name}" was updated`;
    } catch(error) {
      this.handleException(error, 'update');
    }    
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});

    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id '${id}' doesn't exists`);

    return `Pokemon with id '${id}' was removed`;
  }

  private handleException(error: any, func: string) {
    /**
     * InteralServerErrorException - Cuando un registro mandado es duplicado el servidor arroja un internal error
     * BadRequestException - Capturamos el codigo de error y si es el correcto mandamos un error 404 como respuesta al cliente
    */
    if(error.code === 11000) {
      switch(func) {
        case 'create':
          throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
          break;
        case 'update':
          throw new BadRequestException(`Pokemon attribute is used ${JSON.stringify(error.keyValue)}`);
          break;
        default:
          console.log(error);
          throw new InternalServerErrorException(`Can't create pokemon - check server logs`);
      }
    }
  }

  /// Funcion para llenar el seed a la bd
  async fillPokemon(createPokemonDto: CreatePokemonDto) {
    const pokemon = await this.pokemonModel.create(createPokemonDto)
  } 
}
