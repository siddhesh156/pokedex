import React from 'react';
import backIcon from '../../../assets/icons/back-icon.png';
import closeIcon from '../../../assets/icons/close-icon.png';
import rightIcon from '../../../assets/icons/right-icon.png';
import { getPokemonDescription } from '../../../constants/pokemon.types';
import AppTooltip from '../../../hooks/tooltip/tooltip';
import { numberFormation } from '../../../services/common.service';
import '../../../styles/common.scss';
import PokemonCard from '../../pokemonCard/pokemonCard';
import './detailsHeader.scss';

interface DetailsHeaderProps {
    data: any; // Replace 'any' with a more specific type if available
    speciesData: any;
    backClick?: () => void;
    closeClick?: () => void;
    forwordClick?: () => void;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ data, speciesData, backClick, closeClick, forwordClick }) => {

    const getPokemonDescriptions = () => {
        if (speciesData && speciesData.flavor_text_entries) {
            return getPokemonDescription(speciesData.flavor_text_entries);
        } else {
            return '';
        }
    };

    return (
        <>
            <div className="details-header-container">
                <div className="header-wrap">
                    <div>
                        <PokemonCard className="disabled-click" key={data.id} data={data} />
                    </div>
                    <div className="header-sub-wrap pl-3">
                        <div className="title-wrap">
                            <div>
                                <h3 className="text-caps">{data.name}</h3>
                            </div>
                            <div className="horizontal-line"></div>
                            <div>
                                <h3>{numberFormation(data.id)}</h3>
                            </div>
                            <div className="horizontal-line"></div>
                            <div>
                                <div className="icon-wrap">
                                    <button
                                        type="button"
                                        onClick={backClick}
                                        className="icon-button"
                                        aria-label="Go back"
                                        tabIndex={0}
                                        style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                                    >
                                        <img src={backIcon} alt="" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeClick}
                                        className="icon-button"
                                        aria-label="Close"
                                        tabIndex={0}
                                        style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                                    >
                                        <img src={closeIcon} alt="" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={forwordClick}
                                        className="icon-button"
                                        aria-label="Go forward"
                                        tabIndex={0}
                                        style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
                                    >
                                        <img src={rightIcon} alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="text-description">
                            <div className="text-dot"><span >{getPokemonDescriptions().substring(0, 363)} </span></div>
                            <div className="text-dot">... </div>
                            {getPokemonDescriptions().length > 363 && <AppTooltip placement="bottom" className="load-more" tooltipClass="tooltip-popover" name="read more" data={getPokemonDescriptions()} appearance="subtle" />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default DetailsHeader;