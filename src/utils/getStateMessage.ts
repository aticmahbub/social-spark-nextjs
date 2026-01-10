/* eslint-disable @typescript-eslint/no-explicit-any */
const getStateMessage = (state: any): string | undefined => {
    if (!state) return undefined;
    if ('message' in state && typeof state.message === 'string') {
        return state.message;
    }
    return undefined;
};
