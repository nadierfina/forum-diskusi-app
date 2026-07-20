import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';

/**
 * Skenario Pengujian untuk asyncSetAuthUser Thunk
 *
 * - asyncSetAuthUser thunk
 *  - harus mendispatch action secara benar ketika login sukses
 *  - harus mendispatch action dan memanggil alert ketika login gagal
 */

const fakeAuthUserResponse = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, kredensial salah');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  it('harus mendispatch action secara benar ketika login sukses', async () => {
    // Arrange
    api.login = () => Promise.resolve('faketoken123');
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse);

    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email: 'test@test.com', password: 'password123' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith('faketoken123');
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus mendispatch action dan memanggil alert ketika login gagal', async () => {
    // Arrange
    api.login = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // Action
    await asyncSetAuthUser({ email: 'test@test.com', password: 'password123' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});