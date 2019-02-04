import { element, by, ElementFinder } from 'protractor';

export class AnnonceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-annonce div table .btn-danger'));
    title = element.all(by.css('jhi-annonce div h2#page-heading span')).first();

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

export class AnnonceUpdatePage {
    pageTitle = element(by.id('jhi-annonce-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titreInput = element(by.id('field_titre'));
    descriptionInput = element(by.id('field_description'));
    statusSelect = element(by.id('field_status'));
    imageInput = element(by.id('file_image'));
    adminValideInput = element(by.id('field_adminValide'));
    prixHoraireInput = element(by.id('field_prixHoraire'));
    profilSelect = element(by.id('field_profil'));
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

    async setStatusSelect(status) {
        await this.statusSelect.sendKeys(status);
    }

    async getStatusSelect() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    async statusSelectLastOption() {
        await this.statusSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setImageInput(image) {
        await this.imageInput.sendKeys(image);
    }

    async getImageInput() {
        return this.imageInput.getAttribute('value');
    }

    getAdminValideInput() {
        return this.adminValideInput;
    }
    async setPrixHoraireInput(prixHoraire) {
        await this.prixHoraireInput.sendKeys(prixHoraire);
    }

    async getPrixHoraireInput() {
        return this.prixHoraireInput.getAttribute('value');
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

export class AnnonceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-annonce-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-annonce'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
