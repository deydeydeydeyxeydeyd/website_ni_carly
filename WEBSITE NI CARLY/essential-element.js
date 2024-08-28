class ElementDescription {
    constructor (shortDescription, longDescription) {
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
    }
}

class PeriodicElement {
    constructor(name, symbol, atomicNumber, description) {
        this.name = name,
        this.symbol = symbol
        this.atomicNumber = atomicNumber,
        this.description = description
    }    
}

function addGlobalEventListener(eventType, selector, callback, useClosest = false, parent = document) {
    parent.addEventListener(eventType, e => {
        const targetElement = useClosest ? e.target.closest(selector) : e.target;
        if (!targetElement || !(useClosest || targetElement.matches(selector)))
            return;

        if (useClosest && targetElement !== e.target) {
            callback({ ...e, target: targetElement });
        } else {
            callback(e);
        }
    });
}

function updateDescriptionArea(element) {
    const elementDetails = descriptionArea.querySelector("#element-details");
    const elementDescription = descriptionArea.querySelector("#element-description");
    const longDescription = longerDesciptionContainer.querySelector("#long-description");

    elementDetails.textContent = `${element.name} (${element.symbol}) Atomic #: ${element.atomicNumber}`;
    elementDescription.textContent = element.description.shortDescription;
    longDescription.textContent = element.description.longDescription;
}

function updateImages(element) {
    const elementImagesPath = 'images/essential-elements'
    const placeholderPath = "images/placeholder.jpg"
    const imageReferences = Object.freeze([referenceImgContainer.querySelector('img'), referenceImgContainer.querySelector('img + img')]);
    
    const elementPath = elementImagesPath;
    const elementName = element.name.toLowerCase();

    imageReferences[1].style.display = 'inline';

    imageReferences[0].addEventListener('error', () => {
        console.log("No Element Image");
        imageReferences[0].setAttribute('src', placeholderPath);        
    });
    imageReferences[0].setAttribute('src', elementPath + `/${elementName}.jpg`);
    
    imageReferences[1].addEventListener('error', () => {
        console.log("No Reference Image");
        imageReferences[1].setAttribute('src', placeholderPath);        
        imageReferences[1].style.display = 'none';
    });
    imageReferences[1].setAttribute('src', elementPath + `/images_for_${elementName}.jpg`);
}

const descriptionArea = document.getElementById('description-area');
const collapseButton = document.getElementById('toggle-collapse');
const elementBoxes = document.querySelectorAll('.element');
const longerDesciptionContainer = document.querySelector('#longer-description');
const referenceImgContainer = document.querySelector('#reference-images');

collapseButton.addEventListener("click", () => {
    descriptionArea.classList.toggle('reveal-all');
    longerDesciptionContainer.classList.toggle('hidden');
    collapseButton.textContent = descriptionArea.classList.contains('reveal-all') ? '^' : 'v';

    descriptionArea.addEventListener('transitionend', () => {
        collapseButton.scrollIntoView( {behavior : 'smooth'} );
        collapseButton.focus();
    });
});

addGlobalEventListener('click', ".element", e => {  
    const elementBox = e.target;
    elementBoxes.forEach(elem => elem.classList.remove('active'));
    elementBox.classList.toggle("active");
    collapseButton.classList.remove('hidden');

    const elementData = getElementsLookup()[`${elementBox.dataset.symbol}`];
    updateDescriptionArea(elementData);
    updateImages(elementData);
}, true);

