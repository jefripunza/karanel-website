import { CLICK_OPEN_MENU, NOW_NAV_PAGE } from './ActionTypes';

export const clickMenuOpen = (value) => ({
    type: CLICK_OPEN_MENU,
    newValue: value,
});

export const nowNavPage = (page) => {
    return {
        type: NOW_NAV_PAGE,
        page,
    };
};
