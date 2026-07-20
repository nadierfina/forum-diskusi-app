import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginInput from './LoginInput';

/**
 * Skenario Pengujian untuk LoginInput Component
 *
 * - LoginInput component
 *   - harus menangani pengetikan email dengan benar
 *   - harus menangani pengetikan password dengan benar
 *   - harus memanggil fungsi login ketika tombol login diklik
 */

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('harus menangani pengetikan email dengan benar', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'test@example.com');

    // Assert
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('harus menangani pengetikan password dengan benar', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('harus memanggil fungsi login ketika tombol login diklik', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});