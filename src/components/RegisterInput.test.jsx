import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

/**
 * Skenario Pengujian untuk RegisterInput Component
 *
 * - RegisterInput component
 *   - harus menangani pengetikan nama dengan benar
 *   - harus menangani pengetikan email dengan benar
 *   - harus menangani pengetikan password dengan benar
 *   - harus memanggil fungsi register ketika tombol register diklik
 */

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('harus menangani pengetikan nama dengan benar', async () => {
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'John Doe');
    expect(nameInput).toHaveValue('John Doe');
  });

  it('harus menangani pengetikan email dengan benar', async () => {
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('harus menangani pengetikan password dengan benar', async () => {
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
  });

  it('harus memanggil fungsi register ketika tombol register diklik', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    const emailInput = await screen.getByPlaceholderText('Email');
    const passwordInput = await screen.getByPlaceholderText('Password');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    });
  });
});