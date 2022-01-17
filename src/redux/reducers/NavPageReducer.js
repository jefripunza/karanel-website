import { NOW_NAV_PAGE } from '../actions/ActionTypes';

import { config } from '../../config';

const initialState = {
    page: config.routes_frontend.panel.dashboard,
};

export const NavPageReducer = (state = initialState, action) => {
    console.log({ thispage: action.page, state });
    switch (action.type) {
        case NOW_NAV_PAGE:
            return {
                ...state,
                page: action.page,
            };
        default:
            return state;
    }
};
