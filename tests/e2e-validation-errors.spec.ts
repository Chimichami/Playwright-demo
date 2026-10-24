import { test, expect } from '../src/fixtures/testFixtures';
import { USERS, PRODUCTS, CustomerBuilder } from '../src/data/testData';

/**
 * Suite E2E de Validaciones y Casos Negativos / Límites
 */
test.describe('Validaciones E2E y Casos Negativos', () => {

  test('Debería mostrar mensaje de error adecuado para usuario bloqueado (locked_out_user)', async ({
    loginPage,
  }) => {
    await loginPage.goto();
    await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('Debería exigir campos requeridos en el formulario de Checkout', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // Login y carrito
    await loginPage.goto();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Intentar continuar sin llenar ningún campo
    await checkoutPage.continueButton.click();

    // Oráculo de validación de campo requerido
    const error = await checkoutPage.getErrorMessage();
    expect(error).toBe('Error: First Name is required');
    await expect(checkoutPage.errorMessage).toBeVisible();
  });

});