function getElementsLookup() {
    return {
        "H" : new PeriodicElement(
            "Hydrogen", "H", 1, new ElementDescription(
                shortDescription="A chemical element; it has symbol H and atomic number 1",
                longDescription=`It is the lightest element and, at standard conditions, is a gas of diatomic molecules with the formula H2, 
                sometimes called dihydrogen,[11] but more commonly called hydrogen gas, molecular hydrogen or simply hydrogen.<br/>
                Colorless, odorless, tasteless, flammable gaseous substance that is the simplest member of the family of chemical elements. 
                Classified as a nonmetal, Hydrogen is a gas at room temperature The earliest known important chemical property of hydrogen 
                is that it burns with oxygen to form water, H2O; indeed, the name hydrogen is derived from Greek words meaning “maker of water.” 
                Hydrogen is used in industrial processes, as a rocket fuel, and in fuel cells for electricity generation and powering vehicles. 
                Operators of several natural gas-fired power plants are exploring hydrogen as a supplement or replacement for natural gas. 
                Hydrogen has the potential to indirectly store energy for electric power generation.`
            )
        ),

        "C" : new PeriodicElement("Carbon", "C", 6, new ElementDescription(
                shortDescription="The origin of the name Carbon is a Latin word ‘carbo’ which means charcoal.  The atomic number of carbon is 6, which represents the number of electrons. ",
                longlongDescription=`. It is represented by the symbol C and is a non-metal. It has 6 protons, 6 neutrons and obviously 6 electrons. A carbon atom is considered to be special and unique because it can bond with other carbon atoms to an almost unlimited degree. This may come as a surprise to you, but it is the fourth most abundant element in the entire universe. And it is the second most abundant element in our bodies, the first being oxygen. Carbon helps to regulate the Earth's temperature, makes all life possible, is a key ingredient in the food that sustains us, and provides a major source of the energy to fuel our global economy.`
            )
        ),

        "N" : new PeriodicElement(
            "Nitrogen", "N", 7, new ElementDescription(
                shortDescription="Nonmetallic element of Group 15 [Va] of the periodic table.",
                longDescription=`It is a colorless, odorless, tasteless gas that is the most plentiful element in Earth’s atmosphere and is a constituent of all living matter. The nitrogen cycle matters because nitrogen is an essential nutrient for sustaining life on Earth. Nitrogen is a core component of amino acids, which are the building blocks of proteins, and of nucleic acids, which are the building blocks of genetic material (RNA and DNA).`
            )
        ),

        "O" : new PeriodicElement(
            "Oxygen", "O", 8, new ElementDescription(
                shortDescription="a chemical element with an atomic number of 8",
                longDescription=`Oxygen forms a molecule (O2) of two atoms which is a colorless gas at normal temperatures and pressures. About 21% of Earth's atmosphere is oxygen. 
                This hasn't always been the case, though. Early in our planet's history, the atmosphere had almost no oxygen. 
                Oxygen helps organisms grow, reproduce, and turn food into energy. Humans get the oxygen they need by breathing through their nose and mouth into their lungs. 
                Oxygen gives our cells the ability to break down food in order to get the energy we need to survive.`
            )
        ),

        "Mg" : new PeriodicElement(
            "Magnesium", "Mg", 12, new ElementDescription(
                shortDescription="a chemical element with symbol Mg and atomic number 12",
                longDescription=`Classified as an alkaline earth metal, Magnesium is a solid at room temperature. Magnesium is the eighth most abundant element in Earth’s crust (about 2.5 percent) and is, after aluminum and iron, the third most plentiful structural metal. It is a shiny gray metal having a low density, low melting point and high chemical reactivity. Magnesium is important for many processes in the body, including regulating muscle and nerve function, blood sugar levels, and blood pressure and making protein, bone, and DNA. Used for constipation, as an antacid for heartburn, for low magnesium levels, for pregnancy complications called pre-eclampsia and eclampsia, and for a certain type of irregular heartbeat.`
            )
        ),

        "P" : new PeriodicElement(
            "Phosphorus", "P", 15, new ElementDescription(
                shortDescription="a chemical element with symbol P and atomic number 15",
                longDescription=`. Classified as a nonmetal, Phosphorus is a solid at room temperature. It is a mineral that makes up 1% of a person's total body weight. It is the second most abundant mineral in the body. It is present in every cell of the body. Most of the phosphorus in the body is found in the bones and teeth. Phosphorus helps filter out waste in the kidneys and plays an essential role in how the body stores and uses energy.`   
            )
        ),

        "S" : new PeriodicElement(
            "Sulfur", "S", 16, new ElementDescription(
                shortDescription="Sulfur (also spelled sulphur in British English) is a chemical element; it has symbol S and atomic number 16.",longDescription=`. It is nonmetallic chemical element belonging to the oxygen group (Group 16 [VIa] of the periodic table), one of the most reactive of the elements. Pure sulfur is a tasteless, odourless, brittle solid that is pale yellow in color, a poor conductor of electricity, and insoluble in water. It also forms compounds with several nonmetallic elements. Millions of tons of sulfur are produced each year, mostly for the manufacture of sulfuric acid, which is widely used in industry.  It is used for making car batteries, fertilizer, oil refining, water processing, and mineral extraction. Other applications for sulfur-based chemicals include rubber vulcanization, bleaching paper, and product making such as cement, detergents, and pesticides.`
            )
        ),

        "Cl" : new PeriodicElement(
            "Chlorine", "Cl", 17, new ElementDescription(
                shortDescription="a chemical element with symbol Cl and atomic number 17",
                longDescription=`The second lightest member of the halogen elements, or Group 17 (Group VII) of the periodic table. Chlorine is a toxic, corrosive, greenish yellow gas that is irritating to the eyes and to the respiratory system. Chlorine kills bacteria – it is a disinfectant. It is used to treat drinking water and swimming pool water. It is also used to make hundreds of consumer products from paper to paints, and from textiles to insecticides. Another major use for chlorine is in organic chemistry. It is used as an oxidizing agent and in substitution reactions. 85% of pharmaceuticals use chlorine or its compounds at some stage in their manufacture. During the production of paper and cloth, chlorine is used as a bleaching agent. It is also used in cleaning products, including household bleach which is chlorine dissolved in water.`
            )
        ),

        "K" : new PeriodicElement(
            "Potassium", "K", 19, new ElementDescription(
                shortDescription="a chemical element with symbol K and atomic number 19",
                longDescription=`
                    . Classified as an alkali metal, Potassium is a solid at room temperature. A silver-white soft light low-melting monovalent metallic element of the alkali metal group that occurs abundantly in nature especially combined in minerals. Potassium plays a role in the transmission of nerve signals, muscle contractions, fluid balance, and various chemical reactions. Potassium is most commonly used for treating and preventing low potassium levels, treating high blood pressure, and preventing stroke. It helps your nerves to function and muscles to contract. It helps your heartbeat stay regular. 
                `
            )
        ),

        "Ca" : new PeriodicElement(
            "Calcium", "Ca", 20, new ElementDescription(
                shortDescription="a chemical element, it has symbol Ca and atomic number 20",
                longDescription=`Calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air. 
                Its physical and chemical properties are most similar to its heavier homologues strontium and barium. 
                Calcium is the most abundant mineral in the body. Almost all calcium in the body is stored in bones and teeth, 
                giving them structure and hardness. Your body needs calcium for muscles to move and for nerves to carry messages 
                between your brain and every part of your body. Calcium also helps blood vessels move blood throughout your body 
                and helps release hormones that affect many functions in your body.`
            )
        ),

        "Co" : new PeriodicElement(
            "Cobalt", "Co", 27, new ElementDescription(
                shortDescription="a chemical element with symbol Co and atomic number 27",
                longDescription=`Classified as a transition metal, Cobalt is a solid at room temperature. A magnetic metallic element that is used especially in alloys, in batteries, and as a pigment in paint and glass. The metal was isolated (c. 1735) by Swedish chemist Georg Brandt, though cobalt compounds had been used for centuries to impart a blue color to glazes and ceramics. Cobalt is used in many alloys & super alloys to make parts in aircraft engines, gas turbines, high-speed steels, corrosion-resistant alloys, and cemented carbides. It is used in magnets and magnetic recording media. It is also used as a catalyst for the petroleum and chemical industries`
            )
        ),

        "Zn" : new PeriodicElement(
            "Zinc", "Zn", 30, new ElementDescription(
                shortDescription="a chemical element with the symbol Zn and atomic number 30",
                longDescription=`Classified as a transition metal, Zinc is a solid at room temperature. It is a slightly brittle metal at room temperature and has a shiny-greyish appearance when oxidation is removed. It is the first element in group 12 (IIB) of the periodictable. Zinc, a nutrient found throughout your body, helps your immune system and metabolism function. Zinc is also important to wound healing and your sense of taste and smell. With a varied diet, your body usually gets enough zinc. Food sources of zinc include chicken, red meat and fortified breakfast cereals.`
            )
        )
    }
}