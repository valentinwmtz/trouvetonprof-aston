import { element, by, ElementFinder } from 'protractor';

export class MatiereComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-matiere div table .btn-danger'));
    title = element.all(by.css('jhi-matiere div h2#page-heading span')).first();

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

export class MatiereUpdatePage {
    pageTitle = element(by.id('jhi-matiere-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titreInput = element(by.id('field_titre'));
    descriptionInput = element(by.id('field_description'));
    imageInput = element(by.id('file_image'));
    domaineSelect = element(by.id('field_domaine'));

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

    async domaineSelectLastOption() {
        await this.domaineSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async domaineSelectOption(option) {
        await this.domaineSelect.sendKeys(option);
    }

    getDomaineSelect(): ElementFinder {
        return this.domaineSelect;
    }

    async getDomaineSelectedOption() {
        return this.domaineSelect.element(by.css('option:checked')).getText();
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

export class MatiereDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-matiere-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-matiere'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
