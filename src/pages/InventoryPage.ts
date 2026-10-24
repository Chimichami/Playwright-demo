import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object para el catálogo de productos (Inventory Page).
 */
export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly productSortDropdown: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  /**
   * Agrega un producto al carrito por su nombre visible exacto
   */
  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const addButton = productCard.getByRole('button', { name: /add to cart/i });
    await addButton.click();
  }

  /**
   * Remueve un producto del carrito desde la vista de catálogo
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    const removeButton = productCard.getByRole('button', { name: /remove/i });
    await removeButton.click();
  }

  /**
   * Obtiene la cantidad de productos reflejada en el badge del carrito
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.innerText();
      return parseInt(text.trim(), 10);
    }
    return 0;
  }

  /**
   * Ordena los productos según el valor del combo (az, za, lohi, hilo)
   */
  async sortProducts(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.productSortDropdown.selectOption(optionValue);
  }

  /**
   * Navega a la vista del carrito de compras
   */
  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
