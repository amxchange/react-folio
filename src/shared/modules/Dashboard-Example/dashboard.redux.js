/**
 * EXAMPLE FILE
 */

/**
 * @description:
 * Redux related stuff ( reducer, action, constants )
 */

/* Constants */
export const SET_META = "SET_META";

/* Actions */
export const setMeta = () => {
    return {
        type: SET_META,
        payload: {
            data: {}
        }
    };
};

/* Reducer exported as default */
export default (
    state = {
        meta: {}
    },
    action
) => {
    switch (action.type) {
        case SET_META:
            return {
                ...state,
                meta: payload.data
            };
        default:
            return state;
    }
};
