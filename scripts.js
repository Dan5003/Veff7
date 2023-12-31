/**
 * Verkefnalýsing fyrir verkefni 7 með mörgum athugasemdum, sjá einnig yfirferð í fyrirlestri 9.
 * Sjá `scripts-plain.js` fyrir lausn án athugasemda.
 * Föll og breytur eru skjalaðar með jsdoc, athugasemdir á þessu:
 * // formi eru til nánari útskýringa.
 * eru aukalega og ekki nauðsynlegar.
 * Kóðabútar eru innan ``.
 *
 * @see https://jsdoc.app/
 */

// Til að byrja með skilgreinum við gögn sem við notum í forritinu okkar. Við þurfum að skilgreina
// - Vörur sem er hægt að kaupa
// - Körfu sem geymir vörur sem notandi vill kaupa
// Í báðum tilfellum notum við gagnaskipan (e. data structure) með því að nota hluti (objects),
// fylki (array) og grunn gildi (e. primitive values) eins og tölur (numbers) og strengi (string).

// Hér notum við _typedef_ til að skilgreina hvernig Product hluturinn okkar lítur út.
// Þetta er ekki JavaScript heldur sérstök skilgreining frá JSDoc sem VSCode notar til að hjálpa
// okkur við að skrifa með því að birta intellisense/autocomplete og hugsanlega sýna villur.
// Við getum látið VSCode sýna okkur villur:
// - Opna „Settings“ með Cmd + , (macOS) eða Ctrl + , (Windows) og slá „check js“ í leitargluggann.
// - Velja „JavaScript › Implicit Project Config: Check JS“ og haka í.
// https://code.visualstudio.com/docs/nodejs/working-with-javascript#_type-checking-javascript

/**
 * @typedef {Object} Product
 * @property {number} id Auðkenni vöru, jákvæð heiltala stærri en 0.
 * @property {string} title Titill vöru, ekki tómur strengur.
 * @property {string} description Lýsing á vöru, ekki tómur strengur.
 * @property {number} price Verð á vöru, jákvæð heiltala stærri en 0.
 */

// Við viljum geta haft fleiri en eina vöru þannig að við þurfum að hafa fylki af vörum.
// Við byrjum með fylki sem hefur færslur en gætum síðan í forritinu okkar bætt við vörum.

/**
 * Fylki af vörum sem hægt er að kaupa.
 * @type {Array<Product>}
 */
