/**
 * Test Data & Data Builder para la suite de pruebas E2E
 */

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  },
  PROBLEM_USER: {
    username: 'problem_user',
    password: process.env.SAUCE_PASSWORD || 'secret_sauce',
  },
  INVALID_USER: {
    username: 'usuario_invalido',
    password: 'password_erroneo',
  },
};

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_TSHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
};

/**
 * Patrón Test Data Builder: genera datos de prueba válidos por defecto
 * y permite sobrescribir atributos específicos según el caso.
 */
export class CustomerBuilder {
  private customer: CustomerInfo = {
    firstName: 'Cesar',
    lastName: 'Torres',
    postalCode: '15063',
  };

  withFirstName(firstName: string): CustomerBuilder {
    this.customer.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): CustomerBuilder {
    this.customer.lastName = lastName;
    return this;
  }

  withPostalCode(postalCode: string): CustomerBuilder {
    this.customer.postalCode = postalCode;
    return this;
  }

  build(): CustomerInfo {
    return { ...this.customer };
  }
}
