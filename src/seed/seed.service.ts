import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  // Esta dependencia es para generar peticiones http momentaneo para que sea visible las peticiones
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    // https://pokeapi.co/api/v2/pokemon?limit=650 para cuando quiera implementar una pokedex entera pero no sobrecargar la api de pokeapi, cuidado
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    
    data.results.forEach(({name,url}) => {
      const segments = url.split('/'); // con esto separo los / de los url -> https://pokeapi.co/api/v2/pokemon/1/
      const no: number = +segments[segments.length - 2]; // con esto extraigo el numero del pokemon de segmentos(en la penultima posicion) y lo convierto a numero
    });
  }

}
