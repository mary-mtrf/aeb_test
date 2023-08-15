import { NgModule, inject } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.iconRegistry
      .addSvgIcon(
        'genderless',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/genderless.svg`
        )
      )
      .addSvgIcon(
        'male',
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/mars.svg`)
      )
      .addSvgIcon(
        'unknown',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `assets/icons/unknown.svg`
        )
      )
      .addSvgIcon(
        'back',
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/back.svg`)
      )
      .addSvgIcon(
        'filter',
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/filter.svg`)
      )
      .addSvgIcon(
        'female',
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/venus.svg`)
      );
  }
}
