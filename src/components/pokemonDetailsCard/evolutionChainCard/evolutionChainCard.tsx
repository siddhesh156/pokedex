
import React, { useEffect, useState } from 'react';
import rightArrowIcon from '../../../assets/icons/right-arrow.png';
import '../../../styles/common.scss';
import PokemonCard from '../../pokemonCard/pokemonCard';
import './evolutionChainCard.scss';
import { getEvolutionChainBySpecies } from '../../../services/evolution.service';
import { getPokemonDataById } from '../../../services/common.service';
import type { PokemonData, PokemonSpecies, EvolutionChainStage } from '../../../types/pokemon';

interface EvolutionChainCardProps {
    data: PokemonData;
    speciesData?: PokemonSpecies;
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ data, speciesData }) => {
    const [evolutionData, setEvolutionData] = useState<PokemonData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchEvolutionChain() {
            if (!speciesData) return;
            setLoading(true);
            const chain: EvolutionChainStage[] = await getEvolutionChainBySpecies(speciesData);
            // Fetch pokemon data for each evolution stage
            const pokemonDataArr: PokemonData[] = await Promise.all(
                chain.map((stage) => {
                    // Extract id from species url (format: .../pokemon-species/<id>/)
                    const match = stage.url.match(/\/pokemon-species\/(\d+)\//);
                    const id = match ? match[1] : null;
                    return id ? getPokemonDataById(id) : null;
                })
            );
            setEvolutionData(pokemonDataArr);
            setLoading(false);
        }
        fetchEvolutionChain();
    }, [speciesData]);

    if (loading) {
        return <div>Loading evolution chain...</div>;
    }

    if (!evolutionData.length) {
        return <div>No evolution data available.</div>;
    }

    return (
        <div>
            <div className="evol-container">
                <div className="evol-wrap evolu-break">
                    {evolutionData.map((poke, index) => (
                        <div className="flex-row" key={poke?.id || index}>
                            <div>
                                <div className="pt-2">
                                    <PokemonCard className={"disabled-click" + (poke?.id === data.id ? " current-evolution" : "")} key={poke?.id} data={poke} />
                                </div>
                            </div>
                            {evolutionData.length !== index + 1 && (
                                <div>
                                    <div className="evol-next-arrow">
                                        <button
                                            type="button"
                                            className="icon-button"
                                            aria-label="Next evolution"
                                            tabIndex={0}
                                            style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                                            disabled
                                        >
                                            <img src={rightArrowIcon} alt="" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EvolutionChainCard;