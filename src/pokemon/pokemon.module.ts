import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Pokemon.name, //no es el atributo sino el nombre del Documento en si
        schema: PokemonSchema
      }
    ])
  ],
  /// exports: [PokemonService] /// exportacion para el seed PROPIO
  exports: [MongooseModule]
})
export class PokemonModule {}
