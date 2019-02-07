import { element, by, ElementFinder } from 'protractor';

export class MessageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-message div table .btn-danger'));
    title = element.all(by.css('jhi-message div h2#page-heading span')).first();

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

export class MessageUpdatePage {
    pageTitle = element(by.id('jhi-message-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    utilisateur1Input = element(by.id('field_utilisateur1'));
    utilisateur2Input = element(by.id('field_utilisateur2'));
    texteInput = element(by.id('field_texte'));
    dateInput = element(by.id('field_date'));
    profilSelect = element(by.id('field_profil'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUtilisateur1Input(utilisateur1) {
        await this.utilisateur1Input.sendKeys(utilisateur1);
    }

    async getUtilisateur1Input() {
        return this.utilisateur1Input.getAttribute('value');
    }

    async setUtilisateur2Input(utilisateur2) {
        await this.utilisateur2Input.sendKeys(utilisateur2);
    }

    async getUtilisateur2Input() {
        return this.utilisateur2Input.getAttribute('value');
    }

    async setTexteInput(texte) {
        await this.texteInput.sendKeys(texte);
    }

    async getTexteInput() {
        return this.texteInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async profilSelectLastOption() {
        await this.profilSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async profilSelectOption(option) {
        await this.profilSelect.sendKeys(option);
    }

    getProfilSelect(): ElementFinder {
        return this.profilSelect;
    }

    async getProfilSelectedOption() {
        return this.profilSelect.element(by.css('option:checked')).getText();
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

export class MessageDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-message-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-message'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
