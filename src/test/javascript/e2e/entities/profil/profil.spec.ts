/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ProfilComponentsPage, ProfilDeleteDialog, ProfilUpdatePage } from './profil.page-object';

const expect = chai.expect;

describe('Profil e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let profilUpdatePage: ProfilUpdatePage;
    let profilComponentsPage: ProfilComponentsPage;
    let profilDeleteDialog: ProfilDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Profils', async () => {
        await navBarPage.goToEntity('profil');
        profilComponentsPage = new ProfilComponentsPage();
        expect(await profilComponentsPage.getTitle()).to.eq('trouvetonprofApp.profil.home.title');
    });

    it('should load create Profil page', async () => {
        await profilComponentsPage.clickOnCreateButton();
        profilUpdatePage = new ProfilUpdatePage();
        expect(await profilUpdatePage.getPageTitle()).to.eq('trouvetonprofApp.profil.home.createOrEditLabel');
        await profilUpdatePage.cancel();
    });

    it('should create and save Profils', async () => {
        const nbButtonsBeforeCreate = await profilComponentsPage.countDeleteButtons();

        await profilComponentsPage.clickOnCreateButton();
        await promise.all([
            profilUpdatePage.setDateNaissanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            profilUpdatePage.setPaysInput('pays'),
            profilUpdatePage.setAdresseInput('adresse'),
            profilUpdatePage.setTelephoneInput('telephone'),
            profilUpdatePage.sexeSelectLastOption(),
            profilUpdatePage.userSelectLastOption(),
            profilUpdatePage.coursSelectLastOption()
        ]);
        expect(await profilUpdatePage.getDateNaissanceInput()).to.contain('2001-01-01T02:30');
        expect(await profilUpdatePage.getPaysInput()).to.eq('pays');
        expect(await profilUpdatePage.getAdresseInput()).to.eq('adresse');
        expect(await profilUpdatePage.getTelephoneInput()).to.eq('telephone');
        await profilUpdatePage.save();
        expect(await profilUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await profilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Profil', async () => {
        const nbButtonsBeforeDelete = await profilComponentsPage.countDeleteButtons();
        await profilComponentsPage.clickOnLastDeleteButton();

        profilDeleteDialog = new ProfilDeleteDialog();
        expect(await profilDeleteDialog.getDialogTitle()).to.eq('trouvetonprofApp.profil.delete.question');
        await profilDeleteDialog.clickOnConfirmButton();

        expect(await profilComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
