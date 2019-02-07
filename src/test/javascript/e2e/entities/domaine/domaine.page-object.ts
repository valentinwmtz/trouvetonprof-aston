import { element, by, ElementFinder } from 'protractor';

export class DomaineComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-domaine div table .btn-danger'));
    title = element.all(by.css('jhi-domaine div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class DomaineUpdatePage {
    pageTitle = element(by.id('jhi-domaine-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titreInput = element(by.id('field_titre'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitreInput(titre) {
        await this.titreInput.sendKeys(titre);
    }

    async getTitreInput() {
        return this.titreInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class DomaineDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-domaine-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-domaine'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
