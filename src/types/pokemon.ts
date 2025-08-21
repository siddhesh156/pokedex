// Types for evolution chain and pokemon minimal info

export interface EvolutionChainStage {
  name: string;
  url: string;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain?: {
    url: string;
  };
}

export interface PokemonData {
  id: number;
  name: string;
  sprites: {
    front_default?: string;
    other?: {
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: any[];
  stats?: any[];
}