const products = [
    // Fyrsta stak í fylkinu, verður aðgengilegt sem `products[0]`
    {
      // Auðkennið er eitthvað sem við bara búum til sjálf, verður að vera einkvæmt en engin regla í
      // JavaScript passar upp á það.
      // Þar sem það er aðeins ein tegund af tölum í JavaScript þá verðum við að passa okkur hér að
      // nota heiltölu, ekkert sem bannar okkur að setja `1.1`.
      // Ef við kveikjum á að VSCode sýni villur og við breytum þessu í t.d. streng munum við sjá
      // villu með rauðum undirlínum og færslu í `Problems` glugganum.
      id: 1,
  
      // Titill er strengur, en gæti verið „tómi strengurinn“ (e. empty string) sem er bara `''`.
      // JavaScript gerir ekki greinarmun á tómum streng og strengjum sem innihalda eitthvað.
      // Við gætum líka notað `""` eða ` `` ` (backticks) til að skilgreina strengi en venjan er að
      // nota einfaldar gæsalappir/úrfellingarkommur (e. single quotes).
      title: 'HTML húfa',
  
      // Hér skilgreinum við streng í nýrri línu á eftir skilgreiningu á lykli (key) í hlutnum.
      description:
        'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
  
      // Verð sem jákvæð heiltala. Getum líka notað `1000` en það er hægt að nota undirstrik (_) til
      // að gera stórar tölur læsilegri, t.d. `100_000_000`.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#numeric_separators
      price: 5_000,
    },
    {
      id: 2,
      title: 'CSS sokkar',
      description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
      price: 3_000,
    },
    {
      id: 3,
      title: 'JavaScript jakki',
      description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
      price: 20_000,
    },
    // Hér gætum við bætt við fleiri vörum í byrjun.
  ];
  
  // Skilgreinum hluti sem halda utan um það sem notandi ætlar að kaupa.
  
  /**
   * @typedef {Object} CartLine
   * @property {Product} product Vara í körfu.
   * @property {number} quantity Fjöldi af vöru.
   */
  
  /**
   * @typedef {Object} Cart
   * @property {Array<CartLine>} lines Fylki af línum í körfu.
   * @property {string|null} name Nafn á kaupanda ef skilgreint, annars `null`.
   * @property {string|null} address Heimilisfang kaupanda ef skilgreint, annars `null`.
   */
  
  // Við notum `null` sem gildi fyrir `name` og `address` áður en notandi hefur skilgreint þau.
  
  /**
   * Karfa sem geymir vörur sem notandi vill kaupa.
   * @type {Cart}
   */
  const cart = {
    lines: [],
    name: null,
    address: null,
  };
  
  // Nú höfum við skilgreint gögnin sem forritið okkar notar. Næst skilgreinum við föll sem vinna með
  // gögnin og inntak frá notanda.
  // Athugið að hér erum við að setja öll föll í sömu skrá og sama scope, það myndi hjálpa okkur að
  // setja föll í mismunandi skrár og nota módúla til að tengja saman, við gerum það í verkefni 8.
  
  // --------------------------------------------------------
  // Hjálparföll
  
  /**
   * Format prices for Icelandic krónur using the "Intl" web standard.
   * Please note that Chrome does not support Icelandic and therefore will not display prices formatted according to Icelandic rules.
   * @example
   * const price = formatPrice(123000);
   * console.log(price); // Skrifar út `123.000 kr.`
   * @param {number} price to edit.
   * @returns price formatted to the icelandic rules.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
   */
  function formatPrice(price) {
    /* Útfæra */
    const formatter = new Intl.NumberFormat('is-IS',{
      style: 'currency',
      currency: 'ISK',
    });

    return formatter.format(price);
  }
  
  /**
   * Athuga hvort `num` sé heiltala á bilinu `[min, max]`.
   * @param {number} num Call to check.
   * @param {number} min Minimum value of a number (inclusive), default `0`.
   * @param {number} max Maximum value of a number (up to and including it), default `Infinity`.
   * @returns `true` ef `num` er heiltala á bilinu `[min, max]`, annars `false`.
   */
  function validateInteger(num, min = 0, max = Infinity) {
    // ToDo: fix this damn function.
    
    if(!Number.isInteger(num)){
      console.error('number is not integer')
      return false;
    }
    else if(num < min){
      console.error('number is lower than min')
      return false;
    }
    else if(num > max){
      console.error('number is higher than max')
      return false;
    }
    else{
      return true;
    }

    /*
    if (Number.isInteger(num) && num >= min && num <= max) {
      return true;
    } else {
      return false;
    }
*/
  }
  
  /**
   * Format information about a product and possibly a number of it to display to a user.
   * @example
   * ```text
   * HTML húfa — 5.000 kr.
   * CSS sokkar — 2x3.000 kr. samtals 6.000 kr.
   * ```
   * @param {Product}  Product to display
   * @param {number | undefined} quantity Number of product, `undefined` if not used.
   * @returns A string containing information about a product and possibly its number.
   */
  function formatProduct(product, quantity = undefined) {
    /* Útfæra */
    if(quantity == undefined || quantity == 1){
      return product.title + " - " + formatPrice(product.price);
    }
    else{
      return product.title + " - " + quantity + "x" + formatPrice(product.price) + " samtals " + formatPrice(product.price * quantity);
    }
  }
  
  /**
   * Return a string containing cart information.
   * @example
   * ```text
   * HTML húfa — 5.000 kr.
   * CSS sokkar — 2x3.000 kr. samtals 6.000 kr.
   * Samtals: 11.000 kr.
   * ```
   * @param {Cart} cart Karfa til að fá upplýsingar um.
   * @returns Streng sem inniheldur upplýsingar um körfu.
   */
  function cartInfo(cart) {
    for (let i = 0; i < products.length; i++){
      console.info(products[i]);
  }
  }
  
  // --------------------------------------------------------
  // Föll fyrir forritið
  
  /**
   * Bætir vöru við `products` fylkið með því að biðja um upplýsingar frá notanda um:
   * - Titil, verður að vera ekki tómur strengur.
   * - Lýsingu, verður að vera ekki tómur strengur.
   * - Verð, verður að vera jákvæð heiltala stærri en 0.
   * Ef eitthvað er ekki löglegt eru birt villuskilaboð í console og hætt er í fallinu.
   * Annars er ný vara búin til og upplýsingar um hana birtar í console.
   * @returns undefined
   */
  function addProduct() {
    // For simplicity, we do not distinguish between "Cancel" and "Escape" and empty values from the user.
  
    // Go through each value we want and make sure we have a value.    
    // Values we get through 'prompt' are either 'null' if user presses "Cancel" or "Esc"
    // or string.
    // Ef við fáum ógilt gildi hættum við í fallinu með því að nota `return` sem skilar `undefined`.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
    // Þetta er kallað „early exit“ og er gott til að koma í veg fyrir að þurfa að skrifa auka
    // skilyrði í if-setningum en getur valdið vandræðum í einhverjum tilfellum.
    // https://en.wikipedia.org/wiki/Structured_programming#Early_exit
    const title = prompt('Titill:');
    if (!title) {
      console.error('Title cannot be empty.');
      return;
    }

    const description = prompt('Lýsing:');
    if (!description) {
      console.error('Nope, the description cannot be empty.');
      return;
    }
  
    // Gerum greinarmun á verði sem streng...
    const priceAsString = prompt('Verð:');
    if (!priceAsString) {
      console.error('Guess what? the price cannot be empty either.');
      return;
    }
  
    // and then a price that we can work with as a number.
    // Here we use 'Number.parseInt' to convert a string to an integer.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
    const price = Number.parseFloat(priceAsString);
  
    // Let's check if we get a legal integer greater than 0 using our helper function.
    if (!validateInteger(price, 1)) {
      console.error('Price must be a positive integer.');
      return;
    }
  
    // Let's create an ID for our product as simply the nearest integer based on the number of products we
    // already have.
    const id = products.length + 1;
  
    // Búum til vöruna okkar sem hlut með því að nota „object literal“.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
  
    // Let's use jsdoc to get error checking in vscode
  
    /** @type {Product} */
    const product = {
      id,
      title,
      description,
      price,
    };
  
    // Bætum vörunni aftast við fylkið okkar.
    products.push(product);
  
    // Birtum upplýsingar um vöru sem við bjuggum til.
    console.info(`Vöru bætt við:\n${formatProduct(product)}`);
  
    // Hér er ekkert return, þá skilar fallið `undefined`.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
  }
  
  /**
   * Birta lista af vörum í console.
   * @example
   * ```text
   * #1 HTML húfa — Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota. — 5.000 kr.
   * ```
   * @returns undefined
   */
  function showProducts() {
    /* make it up */
    /* The 'formatPrice' helper function should be used here */
    /* for (let i = 0; i < products.length; i++){
        console.info(products[i]);
    }*/
    let output = '';
    for (i = 0; i < products.length; i++){
      console.log('#' + products[i].id + '  '+ products[i].title + ' - ' + products[i].description + ' - ' + formatPrice(products[i].price));
    }
  }
  
  /**
    * Add product to cart.
    * Begins by asking for the ID of a product that a user wants to add to a cart.
    * If ID is not an integer, an error is displayed in the console with the message:
    * "Product ID is not legal, must be an integer greater than 0."
    * If a product is not found with the given ID, an error is displayed in the console with the message:
    * "Product not found."
    * Next, the user is asked for the number of products that the user wants to add to the cart. If number is not an integer
    * in the range `[1, 100>`, an error message is displayed in the console with the message:
    * "Number is not legal, minimum 1 and maximum 99."
    * If product and quantity are legal values, product is added to cart. If a product is already in the cart, there is a quantity
    * updated, otherwise a new line is added to cart.
   *
   * @returns undefined
   */
  function addProductToCart() {
    /* Útfæra */
    
    for (let i = 0; i < products.length; i++){
      console.info(products[i].title + " - id: " + products[i].id)
    }
    const prodID = prompt('Product ID')
    if(!prodID){
      console.error('no ID? no service');
      return;
    }
    const mount = prompt('Amount')
    if(!mount){
      console.error('illegal amount');
      return;
    }


    const emount = parseInt(mount);
    const pracID = parseFloat(prodID);
    /* Here `validateInteger` helper function should be used to validate data from user */
    if(!validateInteger(pracID, 1, products.length)){
      console.error('ID must be legal.')
      return;
    }

  

    const id = cart.lines.length + 1;
    const title = products[pracID - 1].title;
    const price = products[pracID - 1].price;
    const oldID = pracID;
    const amount = 0 + emount;
    /* To check if a product exists in the `cart` you need to use `cart.lines.find` */

    const yippee = cart.lines.find((l) => l.oldID === pracID);

    if(yippee){
      
      for(let i = 0; i < cart.lines.length; i++){
        if (cart.lines[i].oldID == pracID){
          cart.lines[i].amount += emount;
          break;
        }
      }
      console.log('successfully added extra');
    }
    else{
      const product = {
        id,
        title,
        price,
        oldID,
        amount,
      };
      cart.lines.push(product);

      console.log('following item has been added to the cart: ' + formatProduct(product,product.amount))
    }
  }
  
  /**
   * Display cart information in console. If there is nothing in the cart, "The cart is empty." is displayed, otherwise
   * we publish information about products in the basket and the total price.
   *
   * @example
   * ```text
   * HTML húfa — 5.000 kr.
   * CSS sokkar — 2x3.000 kr. samtals 6.000 kr.
   * Samtals: 11.000 kr.
   * ```
   * @returns undefined
   */
  function showCart() {
    /* Útfæra */
    for (let i = 0; i < cart.lines.length; i++){
      console.info(formatProduct(cart.lines[i], cart.lines[i].amount));
  }
  }
  
  /**
   * Completes a purchase and displays a receipt in the console.
   * If there is nothing in the basket, messages are displayed in the console:
   * "The basket is empty."
   * Otherwise, the user is asked for name and address, if either is empty an error message is displayed
   * console and quit in case.
   * If everything is OK, a receipt is displayed in the console with information about the order and the total price.
   * @example
   * ```text
   * Pöntun móttekin <nafn>.
   * Vörur verða sendar á <heimilisfang>.
   *
   * HTML húfa — 5.000 kr.
   * CSS sokkar — 2x3.000 kr. samtals 6.000 kr.
   * Samtals: 11.000 kr.
   * ```
   * @returns undefined
   */
  function checkout() {
    /* Útfæra */
    if(cart.lines.length === 0){
      console.error('The cart is empty')
      return;
    }

    const name = prompt('Your name')
    if(!name){
      console.error('You gotta tell us your name.');
      return;
    }

    cart.name = name;
    const address = prompt('Delivery adress')
    if(!address){
      console.error('where do you expect to send us this package without an adress?? try again.');
      return;
    }
    cart.address = address;

    console.log(`purchase successful ${name}`);
    console.log(`the items have been sent to ${address}\n`);
    console.log(``);
    for(let i = 0; i < cart.lines.length; i++){
      console.log(formatProduct(cart.lines[i], cart.lines[i].amount));
    }
    total = 0;
    for(let i = 0; i < cart.lines.length; i++){
      total += cart.lines[i].price * cart.lines[i].amount;
    }

    console.log(`Total: ${formatPrice(total)}`)
    return;
  }