import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object para la pantalla de Login (SauceDemo / Portal E-Commerce).
 * Encapsula localizadores y acciones del usuario según el patrón POM.
 */
export class LoginPage extends BasePage {
  // Localizadores encapsulados
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    // Estrategia de localizadores resilientes usando data-test y roles accesibles
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.loginLogo = page.locator('.login_logo');
  }

  /**
   * Navega a la página de login
   */
  async goto(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForLoad();
  }

  /**
   * Realiza el flujo de autenticación completo
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Obtiene el texto del mensaje de error en caso de fallo de autenticación
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) || '';
  }

  /**
   * Verifica si el formulario de inicio de sesión es visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    return this.loginButton.isVisible();
  }
}
