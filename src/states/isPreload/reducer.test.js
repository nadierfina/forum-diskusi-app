import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';

/**
 * Skenario Pengujian untuk isPreloadReducer
 *
 * - isPreloadReducer function
 *  - harus mengembalikan state awal jika diberikan action yang tidak diketahui
 *  - harus mengembalikan nilai isPreload jika diberikan action SET_IS_PRELOAD
 */

describe('isPreloadReducer function', () => {
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan nilai isPreload jika diberikan action SET_IS_PRELOAD', () => {
    // Arrange
    const initialState = true;
    const action = {
      type: 'SET_IS_PRELOAD',
      payload: {
        isPreload: false,
      },
    };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.isPreload);
  });
});