import { createStore, combineReducers } from 'redux';
import {Leaders} from './leaders'
import {Comments} from './comments'
import {Promotions} from './promotions'
import {Dishes} from './dishes'




export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        })
    );

    return store;
}