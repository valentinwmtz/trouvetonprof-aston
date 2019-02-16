/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CoursComponentsPage, CoursDeleteDialog, CoursUpdatePage } from './cours.page-object';

const expect = chai.expect;

describe('Cours e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let coursUpdatePage: CoursUpdatePage;
    let coursComponentsPage: CoursComponentsPage;
    let coursDeleteDialog: CoursDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Cours', async () => {
        await navBarPage.goToEntity('cours');
        coursComponentsPage = new CoursComponentsPage();
        expect(await coursComponentsPage.getTitle()).to.eq('trouvetonprofApp.cours.home.title');
    });

    it('should load create Cours page', async () => {
        await coursComponentsPage.clickOnCreateButton();
        coursUpdatePage = new CoursUpdatePage();
        expect(await coursUpdatePage.getPageTitle()).to.eq('trouvetonprofApp.cours.home.createOrEditLabel');
        await coursUpdatePage.cancel();
    });

    it('should create and save Cours', async () => {
        const nbButtonsBeforeCreate = await coursComponentsPage.countDeleteButtons();

        await coursComponentsPage.clickOnCreateButton();
        await promise.all([
            coursUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            coursUpdatePage.setDureeInput('5'),
            coursUpdatePage.setNoteInput('5'),
            coursUpdatePage.setPrixInput('5'),
            coursUpdatePage.setCommentaireInput('commentaire'),
            coursUpdatePage.annonceSelectLastOption(),
            coursUpdatePage.coursSelectLastOption()
        ]);
        expect(await coursUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
        expect(await coursUpdatePage.getDureeInput()).to.eq('5');
        expect(await coursUpdatePage.getNoteInput()).to.eq('5');
        expect(await coursUpdatePage.getPrixInput()).to.eq('5');
        expect(await coursUpdatePage.getCommentaireInput()).to.eq('commentaire');
        await coursUpdatePage.save();
        expect(await coursUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await coursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Cours', async () => {
        const nbButtonsBeforeDelete = await coursComponentsPage.countDeleteButtons();
        await coursComponentsPage.clickOnLastDeleteButton();

        coursDeleteDialog = new CoursDeleteDialog();
        expect(await coursDeleteDialog.getDialogTitle()).to.eq('trouvetonprofApp.cours.delete.question');
        await coursDeleteDialog.clickOnConfirmButton();

        expect(await coursComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
