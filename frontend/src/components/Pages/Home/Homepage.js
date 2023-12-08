import React, { useEffect, useReducer } from 'react';
import { getAll, getalltags, search,getallbytag } from '../../../services/foodService';
import Thumbnails from '../../Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../Search/Search';
import Tags from '../../Tags/Tags';
import NotFound from '../../NotFound/NotFound';

const initialState = { foods: [],tags:[] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
      case 'TAGS_LOADED':
        return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function Homepage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedFoods;

        if (tag) {
          fetchedFoods = await getallbytag(tag);
        } else if (searchTerm) {
          fetchedFoods = await search(searchTerm);
        } else {
          fetchedFoods = await getAll();
        }

        dispatch({ type: 'FOODS_LOADED', payload: fetchedFoods });

        const fetchedTags = await getalltags();
        dispatch({ type: 'TAGS_LOADED', payload: fetchedTags });
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
