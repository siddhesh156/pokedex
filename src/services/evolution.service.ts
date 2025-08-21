// Utility to fetch and parse the evolution chain for a given species
import type { PokemonSpecies, EvolutionChainStage } from '../types/pokemon';

interface EvolutionChainAPI {
  chain: EvolutionChainAPIChainNode;
}

interface EvolutionChainAPIChainNode {
  species: { name: string; url: string };
  evolves_to: EvolutionChainAPIChainNode[];
}

export async function getEvolutionChainBySpecies(speciesData: PokemonSpecies): Promise<EvolutionChainStage[]> {
  if (!speciesData || !speciesData.evolution_chain?.url) return [];
  const response = await fetch(speciesData.evolution_chain.url);
  const evolutionData: EvolutionChainAPI = await response.json();
  return parseEvolutionChain(evolutionData.chain);
}

// Recursively parse the evolution chain into a flat array
function parseEvolutionChain(chainNode: EvolutionChainAPIChainNode, result: EvolutionChainStage[] = []): EvolutionChainStage[] {
  if (!chainNode) return result;
  result.push({
    name: chainNode.species.name,
    url: chainNode.species.url,
  });
  if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
    // Only follow the first branch for now (can be extended for split evolutions)
    return parseEvolutionChain(chainNode.evolves_to[0], result);
  }
  return result;
}
