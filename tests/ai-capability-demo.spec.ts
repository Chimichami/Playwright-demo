import { test, expect } from '../src/fixtures/testFixtures';
import { USERS, PRODUCTS, CustomerBuilder } from '../src/data/testData';
import { AiHealer } from '../src/ai/AiHealer';

/**
 * Demostración en Vivo: Capacidad de Inteligencia Artificial Aplicada a Playwright
 *
 * Esta prueba demuestra dos capacidades de vanguardia:
 * 1. AI Self-Healing Locators: Detección y curación automática de selectores rotos/mutados
 *    sin detener la suite de pruebas.
 * 2. Prompt-Driven Testing: Ejecución de acciones web guiadas por lenguaje natural.
 */
test.describe('Demostración en Vivo: Inteligencia Artificial en Playwright', () => {

  test('Caso 1: Auto-curación de selectores rotos mediante inferencia semántica (AI Self-Healing)', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await test.step('Navegar y simular fallo con selector obsoleto', async () => {
      await loginPage.goto();

      // En lugar de usar el botón directo, simulamos un selector roto que un dev frontend cambió:
      // "#submit_auth_old_button_v1" NO existe en el HTML de SauceDemo.
      const brokenLoginSelector = '#submit_auth_old_button_v1_deprecated';

      // Llenamos credenciales normalmente
      await page.locator('[data-test="username"]').fill(USERS.STANDARD.username);
      await page.locator('[data-test="password"]').fill(USERS.STANDARD.password);

      // Invocamos el motor de AI Self-Healing
      const result = await AiHealer.healAndClick(
        page,
        brokenLoginSelector,
        'Iniciar sesión en la aplicación pulsando el botón login'
      );

      // Verificamos que el motor de IA auto-curó la acción
      expect(result.success).toBe(true);
      expect(result.report.confidenceScore).toBeGreaterThan(0.9);
      console.log(`\n🎉 [Resultado IA]: Prueba continuó con éxito gracias al selector curado: ${result.report.healedSelector}`);

      // Comprobamos que llegamos efectivamente al catálogo
      await expect(inventoryPage.pageTitle).toBeVisible();
      await expect(inventoryPage.pageTitle).toHaveText('Products');
    });
  });

  test('Caso 2: Ejecución de acciones mediante instrucciones en Lenguaje Natural (AI Prompt Actions)', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await test.step('Autenticación y acción guiada por IA en lenguaje natural', async () => {
      await loginPage.goto();
      await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
      await expect(inventoryPage.pageTitle).toBeVisible();

      // Ejecutamos una instrucción en lenguaje natural procesada por el motor de IA
      const actionResult = await AiHealer.executePrompt(
        page,
        'Agregar al carrito el producto Sauce Labs Backpack'
      );

      expect(actionResult.confidenceScore).toBeGreaterThan(0.85);

      // Verificamos en la UI que la acción ejecutada por la IA tuvo impacto real
      const badgeCount = await inventoryPage.getCartBadgeCount();
      expect(badgeCount).toBe(1);
      console.log(`\n🎉 [Resultado IA]: Producto agregado exitosamente al carrito mediante lenguaje natural.`);
    });
  });

});
