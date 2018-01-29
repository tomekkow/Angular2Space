import { element, by, browser } from 'protractor';

export class HangarPage {
  nagivateTo() {
    return browser.get('/hangar');
  }

  setShipQuantity(number: number) {
    const input = element(by.name('shipCount'));
    return input.clear().then(() => input.sendKeys(number));
  }

  setFighterType() {
    return element.all(by.css(`[name="shipType"]`)).first().click();
  }

  submitProduceForm() {
    return element(by.buttonText('Produkuj')).click();
  }

  getShipsCount() {
    return element.all(by.css('app-space-ship')).count();
  }
}