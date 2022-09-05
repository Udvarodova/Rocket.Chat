import type { Locator, Page } from '@playwright/test';

export class Registration {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get toastSuccess(): Locator {
		return this.page.locator('.rcx-toastbar.rcx-toastbar--success');
	}

	get toastError(): Locator {
		return this.page.locator('.rcx-toastbar.rcx-toastbar--error');
	}

	get btnSubmit(): Locator {
		return this.page.locator('role=button[name="Submit"]');
	}

	get btnRegister(): Locator {
		return this.page.locator('button.register');
	}

	get btnRegisterConfirmUsername(): Locator {
		return this.page.locator('button[data-loading-text=" Please_wait ..."]');
	}

	get btnForgotPassword(): Locator {
		return this.page.locator('role=link[name="Forgot your password?"]');
	}

	get username(): Locator {
		return this.page.locator('[name=username]');
	}

	get inputName(): Locator {
		return this.page.locator('[name=name]');
	}

	get textErrorName(): Locator {
		return this.page.locator('[name=name]~.input-error');
	}

	get inputEmail(): Locator {
		return this.page.locator('role=textbox[name=Email]');
	}

	get inputPassword(): Locator {
		return this.page.locator('[name=password]');
	}

	get textErrorPassword(): Locator {
		return this.page.locator('[name=password]~.input-error');
	}

	get inputPasswordConfirm(): Locator {
		return this.page.locator('[name=confirm-pass]');
	}

	get textErrorPasswordConfirm(): Locator {
		return this.page.locator('[name=confirm-pass]~.input-error');
	}

	get forgotPasswordEmailCallout(): Locator {
		return this.page.locator('role=alert');
	}
}
