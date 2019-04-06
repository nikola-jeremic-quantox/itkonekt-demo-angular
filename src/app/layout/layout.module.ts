import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

import { DrawerComponent } from './drawer/drawer.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { NotesComponent } from './notes/notes.component';

const layoutComponents = [DrawerComponent, ChatComponent, HeaderComponent, ProfileComponent, NotesComponent];

@NgModule({
  declarations: [ ...layoutComponents ],
  imports: [CommonModule, MaterialModule],
  exports: [ ...layoutComponents ],
})
export class LayoutModule { }
