import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CustomerInfo } from '../data/testData';

/**
 * Page Object para el flujo de Checkout (Paso 1: Información, Paso 2: Resumen, y Completado).
 */
export class CheckoutPage extends BasePage {
  // Paso 1: Información del comprador
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  // Paso 2: Resumen y cálculo de precios
  readonly itemTotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;

  // Pantalla de Confirmación final
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    // Paso 1
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Paso 2
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');

    // Confirmación
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Completa el formulario de información de envío y continúa
   */
  async fillShippingInformation(info: CustomerInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  /**
   * Obtiene los montos monetarios calculados en el resumen de orden
   */
  async getOrderSummary(): Promise<{ subtotal: string; tax: string; total: string }> {
    const subtotal = (await this.itemTotalLabel.textContent()) || '';
    const tax = (await this.taxLabel.textContent()) || '';
    const total = (await this.totalLabel.textContent()) || '';
    return { subtotal, tax, total };
  }

  /**
   * Finaliza la compra haciendo clic en Finish
   */
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Obtiene el encabezado del mensaje de confirmación final
   */
  async getConfirmationMessage(): Promise<string> {
    await this.completeHeader.waitFor({ state: 'visible' });
    return (await this.completeHeader.textContent()) || '';
  }

  /**
   * Obtiene mensaje de error si los campos requeridos no fueron llenados
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) || '';
  }
}
