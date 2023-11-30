# RealEstateCareApp
This is a project for the LOI course front-end frameworks

### Installation
Clone repository:

    git clone <repository-url>

Install packages:

    npm install

Start the server:

    ionic serve

### Live version
[https://realestatecareapp.netlify.app](https://realestatecareapp.netlify.app)

### Logging in
The login information to use the application is provided below. This is a fictitious account and intended for demo purposes.

| Email                 | Wachtwoord   |
|-----------------------|--------------|
| admin@rec.nl          | Admin123     |

During the login process, an authentication code is requested. This is displayed in the toaster component after the 'get code' button is clicked. This simulates a two-factor authentication process that will be used in the final version.

### The application
De applicatie bevat een header en een footer. In de header staat de naam van de applicatie, het logo van Real Estate Care en een knop om uit te loggen. Via het logo kom je altijd weer terug op het dashboard en via de uitlog knop weer op het beginscherm. De footer bevat een instellingen knop deze gaat naar het component settings (instellingen) in het midden zit een knop informatie deze gaat naar het component waarin de read.me terug te lezen is. Rechts onderaan zit een fictieve knop waar nog geen inhoud achter zit. Deze is bedoeld voor de toekomst als er meer functionaliteiten worden aangeboden.

Op het dashboard worden doormiddel van vier tegeltjes de verschillende functionaliteiten getoond
- Toegewezen rapportages
- Uitgevoerde rapportages
- Kennisbank
- Instellingen

Via de toegewezen rapportages of de uitgevoerde rapportages komt men door op de knop inspectie invullen of inspectie bewerken te klikken op het component activeInspection van een specifiek ID. Hier kan de inspectie worden aangevuld of worden gewijzigd en vervolgens worden opgeslagen als afgronde of niet afgeronde inspectie. 

### Gebruikte technieken
- Vue.js: Dit framework is gekozen omdat het in de basis heel klein is en gemakkelijk is uit te breiden. Een uitgebreidere toelichting treft u als pdf bij de inleverdocumenten.  
- Ionic: Vue.js wordt aangevuld met Ionic webcomponents en zelf gebouwde componenten om tot een gehele applicatie te komen.   
- Vue-router: Dit router-framework is gebruikt om tussen de schermen van de applicatie te navigeren.
- jsonbin.io: Is de locatie waar de data staat opgeslagen. Deze kan gelezen en aangepast worden door de applicatie.
- Axios: Wordt gebruikt om de data op te halen van de API.

### Veiligheid
Om de applicatie veilig te kunnen gebruiken wordt er gebruik gemaakt van een inlogscherm met two-factor authentication. Deze two-factor authentiacttion wordt nu nog gesimuleert maar in de definitieve versie zal er een code worden verzonden naar de telefoon van de gebruiker. Momenteel staan er in de code van de applicatie nog wat gegevens, deze zullen in de toekomst uit de code gehaald moeten worden. 

### Gebruiksvriendelijkheid
- Er is gebruik gemaakt van iconen in combinatie met tekst. Mocht men de applicatie snel willen scannen zijn de iconen wellicht voldoende maar mocht men de iconen niet snappen dan is er tekstuele onderstuening
- De meeste componenten komen uit de Ionic library en zijn dus consistent ontwikkeld
- Gebruik gemaakt van 1 lettertype 
- Als de gebruiker verkeerde inloggegevens gebruikt of een verkeerde verificatiecode invult wordt dit aan de gebruiker duidelijk gemaakt. 
- Alle pagina's hebben een zelfde indeling
 
### Toegankelijkheid
- Binnen het formulier zijn alle invoervelden omrand en hebben de labels allemaal een aria-label. 
- De pagina's hebben een titel en een introtekst waarin wordt uitgelegd wat men van de pagina kan verwachten.
- Knoppen hebben een duidelijke kleur die afsteekt tegen de achtergrond. Als er twee knoppen op een pagina voorkomen hebben deze een andere kleur om mensen het verschil te wijzen, naast de tekst die in de knoppen staat.

### Style guides/ best practices
- Nette folder structuur
- Alle componenten zijn consistent geschreven en de namen volgens PascalCase genoemd
- data geeft altijd een functie terug
- Inputs hebben labels.

### Conclusie
In een vervolg stadium van dit project zijn er nog wat punten die aandacht vragen. Zo zijn nog niet alle best practices van Vue.js doorgevoerd en kan er zeker ook nog wat gedaan worden aan de gebruiksvriendelijkheid en toegankelijkheid. Zo bestaan bijvoorbeeld niet alle componenten uit meerdere woorden (best practices). Voor de gebruiksvriendelijkheid zou het beter zijn als op de pagina's waar gegevens via een API worden opgehaald een spinner getoond wordt totdat de data is opgehaald. Nu is dit nog niet het geval en kan de gebruiker bij een langzame internetverbinding denken dat de applicatie niet goed werkt. Daarnaast bleek uit de test met een gebruiker dat alleen het logo om terug te komen naar het dashboard niet voldoende is. De gebruiker had graag nog een andere manier gehad om terug te keren naar het dashboard. Dit zou ik de toekomst aangeboden kunnen worden in de footer navigatie. Naast deze punten zal ook de toegankelijkheid nogmaals bekeken moeten worden en kleine verbeteringen worden doorgevoerd.    
