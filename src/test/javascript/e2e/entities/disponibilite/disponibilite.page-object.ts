import { element, by, ElementFinder } from 'protractor';

export class DisponibiliteComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-disponibilite div table .btn-danger'));
    title = element.all(by.css('jhi-disponibilite div h2#page-heading span')).first();

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

export class DisponibiliteUpdatePage {
    pageTitle = element(by.id('jhi-disponibilite-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    dureeInput = element(by.id('field_duree'));
    annonceSelect = element(by.id('field_annonce'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDureeInput(duree) {
        await this.dureeInput.sendKeys(duree);
    }

    async getDureeInput() {
        return this.dureeInput.getAttribute('value');
    }

    async annonceSelectLastOption() {
        await this.annonceSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async annonceSelectOption(option) {
        await this.annonceSelect.sendKeys(option);
    }

    getAnnonceSelect(): ElementFinder {
        return this.annonceSelect;
    }

    async getAnnonceSelectedOption() {
        return this.annonceSelect.element(by.css('option:checked')).getText();
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

export class DisponibiliteDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-disponibilite-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-disponibilite'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
