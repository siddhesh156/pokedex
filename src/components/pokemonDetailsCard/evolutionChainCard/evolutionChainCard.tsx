import React from 'react';
import rightArrowIcon from '../../../assets/icons/right-arrow.png';
import '../../../styles/common.scss';
import PokemonCard from '../../pokemonCard/pokemonCard';
import './evolutionChainCard.scss';

interface EvolutionChainCardProps {
    data: any; // Replace 'any' with a more specific type if available
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ data }) => {
    const arrayele = [1, 2, 3];

    return (
        <div>
            <div className="evol-container">
                <div className="evol-wrap evolu-break">
                    {arrayele.map((obj, index) => (
                        <div className="flex-row" key={obj}>
                            <div>
                                <div className="pt-2">
                                    <PokemonCard className="disabled-click" key={data.id} data={data} />
                                </div>
                            </div>
                            {arrayele.length !== index + 1 && (
                                <div>
                                    <div className="evol-next-arrow">
                                                                        <button
                                                                            type="button"
                                                                            className="icon-button"
                                                                            aria-label="Next evolution"
                                                                            tabIndex={0}
                                                                            style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                                                                        >
                                                                            <img src={rightArrowIcon} alt="" />
                                                                        </button>
                                    </div>
                                </div>)}
                        </div>))}
                </div>
            </div>
        </div>
    );
};



export default EvolutionChainCard;