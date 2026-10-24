import { test, expect } from '../src/fixtures/testFixtures';
import { USERS, PRODUCTS, CustomerBuilder } from '../src/data/testData';

/**
 * Suite E2E Happy Path: Compra completa en el portal E-Commerce
 *
 * Aplica:
 * - Patrón Page Object Model (POM): páginas encapsulan acciones y localizadores.
 * - Patrón Custom Fixtures: inyección de dependencias limpias por prueba.
 * - Patrón Test Data Builder: construcción de datos de cliente parametrizados.
 * - Web-First Assertions: aserciones reactivas con reintentos automáticos.
 */
test.describe('Flujo E2E Happy Path - Compra Completa en E-Commerce', () => {

  test('Debería autenticarse, agregar productos, completar checkout y verificar orden exitosa', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // -------------------------------------------------------------------------
    // PASO 1: Navegación e inicio de sesión
    // -------------------------------------------------------------------------
    await test.step('1. Iniciar sesión con credenciales válidas', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

      // Verificación de oráculo: Título de la página de inventario visible
      await expect(inventoryPage.pageTitle).toBeVisible();
      await expect(inventoryPage.pageTitle).toHaveText('Products');
    });

    // -------------------------------------------------------------------------
    // PASO 2: Selección y adición de productos al carrito
    // -------------------------------------------------------------------------
    await test.step('2. Agregar productos seleccionados al carrito', async () => {
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
      await inventoryPage.addProductToCart(PRODUCTS.BIKE_LIGHT);

      // Verificación de oráculo: Contador de items en el badge del carrito
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(2);
    });

    // -------------------------------------------------------------------------
    // PASO 3: Verificación en la pantalla del carrito
    // -------------------------------------------------------------------------
    await test.step('3. Navegar al carrito y verificar ítems presentes', async () => {
      await inventoryPage.goToCart();
      await expect(cartPage.pageTitle).toHaveText('Your Cart');

      const itemsInCart = await cartPage.getItemNames();
      expect(itemsInCart).toContain(PRODUCTS.BACKPACK);
      expect(itemsInCart).toContain(PRODUCTS.BIKE_LIGHT);
      expect(itemsInCart).toHaveLength(2);
    });

    // -------------------------------------------------------------------------
    // PASO 4: Checkout - Paso 1: Información del cliente
    // -------------------------------------------------------------------------
    await test.step('4. Iniciar checkout y completar formulario con Test Data Builder', async () => {
      await cartPage.proceedToCheckout();

      // Uso del patrón Test Data Builder
      const customer = new CustomerBuilder()
        .withFirstName('Cesar')
        .withLastName('Torres')
        .withPostalCode('15063')
        .build();

      await checkoutPage.fillShippingInformation(customer);
    });

    // -------------------------------------------------------------------------
    // PASO 5: Checkout - Paso 2: Verificación de resumen financiero
    // -------------------------------------------------------------------------
    await test.step('5. Validar resumen de compra, subtotales e impuestos', async () => {
      const summary = await checkoutPage.getOrderSummary();
      console.log(`📊 [Resumen Financiero] ${summary.subtotal} | ${summary.tax} | ${summary.total}`);

      expect(summary.subtotal).toContain('39.98'); // Backpack ($29.99) + Bike Light ($9.99)
      expect(summary.tax).toContain('3.20');
      expect(summary.total).toContain('43.18');
    });

    // -------------------------------------------------------------------------
    // PASO 6: Finalización y oráculo de orden completada
    // -------------------------------------------------------------------------
    await test.step('6. Confirmar compra y verificar confirmación de orden (Oráculo final)', async () => {
      await checkoutPage.finishOrder();

      // Oráculo de prueba del sistema E2E
      const confirmationMsg = await checkoutPage.getConfirmationMessage();
      expect(confirmationMsg).toBe('Thank you for your order!');
      await expect(checkoutPage.completeHeader).toBeVisible();
    });
  });

});
