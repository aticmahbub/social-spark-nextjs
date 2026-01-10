/* eslint-disable @typescript-eslint/no-explicit-any */
import {IInputErrorState} from './getFieldError';

export const mapToInputErrorState = (state: any): IInputErrorState => {
    if (!state) return {success: true, errors: []};

    if ('errors' in state) {
        return {success: false, errors: state.errors};
    }

    if ('message' in state) {
        return {
            success: false,
            errors: [{field: '_global', message: state.message}],
        };
    }

    return {success: true, errors: []};
};
