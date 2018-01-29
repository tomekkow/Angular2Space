import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { A2sCommModule } from 'a2s-comm';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HangarComponent } from './hangar/hangar.component';
import { SpaceShipComponent } from './ships/space-ship/space-ship.component';
import { PilotComponent } from './pilot/pilot/pilot.component';
import { PilotRoomComponent } from './pilot/pilot-room/pilot-room.component';
import { EngineersRoomComponent } from './ships/engineers-room/engineers-room.component';
import { SpaceShipService } from './ships/space-ship.service';
import { PilotService } from './pilot/pilot.service';
import { SpaceImageDirective } from './shared/space-image.directive';
import { ShipNamePipe } from './ships/ship-name.pipe';
import { BlackHoleComponent } from './black-hole/black-hole.component';
import { AppRoutingModule } from './app-routing.module';
import { EngineersTrashComponent } from './ships/engineers-trash/engineers-trash.component';
import { EngineersTrashGuard } from './ships/engineers-trash/engineers-trash-guard.service';
import { PilotFormComponent } from './pilot/pilot-form/pilot-form.component';
import { IntelBrowserComponent } from './intel-browser/intel-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    HangarComponent,
    SpaceShipComponent,
    PilotComponent,
    PilotRoomComponent,
    EngineersRoomComponent,
    SpaceImageDirective,
    ShipNamePipe,
    SpaceImageDirective,
    BlackHoleComponent ,
    EngineersTrashComponent,
    PilotFormComponent,
    IntelBrowserComponent,
    
  ],
  imports: [
    BrowserModule,
    A2sCommModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
      
  ],
   providers: [
   SpaceShipService,
   PilotService,
   EngineersTrashGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
