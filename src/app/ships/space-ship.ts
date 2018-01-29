import {Pilot} from "../pilot/pilot"
export abstract class SpaceShip {

    modelName: string;
    imageUrl: string;
    health: number = 100;
    activeShields: boolean = true;
    activeWeapon: boolean = true;
    pilot: Pilot;

constructor(modelName: string, imageUrl: string, pilot?: Pilot){
this.modelName = modelName;
this.imageUrl = imageUrl;
this.pilot = pilot;
}

}



