import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

/**
 * Patrón Fixture: Extiende el objeto `test` de Playwright para inyectar
 * automáticamente instancias limpias y tipadas de los Page Objects.
 *
 * Ventajas:
 * 1. Elimina código repetitivo de instanciación manual (`new LoginPage(page)`).
 * 2. Garantiza aislamiento por prueba (cada prueba recibe su propio contexto limpio).
 * 3. Permite configuración y teardown automático antes y después de cada prueba.
 */
type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedUser: { username: string; page: InventoryPage };
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  // Fixture compuesta: navega y autentica automáticamente antes del test
  authenticatedUser: async ({ page, loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.pageTitle).toHaveText('Products');
    await use({ username: 'standard_user', page: inventoryPage });
  },
});

export { expect };
