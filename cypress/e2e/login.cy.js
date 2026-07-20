/* eslint-disable no-undef */
/**
 * Skenario Pengujian E2E untuk Alur Login
 *
 * - Login spec
 *   - harus menampilkan halaman login dengan benar
 *   - harus menampilkan pesan error ketika email atau password salah
 *   - harus berhasil login dan diarahkan ke halaman utama ketika kredensial benar
 */
describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('harus menampilkan pesan error ketika email atau password salah', () => {
    cy.get('input[placeholder="Email"]').type('akunsalah@dicoding.com');
    cy.get('input[placeholder="Password"]').type('passwordsalah123');
    cy.contains('button', 'Masuk').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('email or password is wrong');
    });
  });

  it('harus berhasil login dan diarahkan ke halaman utama ketika kredensial benar', () => {
    cy.get('input[placeholder="Email"]').type('nadiaerfina16@gmail.com');
    cy.get('input[placeholder="Password"]').type('password');
    cy.get('button').contains('Masuk').click();
    cy.get('input[placeholder="Email"]', { timeout: 10000 }).should('not.exist');
  });
});