import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from '@ag-grid-enterprise/all-modules';
import { license } from '../env';

if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(function(err) {
    return console.log(err);
  });
// License goes here
LicenseManager.setLicenseKey(license.value);
//# sourceMappingURL=main.js.map
