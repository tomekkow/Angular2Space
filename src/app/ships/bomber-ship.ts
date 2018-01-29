import {SpaceShip} from './space-ship';
import { Pilot } from '../pilot/pilot';

export class BomberShip extends SpaceShip {
    constructor(pilot?: Pilot) {
        super('Viper', '/assets/viper.png', pilot);
        
    }
}