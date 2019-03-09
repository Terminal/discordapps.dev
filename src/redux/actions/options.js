export const SET_LOCALE = 'SET_LOCALE';

function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale: locale
  };
}

export function setLocaleHandler(locale) {
  return (dispatch, getState) => {
    dispatch(setLocale(locale));
  };
}
