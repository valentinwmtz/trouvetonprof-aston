import { element, by, ElementFinder } from 'protractor';

export class ProfilComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-profil div table .btn-danger'));
    title = element.all(by.css('jhi-profil div h2#page-heading span')).first();

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

export class ProfilUpdatePage {
    pageTitle = element(by.id('jhi-profil-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateNaissanceInput = element(by.id('field_dateNaissance'));
    paysInput = element(by.id('field_pays'));
    adresseInput = element(by.id('field_adresse'));
    telephoneInput = element(by.id('field_telephone'));
    sexeSelect = element(by.id('field_sexe'));
    userSelect = element(by.id('field_user'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setDateNaissanceInput(dateNaissance) {
        await this.dateNaissanceInput.sendKeys(dateNaissance);
    }

    async getDateNaissanceInput() {
        return this.dateNaissanceInput.getAttribute('value');
    }

    async setPaysInput(pays) {
        await this.paysInput.sendKeys(pays);
    }

    async getPaysInput() {
        return this.paysInput.getAttribute('value');
    }

    async setAdresseInput(adresse) {
        await this.adresseInput.sendKeys(adresse);
    }

    async getAdresseInput() {
        return this.adresseInput.getAttribute('value');
    }

    async setTelephoneInput(telephone) {
        await this.telephoneInput.sendKeys(telephone);
    }

    async getTelephoneInput() {
        return this.telephoneInput.getAttribute('value');
    }

    async setSexeSelect(sexe) {
        await this.sexeSelect.sendKeys(sexe);
    }

    async getSexeSelect() {
        return this.sexeSelect.element(by.css('option:checked')).getText();
    }

    async sexeSelectLastOption() {
        await this.sexeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
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

export class ProfilDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-profil-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-profil'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
