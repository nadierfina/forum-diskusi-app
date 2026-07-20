import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';

/**
 * Skenario Pengujian untuk authUserReducer
 *
 * - authUserReducer function
 *  - harus mengembalikan state awal jika diberikan action yang tidak diketahui
 *  - harus mengembalikan data authUser jika diberikan action SET_AUTH_USER
 *  - harus mengembalikan null jika diberikan action UNSET_AUTH_USER
 */

describe('authUserReducer function', () => {
  it('harus mengembalikan state awal jika diberikan action yang tidak diketahui', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan data authUser jika diberikan action SET_AUTH_USER', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'user-123',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('harus mengembalikan null jika diberikan action UNSET_AUTH_USER', () => {
    // Arrange
    const initialState = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = { type: 'UNSET_AUTH_USER' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(null);
  });
});