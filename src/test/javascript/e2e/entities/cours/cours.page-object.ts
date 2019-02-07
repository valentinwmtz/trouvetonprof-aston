import { element, by, ElementFinder } from 'protractor';

export class CoursComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cours div table .btn-danger'));
    title = element.all(by.css('jhi-cours div h2#page-heading span')).first();

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

export class CoursUpdatePage {
    pageTitle = element(by.id('jhi-cours-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    dureeInput = element(by.id('field_duree'));
    noteInput = element(by.id('field_note'));
    prixInput = element(by.id('field_prix'));
    commentaireInput = element(by.id('field_commentaire'));
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

    async setNoteInput(note) {
        await this.noteInput.sendKeys(note);
    }

    async getNoteInput() {
        return this.noteInput.getAttribute('value');
    }

    async setPrixInput(prix) {
        await this.prixInput.sendKeys(prix);
    }

    async getPrixInput() {
        return this.prixInput.getAttribute('value');
    }

    async setCommentaireInput(commentaire) {
        await this.commentaireInput.sendKeys(commentaire);
    }

    async getCommentaireInput() {
        return this.commentaireInput.getAttribute('value');
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

export class CoursDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cours-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cours'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
