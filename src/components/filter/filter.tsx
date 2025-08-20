import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'rsuite';
import { debounceTime, distinctUntilChanged, map, of } from 'rxjs';
import { baseURL, SEARCH_SLICED } from '../../constants/apiUrls';
import { getCamleCaseString } from '../../constants/pokemon.types';
import PokemonContext, { PokemonContextType } from '../../context/pokemonContext/pokmon.context';
import {
  getAllParallelCall,
  getPokemonGenders,
  getPokemonTypes,
  removeDuplicateBy,
} from '../../services/common.service';
import './filter.scss';
import AppMultiSelectDropDown from './multiSelectdropDown/multiSelectdropDown';
import SearchFilter from './search/search.filter';

interface AppFilterProps {
  isFilterEnable: (value: boolean) => void;
}

interface PokemonItem {
  name: string;
  url: string;
}

const AppFilter: React.FC<AppFilterProps> = ({ isFilterEnable }) => {
  const {
    state,
    getPokemonData,
    dispatch,
    setAppLoading,
    getPokemonDetailsListByUrl,
  } = useContext(PokemonContext) as PokemonContextType;

  const { allPokemonsList, pokemonsTypes, pokemonGenderList } = state;

  const [isOpenTypeFilter, setIsOpenTypeFilter] = useState(false);
  const [isOpenGendreFilter, setIsOpenGenderFilter] = useState(false);

  let data$ = of([]);

  const onOpenTypeHandler = () => setIsOpenTypeFilter(true);
  const onCloseTypeHandler = () => setIsOpenTypeFilter(false);
  const onOpenGenderHandler = () => setIsOpenGenderFilter(true);
  const onCloseGenderHandler = () => setIsOpenGenderFilter(false);

  const onCleanTypeHandler = (event: React.SyntheticEvent) => {
    if (event) {
      isFilterEnable(false);
    }
  };

  const filterPokemonData = (data: any[]) => {
    dispatch({
      type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
      payload: data,
    });
  };

  const onSearchChangeHandler = (value: string, event: React.FormEvent) => {
    event.preventDefault();
    value = value.trim();
    setAppLoading(true);

    if (value.length) {
      isFilterEnable(true);
      data$ = of(allPokemonsList).pipe(
        debounceTime(4000),
        distinctUntilChanged(),
        map((pokemons: PokemonItem[]) =>
          pokemons.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        )
      );
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }

    data$.subscribe((pokemonList: any[]) => {
      if (pokemonList.length > SEARCH_SLICED) {
        pokemonList = pokemonList.slice(0, SEARCH_SLICED);
      }
      getPokemonDetailsListByUrl(pokemonList).then((res) => {
        filterPokemonData(res);
      });
    });

    setAppLoading(false);
  };

  const onTypeChangeHandler = (value: string[], event: React.FormEvent) => {
    event.preventDefault();

    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value)
        .then((pokemonList) => {
          let flattened = pokemonList.map((res) => res.pokemon);
          flattened = flattened.flat().map((res) => res.pokemon);
          const unique = removeDuplicateBy(flattened, 'name');

          const sliced = unique.length > SEARCH_SLICED
            ? unique.slice(-SEARCH_SLICED)
            : unique;

          getPokemonDetailsListByUrl(sliced).then((res) => {
            filterPokemonData(res);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const onGenderChangeHandler = (value: string[], event: React.FormEvent) => {
    event.preventDefault();

    if (value.length) {
      isFilterEnable(true);
      getAllParallelCall(value)
        .then((pokemonList) => {
          let urls = pokemonList
            .map((res) => res.pokemon_species_details)
            .flat()
            .map(
              (res: any) =>
                baseURL + '/pokemon' + res.pokemon_species.url.split('pokemon-species')[1]
            );

          urls = [...new Set(urls)];

          if (urls.length > SEARCH_SLICED) {
            urls = [...urls.slice(0, SEARCH_SLICED), ...urls.slice(-SEARCH_SLICED)];
          }

          const requestList = urls.map((url) => ({ url }));

          getPokemonDetailsListByUrl(requestList).then((res) => {
            filterPokemonData(res);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      filterPokemonData([]);
      getPokemonData(true);
      isFilterEnable(false);
    }
  };

  const setPokemonTypes = (data: PokemonItem[]) => {
    const mapped = data.map((item) => ({
      label: getCamleCaseString(item.name),
      value: item.url,
      url: item.url,
    }));

    dispatch({
      type: 'ACTIONS.SET_POKEMON_TYPE',
      payload: mapped.length ? mapped : [],
    });
  };

  const setPokemonGendersList = (genderList: PokemonItem[]) => {
    const mapped = genderList.map((item) => ({
      label: getCamleCaseString(item.name),
      value: item.url,
      url: item.url,
    }));

    dispatch({
      type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
      payload: mapped.length ? mapped : [],
    });
  };

  const getAllPokemonType = async () => {
    try {
      const res = await getPokemonTypes();
      setPokemonTypes(res.results);
    } catch (err) {
      console.error(err);
    }
  };

  const getPokemonGendersList = async () => {
    try {
      const res = await getPokemonGenders();
      setPokemonGendersList(res.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllPokemonType();
    getPokemonGendersList();
  }, []);

  return (
    <div className="filter-container">
      <div className="filter-wrap">
        <Row lg={24} xl={24} className="filter-row-wrap show-grid">
          <Col lg={16} xl={16} xs={24} sm={24}>
            <SearchFilter
              placeholder="Name or Number"
              inputClass="pokemon-search-filter"
              label="Search By"
              onChangeHandler={onSearchChangeHandler}
            />
          </Col>
          <Col lg={4} xl={4} xs={24} sm={24}>
            <AppMultiSelectDropDown
              placeholder="Select Types"
              isOpen={isOpenTypeFilter}
              data={pokemonsTypes}
              label="Type"
              onChangeHandler={onTypeChangeHandler}
              onOpenHandler={onOpenTypeHandler}
              onCloseHandler={onCloseTypeHandler}
              onCleanHandler={onCleanTypeHandler}
            />
          </Col>
          <Col lg={4} xl={4} xs={24} sm={24}>
            <AppMultiSelectDropDown
              placeholder="Select Gender"
              isOpen={isOpenGendreFilter}
              data={pokemonGenderList}
              label="Gender"
              onChangeHandler={onGenderChangeHandler}
              onOpenHandler={onOpenGenderHandler}
              onCloseHandler={onCloseGenderHandler}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AppFilter;
