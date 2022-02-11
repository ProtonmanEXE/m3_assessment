Add-ons:
1) Bootstrap + Icons installed:
npm install --save bootstrap
npm i bootstrap-icons --save

2) Uuid installed
npm install uuid
! bug not fixed yet, remember to run npm i --save-dev @types/uuid !

3) Server viewing (localhost:8080) installed
npm install -g http-server

4) GitHub Pages installed
ng add angular-cli-ghpages

Browser List adjusted:
not Safari 15.2-15.3
not ios_saf 15.2-15.3

Angular Imports:
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
_________________________________________________________________________________

SB DI:
<!-- https://mvnrepository.com/artifact/org.glassfish/jakarta.json -->
<dependency>
    	<groupId>org.glassfish</groupId>
    		<artifactId>jakarta.json</artifactId>
    	<version>2.0.1</version>
</dependency>

SB Others:
Added java.runtime.version=17 in system properties
Added @Override CORS in AppConfig.java