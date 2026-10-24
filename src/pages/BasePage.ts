import { Page, Locator } from '@playwright/test';

/**
 * Clase Base para el patrón Page Object Model (POM).
 * Encapsula la instancia de Playwright `Page` y utilidades comunes.
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a una ruta relativa o absoluta
   */
  async navigateTo(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Espera a que el DOM y la red se estabilicen
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Obtiene el título de la página actual
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Obtiene la URL actual
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Toma una captura de pantalla con fines de depuración / evidencia
   */
  async takeScreenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `playwright-report/evidence-${name}.png`, fullPage: true });
  }
}
