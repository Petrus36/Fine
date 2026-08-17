import type { CatalogItem, CatalogPageKey } from "@/types/catalog";

type Seed = Omit<CatalogItem, "id" | "position"> & { position?: number };

function items(page: CatalogPageKey, rows: Seed[]): CatalogItem[] {
  return rows.map((row, index) => ({
    ...row,
    page,
    id: `${page}-${row.section}-${index}`,
    position: row.position ?? index,
  }));
}

export const catalogFallbackItems: CatalogItem[] = [
  ...items("PECIVO", [
    { page: "PECIVO", section: "chlieb", category: "KVÁSKOVÝ", name: "Kváskový bochník", description: null, allergens: [1], portion: null, price: 4.2, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "KVÁSKOVÝ", name: "Ražný kváskový", description: null, allergens: [1], portion: null, price: 4.5, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "KLASICKÝ", name: "Obyčajný bochník", description: null, allergens: [1], portion: null, price: 3.2, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "KLASICKÝ", name: "Pšeničný", description: null, allergens: [1], portion: null, price: 3.5, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "KLASICKÝ", name: "Celozrnný špaldový", description: null, allergens: [1], portion: null, price: 4.2, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "BAGETY A ŽEMLE", name: "Bageta", description: null, allergens: [1], portion: null, price: 1.8, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "BAGETY A ŽEMLE", name: "Žemľa", description: null, allergens: [1], portion: null, price: 0.9, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "BAGETY A ŽEMLE", name: "Kaiserka", description: null, allergens: [1], portion: null, price: 1.1, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "PEČENÉ A PUKANÉ", name: "Pukance", description: null, allergens: [1], portion: null, price: 1.6, priceAlt: null },
    { page: "PECIVO", section: "chlieb", category: "PEČENÉ A PUKANÉ", name: "Grahamová žemľa", description: null, allergens: [1], portion: null, price: 1.2, priceAlt: null },

    { page: "PECIVO", section: "sladke", category: "KYSNUTÉ MASLOVÉ", name: "Croissant", description: null, allergens: [1, 3, 7], portion: null, price: 2.2, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "KYSNUTÉ MASLOVÉ", name: "Petit au chocolat", description: null, allergens: [1, 3, 6, 7], portion: null, price: 2.4, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "KYSNUTÉ MASLOVÉ", name: "Pain au raisin", description: null, allergens: [1, 3, 7], portion: null, price: 2.6, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "PUKANÉ A BALENÉ", name: "Škoricový slimák", description: null, allergens: [1, 3, 7], portion: null, price: 2.5, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "PUKANÉ A BALENÉ", name: "Osie hniezdo", description: null, allergens: [1, 3, 7], portion: null, price: 2.3, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "BOHATÉ A ŠŤAVNATÉ", name: "Tvarohový koláč", description: null, allergens: [1, 3, 7], portion: null, price: 2.8, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "BOHATÉ A ŠŤAVNATÉ", name: "Makový závin", description: null, allergens: [1, 3, 7], portion: null, price: 2.7, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "DROBNÉ A LÁKAVÉ", name: "Muffin", description: null, allergens: [1, 3, 7], portion: null, price: 2.4, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "DROBNÉ A LÁKAVÉ", name: "Cookies", description: null, allergens: [1, 3, 7, 8], portion: null, price: 1.9, priceAlt: null },
    { page: "PECIVO", section: "sladke", category: "VYPRÁŽANÉ", name: "Šiška s džemom", description: null, allergens: [1, 3, 7], portion: null, price: 1.8, priceAlt: null },

    { page: "PECIVO", section: "slane", category: "KYSNUTÉ A CHRUMKAVÉ", name: "Pagáč", description: null, allergens: [1, 3, 7], portion: null, price: 1.6, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "KYSNUTÉ A CHRUMKAVÉ", name: "Slaný slimák", description: null, allergens: [1, 3, 7], portion: null, price: 2.2, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "PLNENÉ A SÝTE", name: "Pizza rožok", description: null, allergens: [1, 7], portion: null, price: 2.8, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "PLNENÉ A SÝTE", name: "Šunkovo-syrový croissant", description: null, allergens: [1, 3, 7], portion: null, price: 3.2, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "PEČENÉ A TUČNÉ", name: "Quiche lorraine", description: null, allergens: [1, 3, 7], portion: null, price: 4.5, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "PEČENÉ A TUČNÉ", name: "Quiche so špenátom", description: null, allergens: [1, 3, 7], portion: null, price: 4.5, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "DROBNÉ SLANÉ", name: "Syrová tyčinka", description: null, allergens: [1, 7], portion: null, price: 1.4, priceAlt: null },
    { page: "PECIVO", section: "slane", category: "DROBNÉ SLANÉ", name: "Olivové pecivo", description: null, allergens: [1], portion: null, price: 1.5, priceAlt: null },
  ]),

  ...items("A_LA_CARTE", [
    { page: "A_LA_CARTE", section: "polievka", category: null, name: "Slepačí vývar", description: null, allergens: [1, 3, 9], portion: "0,25 l", price: 4.0, priceAlt: null },

    { page: "A_LA_CARTE", section: "predjedla", category: null, name: "Hovädzí tatarák", description: null, allergens: [1, 3, 7, 10], portion: "100 g", price: 15.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "predjedla", category: null, name: "Lososový tatarák", description: null, allergens: [4], portion: "100 g", price: 14.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "predjedla", category: null, name: "Krevety na cesnaku", description: null, allergens: [2], portion: "150 g", price: 11.5, priceAlt: null },

    { page: "A_LA_CARTE", section: "salaty", category: null, name: "Caesar šalát", description: null, allergens: [1, 3, 4, 7], portion: "250 g", price: 9.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Prídavky k šalátu", name: "Kuracie mäso", description: null, allergens: [], portion: "80 g", price: 4.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Prídavky k šalátu", name: "Losos", description: null, allergens: [4], portion: "50 g", price: 6.0, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Prídavky k šalátu", name: "Krevety", description: null, allergens: [2], portion: "50 g", price: 7.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Malé šaláty", name: "Miešaný šalát", description: null, allergens: [], portion: "150 g", price: 4.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Malé šaláty", name: "Uhorkový šalát", description: null, allergens: [], portion: "150 g", price: 4.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "salaty", category: "Malé šaláty", name: "Paradajkový šalát", description: null, allergens: [], portion: "150 g", price: 4.5, priceAlt: null },

    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Kuracie prsia Supreme", description: null, allergens: [], portion: "200 g", price: 12.2, priceAlt: null },
    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Medailóniky z bravčovej panenky s dubákovou omáčkou", description: null, allergens: [7], portion: "200 g", price: 17.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Pikantná marinovaná bravčová krkovička", description: null, allergens: [1, 7], portion: "350 g", price: 12.8, priceAlt: null },
    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Hovädzí steak na sviečkovici „Grain fed“", description: null, allergens: [], portion: "200 g", price: 28.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Teľací „Viedenský rezeň“", description: null, allergens: [1, 3, 7], portion: "180 g", price: 15.2, priceAlt: null },
    { page: "A_LA_CARTE", section: "hlavne", category: null, name: "Grilovaný losos", description: null, allergens: [4], portion: "150 g", price: 14.5, priceAlt: null },

    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Pečené zemiaky z pece", description: null, allergens: [], portion: "200 g", price: 3.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Steakové hranolky", description: null, allergens: [], portion: "200 g", price: 3.8, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Batátové pyré", description: null, allergens: [7], portion: "150 g", price: 3.9, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Zemiakové pyré", description: null, allergens: [7], portion: "150 g", price: 3.2, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Dusená ryža", description: null, allergens: [], portion: "150 g", price: 2.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Kváskový chlieb", description: null, allergens: [1], portion: "2 ks", price: 1.8, priceAlt: null },
    { page: "A_LA_CARTE", section: "prilohy", category: null, name: "Grilovaná zelenina", description: null, allergens: [], portion: "150 g", price: 4.5, priceAlt: null },

    { page: "A_LA_CARTE", section: "omacky", category: null, name: "Tatárska omáčka", description: null, allergens: [3, 10], portion: "40 g", price: 1.8, priceAlt: null },
    { page: "A_LA_CARTE", section: "omacky", category: null, name: "Dubáková omáčka", description: null, allergens: [7], portion: "50 g", price: 2.5, priceAlt: null },
    { page: "A_LA_CARTE", section: "omacky", category: null, name: "Peprová omáčka", description: null, allergens: [7], portion: "50 g", price: 2.2, priceAlt: null },
    { page: "A_LA_CARTE", section: "omacky", category: null, name: "Cesnakový dip", description: null, allergens: [3, 7], portion: "40 g", price: 1.8, priceAlt: null },
    { page: "A_LA_CARTE", section: "omacky", category: null, name: "BBQ omáčka", description: null, allergens: [10], portion: "40 g", price: 1.8, priceAlt: null },

    { page: "A_LA_CARTE", section: "dezerty", category: null, name: "Čokoládový fondant", description: null, allergens: [1, 3, 7], portion: "120 g", price: 6.5, priceAlt: null },
  ]),

  ...items("RANAJKY", [
    { page: "RANAJKY", section: "sladke", category: null, name: "Palacinky s ovocím a šľahačkou", description: "Tri palacinky, sezónne ovocie, šľahačka a javorový sirup.", allergens: [1, 3, 7], portion: "280 g", price: 7.9, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: null, name: "Francúzske toasty", description: "Brioškový chlieb, škorica, mascarpone a lesné ovocie.", allergens: [1, 3, 7], portion: "250 g", price: 8.5, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: null, name: "Granola s jogurtom", description: "Domáca granola, grécky jogurt, med a čerstvé ovocie.", allergens: [1, 7, 8], portion: "220 g", price: 6.9, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: null, name: "Kaša z ovsených vločiek", description: "Na mlieku alebo rastlinnom nápoji, s banánom a orieškami.", allergens: [1, 7, 8], portion: "300 g", price: 5.9, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: "Prílohy a doplatky", name: "Šľahačka", description: null, allergens: [7], portion: "30 g", price: 0.8, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: "Prílohy a doplatky", name: "Sezónne ovocie", description: null, allergens: [], portion: "80 g", price: 1.8, priceAlt: null },
    { page: "RANAJKY", section: "sladke", category: "Prílohy a doplatky", name: "Javorový sirup", description: null, allergens: [], portion: "20 ml", price: 0.7, priceAlt: null },

    { page: "RANAJKY", section: "bagety", category: null, name: "Bageta šunka & syr", description: "Maslová bageta, šunka, eidam, šalát, paradajka a dresing.", allergens: [1, 7, 10], portion: "280 g", price: 6.5, priceAlt: null },
    { page: "RANAJKY", section: "bagety", category: null, name: "Bageta mozzarella & pesto", description: "Mozzarella, pesto, sušené paradajky a rukola.", allergens: [1, 7, 8], portion: "260 g", price: 6.9, priceAlt: null },
    { page: "RANAJKY", section: "bagety", category: null, name: "Bageta s tuniakom", description: "Tuniak, vajíčko, šalát a bylinkový dresing.", allergens: [1, 3, 4], portion: "270 g", price: 7.2, priceAlt: null },

    { page: "RANAJKY", section: "slane", category: null, name: "Anglická raňajka", description: "Vajíčka, slanina, klobáska, fazuľa, grilovaná paradajka a toast.", allergens: [1, 3], portion: "380 g", price: 11.5, priceAlt: null },
    { page: "RANAJKY", section: "slane", category: null, name: "Vajíčka Benedikt", description: "Pošírované vajíčka, anglická slanina, holandská omáčka, muffin.", allergens: [1, 3, 7], portion: "280 g", price: 9.9, priceAlt: null },
    { page: "RANAJKY", section: "slane", category: null, name: "Avocado toast", description: "Kváskový toast, avokádo, vajíčko, chilli a citrón.", allergens: [1, 3], portion: "240 g", price: 8.9, priceAlt: null },
    { page: "RANAJKY", section: "slane", category: null, name: "Omeleta so šunkou a syrom", description: "Tri vajíčka, šunka, eidam, bylinky a toast.", allergens: [1, 3, 7], portion: "300 g", price: 8.5, priceAlt: null },
    { page: "RANAJKY", section: "slane", category: null, name: "Croissant sendvič", description: "Maslový croissant, vajíčko, slanina a cheddar.", allergens: [1, 3, 7], portion: "220 g", price: 7.9, priceAlt: null },
  ]),

  ...items("NAPOJE", [
    { page: "NAPOJE", section: "kava", category: null, name: "Ristretto", description: null, allergens: [], portion: "8 g", price: 1.8, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Espresso", description: null, allergens: [], portion: "8 g", price: 1.9, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Espresso Doppio", description: null, allergens: [], portion: "16 g", price: 2.5, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Cappuccino", description: null, allergens: [7], portion: "180 ml", price: 2.8, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Caffè Latte", description: null, allergens: [7], portion: "250 ml", price: 3.2, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Flat White", description: null, allergens: [7], portion: "180 ml", price: 3.2, priceAlt: null },
    { page: "NAPOJE", section: "kava", category: null, name: "Bezlaktózové mlieko", description: null, allergens: [], portion: "doplatok", price: 0.4, priceAlt: null },

    { page: "NAPOJE", section: "kava-special", category: null, name: "Espresso Tonic", description: null, allergens: [], portion: "250 ml", price: 3.9, priceAlt: null },
    { page: "NAPOJE", section: "kava-special", category: null, name: "Espresso Tonic Orange", description: null, allergens: [], portion: "250 ml", price: 4.2, priceAlt: null },
    { page: "NAPOJE", section: "kava-special", category: null, name: "Ochutený Flat White", description: null, allergens: [7], portion: "180 ml", price: 3.6, priceAlt: null },
    { page: "NAPOJE", section: "kava-special", category: null, name: "Ochutený Caffè Latte", description: null, allergens: [7], portion: "250 ml", price: 3.6, priceAlt: null },

    { page: "NAPOJE", section: "matcha", category: null, name: "Matcha Latte", description: null, allergens: [7], portion: "250 ml", price: 3.9, priceAlt: null },
    { page: "NAPOJE", section: "matcha", category: null, name: "Iced Matcha Latte Mango", description: null, allergens: [7], portion: "350 ml", price: 4.5, priceAlt: null },
    { page: "NAPOJE", section: "matcha", category: null, name: "Iced Matcha jahoda", description: null, allergens: [7], portion: "350 ml", price: 4.5, priceAlt: null },
    { page: "NAPOJE", section: "matcha", category: null, name: "Coco Cloud Matcha", description: null, allergens: [], portion: "300 ml", price: 4.8, priceAlt: null },

    { page: "NAPOJE", section: "limonady", category: null, name: "Jahoda, mäta & citrón", description: null, allergens: [], portion: "0,3 / 0,5 l", price: 5.5, priceAlt: 7.2 },
    { page: "NAPOJE", section: "limonady", category: null, name: "Uhorka & limetka", description: null, allergens: [], portion: "0,3 / 0,5 l", price: 5.5, priceAlt: 7.2 },
    { page: "NAPOJE", section: "limonady", category: null, name: "Pomaranč & marakuja", description: null, allergens: [], portion: "0,3 / 0,5 l", price: 5.5, priceAlt: 7.2 },
    { page: "NAPOJE", section: "limonady", category: null, name: "Bazový grep", description: null, allergens: [], portion: "0,3 / 0,5 l", price: 5.5, priceAlt: 7.2 },

    { page: "NAPOJE", section: "caje", category: null, name: "Čaj sypaný (podľa ponuky)", description: null, allergens: [], portion: "0,3 l", price: 2.8, priceAlt: null },
    { page: "NAPOJE", section: "caje", category: null, name: "Čaj z čerstvej mäty alebo zázvoru", description: null, allergens: [], portion: "0,3 l", price: 3.2, priceAlt: null },

    { page: "NAPOJE", section: "nealko", category: null, name: "Mattoni perlivá", description: null, allergens: [], portion: "0,33 l", price: 2.1, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Mattoni neperlivá", description: null, allergens: [], portion: "0,33 l", price: 2.1, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Coca-Cola / Coca-Cola Zero", description: null, allergens: [], portion: "0,33 l", price: 2.5, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Fanta", description: null, allergens: [], portion: "0,33 l", price: 2.5, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Sprite", description: null, allergens: [], portion: "0,33 l", price: 2.5, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Kofola", description: null, allergens: [], portion: "0,33 l", price: 2.4, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Vinea", description: null, allergens: [], portion: "0,25 l", price: 2.4, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Rauch džús (pomaranč / jablko)", description: null, allergens: [], portion: "0,2 l", price: 2.6, priceAlt: null },
    { page: "NAPOJE", section: "nealko", category: null, name: "Kombucha", description: "Podľa aktuálnej ponuky.", allergens: [], portion: "0,33 l", price: 5.2, priceAlt: null },

    { page: "NAPOJE", section: "drinky", category: null, name: "Hugo Spritz", description: null, allergens: [12], portion: "0,2 l", price: 5.9, priceAlt: null },
    { page: "NAPOJE", section: "drinky", category: null, name: "Aperol Spritz", description: null, allergens: [12], portion: "0,2 l", price: 6.5, priceAlt: null },
    { page: "NAPOJE", section: "drinky", category: null, name: "Gin Tonic", description: null, allergens: [], portion: "0,2 l", price: 5.9, priceAlt: null },
    { page: "NAPOJE", section: "drinky", category: null, name: "Mimosa", description: null, allergens: [12], portion: "0,15 l", price: 6.5, priceAlt: null },

    { page: "NAPOJE", section: "pivo", category: null, name: "Pilsner Urquell (čapované)", description: null, allergens: [1], portion: "0,5 l", price: 2.8, priceAlt: null },
    { page: "NAPOJE", section: "pivo", category: null, name: "Birell (nealko)", description: null, allergens: [1], portion: "0,5 l", price: 2.4, priceAlt: null },

    { page: "NAPOJE", section: "vina", category: null, name: "Biele víno (podľa ponuky)", description: null, allergens: [12], portion: "0,1 / 0,75 l", price: 2.1, priceAlt: 16.0 },
    { page: "NAPOJE", section: "vina", category: null, name: "Červené víno (podľa ponuky)", description: null, allergens: [12], portion: "0,1 / 0,75 l", price: 2.1, priceAlt: 16.0 },
    { page: "NAPOJE", section: "vina", category: null, name: "Ruže (podľa ponuky)", description: null, allergens: [12], portion: "0,1 / 0,75 l", price: 2.1, priceAlt: 16.0 },
    { page: "NAPOJE", section: "vina", category: null, name: "Prosecco", description: null, allergens: [12], portion: "0,1 / 0,75 l", price: 2.8, priceAlt: 20.0 },

    { page: "NAPOJE", section: "destilaty", category: null, name: "Borovička", description: null, allergens: [], portion: "0,04 l", price: 3.5, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Beefeater Gin", description: null, allergens: [], portion: "0,04 l", price: 4.2, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Absolut Vodka", description: null, allergens: [], portion: "0,04 l", price: 4.2, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Jameson", description: null, allergens: [], portion: "0,04 l", price: 4.5, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Ovocné destiláty 52 %", description: null, allergens: [], portion: "0,04 l", price: 4.9, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Diplomático", description: null, allergens: [], portion: "0,04 l", price: 6.5, priceAlt: null },
    { page: "NAPOJE", section: "destilaty", category: null, name: "Karpatské Brandy", description: null, allergens: [], portion: "0,04 l", price: 7.9, priceAlt: null },
  ]),
];
