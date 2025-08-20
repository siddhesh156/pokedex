
import { createContext, Dispatch, ReactNode } from 'react';
import { initialState } from '../../store/reducers/reducer';

// Define the shape of the context value
export interface PokemonContextType {
	state: typeof initialState;
	dispatch: Dispatch<any>;
	getPokemonData: (isReset?: boolean) => Promise<void>;
	getPokemonDetailsListByUrl: (results: any[]) => Promise<any[]>;
	setAppLoading: (loading: boolean) => void;
}

const PokemonContext = createContext<Partial<PokemonContextType>>({});
export default PokemonContext;