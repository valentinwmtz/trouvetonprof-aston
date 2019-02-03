/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AnnonceComponentsPage, AnnonceDeleteDialog, AnnonceUpdatePage } from './annonce.page-object';

const expect = chai.expect;

describe('Annonce e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let annonceUpdatePage: AnnonceUpdatePage;
    let annonceComponentsPage: AnnonceComponentsPage;
    let annonceDeleteDialog: AnnonceDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Annonces', async () => {
        await navBarPage.goToEntity('annonce');
        annonceComponentsPage = new AnnonceComponentsPage();
        expect(await annonceComponentsPage.getTitle()).to.eq('trouvetonprofApp.annonce.home.title');
    });

    it('should load create Annonce page', async () => {
        await annonceComponentsPage.clickOnCreateButton();
        annonceUpdatePage = new AnnonceUpdatePage();
        expect(await annonceUpdatePage.getPageTitle()).to.eq('trouvetonprofApp.annonce.home.createOrEditLabel');
        await annonceUpdatePage.cancel();
    });

    it('should create and save Annonces', async () => {
        const nbButtonsBeforeCreate = await annonceComponentsPage.countDeleteButtons();

        await annonceComponentsPage.clickOnCreateButton();
        await promise.all([
            annonceUpdatePage.setTitreInput('titre'),
            annonceUpdatePage.setDescriptionInput('description'),
            annonceUpdatePage.statusSelectLastOption(),
            annonceUpdatePage.profilSelectLastOption(),
            annonceUpdatePage.domaineSelectLastOption()
        ]);
        expect(await annonceUpdatePage.getTitreInput()).to.eq('titre');
        expect(await annonceUpdatePage.getDescriptionInput()).to.eq('description');
        await annonceUpdatePage.save();
        expect(await annonceUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await annonceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Annonce', async () => {
        const nbButtonsBeforeDelete = await annonceComponentsPage.countDeleteButtons();
        await annonceComponentsPage.clickOnLastDeleteButton();

        annonceDeleteDialog = new AnnonceDeleteDialog();
        expect(await annonceDeleteDialog.getDialogTitle()).to.eq('trouvetonprofApp.annonce.delete.question');
        await annonceDeleteDialog.clickOnConfirmButton();

        expect(await annonceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
