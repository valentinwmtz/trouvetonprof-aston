/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DomaineComponentsPage, DomaineDeleteDialog, DomaineUpdatePage } from './domaine.page-object';

const expect = chai.expect;

describe('Domaine e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let domaineUpdatePage: DomaineUpdatePage;
    let domaineComponentsPage: DomaineComponentsPage;
    let domaineDeleteDialog: DomaineDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Domaines', async () => {
        await navBarPage.goToEntity('domaine');
        domaineComponentsPage = new DomaineComponentsPage();
        expect(await domaineComponentsPage.getTitle()).to.eq('trouvetonprofApp.domaine.home.title');
    });

    it('should load create Domaine page', async () => {
        await domaineComponentsPage.clickOnCreateButton();
        domaineUpdatePage = new DomaineUpdatePage();
        expect(await domaineUpdatePage.getPageTitle()).to.eq('trouvetonprofApp.domaine.home.createOrEditLabel');
        await domaineUpdatePage.cancel();
    });

    it('should create and save Domaines', async () => {
        const nbButtonsBeforeCreate = await domaineComponentsPage.countDeleteButtons();

        await domaineComponentsPage.clickOnCreateButton();
        await promise.all([domaineUpdatePage.setTitreInput('titre'), domaineUpdatePage.setDescriptionInput('description')]);
        expect(await domaineUpdatePage.getTitreInput()).to.eq('titre');
        expect(await domaineUpdatePage.getDescriptionInput()).to.eq('description');
        await domaineUpdatePage.save();
        expect(await domaineUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await domaineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Domaine', async () => {
        const nbButtonsBeforeDelete = await domaineComponentsPage.countDeleteButtons();
        await domaineComponentsPage.clickOnLastDeleteButton();

        domaineDeleteDialog = new DomaineDeleteDialog();
        expect(await domaineDeleteDialog.getDialogTitle()).to.eq('trouvetonprofApp.domaine.delete.question');
        await domaineDeleteDialog.clickOnConfirmButton();

        expect(await domaineComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
