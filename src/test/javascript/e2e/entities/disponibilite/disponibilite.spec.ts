/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DisponibiliteComponentsPage, DisponibiliteDeleteDialog, DisponibiliteUpdatePage } from './disponibilite.page-object';

const expect = chai.expect;

describe('Disponibilite e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let disponibiliteUpdatePage: DisponibiliteUpdatePage;
    let disponibiliteComponentsPage: DisponibiliteComponentsPage;
    let disponibiliteDeleteDialog: DisponibiliteDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Disponibilites', async () => {
        await navBarPage.goToEntity('disponibilite');
        disponibiliteComponentsPage = new DisponibiliteComponentsPage();
        await browser.wait(ec.visibilityOf(disponibiliteComponentsPage.title), 5000);
        expect(await disponibiliteComponentsPage.getTitle()).to.eq('trouvetonprofApp.disponibilite.home.title');
    });

    it('should load create Disponibilite page', async () => {
        await disponibiliteComponentsPage.clickOnCreateButton();
        disponibiliteUpdatePage = new DisponibiliteUpdatePage();
        expect(await disponibiliteUpdatePage.getPageTitle()).to.eq('trouvetonprofApp.disponibilite.home.createOrEditLabel');
        await disponibiliteUpdatePage.cancel();
    });

    it('should create and save Disponibilites', async () => {
        const nbButtonsBeforeCreate = await disponibiliteComponentsPage.countDeleteButtons();

        await disponibiliteComponentsPage.clickOnCreateButton();
        await promise.all([
            disponibiliteUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            disponibiliteUpdatePage.setDureeInput('5'),
            disponibiliteUpdatePage.annonceSelectLastOption()
        ]);
        expect(await disponibiliteUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await disponibiliteUpdatePage.getDureeInput()).to.eq('5');
        await disponibiliteUpdatePage.save();
        expect(await disponibiliteUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await disponibiliteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Disponibilite', async () => {
        const nbButtonsBeforeDelete = await disponibiliteComponentsPage.countDeleteButtons();
        await disponibiliteComponentsPage.clickOnLastDeleteButton();

        disponibiliteDeleteDialog = new DisponibiliteDeleteDialog();
        expect(await disponibiliteDeleteDialog.getDialogTitle()).to.eq('trouvetonprofApp.disponibilite.delete.question');
        await disponibiliteDeleteDialog.clickOnConfirmButton();

        expect(await disponibiliteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
