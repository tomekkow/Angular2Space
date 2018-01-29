import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpaceShip } from './space-ship';
import { SpaceShipFormValues } from './space-ship-form-values';
import { SpaceShipType } from './space-ship-type';
import { FighterShip } from './fighter-ship';
import { BomberShip } from './bomber-ship';

@Injectable()
export class SpaceShipService {
  static shipProductionTime = 2000;
  hangarShips$: BehaviorSubject<SpaceShip[]> = new BehaviorSubject<SpaceShip[]>([]);

  constructor() {}

  produceShips(formValues: SpaceShipFormValues): Observable<SpaceShip> {
    const source = Observable
      .range(0, formValues.shipCount)
      .delay(SpaceShipService.shipProductionTime * formValues.shipCount)
      .map(() => {
        switch (formValues.shipType) {
          case SpaceShipType.Fighter:
            return new FighterShip();
          case SpaceShipType.Bomber:
            return new BomberShip();
          default:
            const error = new Error('Invalid ship type');
            return Observable.throw(error);
        }
      });
    source.subscribe((spaceShip: SpaceShip) => {
      const ships = this.hangarShips$.getValue().concat([spaceShip]);
      this.hangarShips$.next(ships);
    });
    return source;
  }
  removeShip(shipIndex: number) {
    const ships = [...this.hangarShips$.getValue()];
    ships.splice(shipIndex, 1);
    this.hangarShips$.next(ships);
  }
}