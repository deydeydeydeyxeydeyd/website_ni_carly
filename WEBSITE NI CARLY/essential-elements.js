
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
    const elementImagesPath = 'images/elements'
    const placeholderPath = elementImagesPath + "/placeholder.jpg"
    const imageReferences = Object.freeze([referenceImgContainer.querySelector('img'), referenceImgContainer.querySelector('img + img')]);
    let showReferenceImage = true;
    
    const elementPath = elementImagesPath + `/${element.symbol.toLowerCase()}`

    imageReferences[0].onerror = () => {
        console.log("No Element Image");
        imageReferences[0].setAttribute('src', placeholderPath);        
    };
    imageReferences[0].setAttribute('src', elementPath + `/${element.name.toLowerCase()}.jpg`);
    
    imageReferences[1].onerror = () => {
        console.log("No Reference Image");
        imageReferences[1].style.display = 'none';
        imageReferences[1].setAttribute('src', placeholderPath);
    };
    imageReferences[1].setAttribute('src', elementPath + "/reference.jpg");
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
                sometimes called dihydrogen,[11] but more commonly called hydrogen gas, molecular hydrogen or simply hydrogen. 
                Colorless, odorless, tasteless, flammable gaseous substance that is the simplest member of the family of chemical elements. 
                Classified as a nonmetal, Hydrogen is a gas at room temperature The earliest known important chemical property of hydrogen 
                is that it burns with oxygen to form water, H2O; indeed, the name hydrogen is derived from Greek words meaning “maker of water.” 
                Hydrogen is used in industrial processes, as a rocket fuel, and in fuel cells for electricity generation and powering vehicles. 
                Operators of several natural gas-fired power plants are exploring hydrogen as a supplement or replacement for natural gas. 
                Hydrogen has the potential to indirectly store energy for electric power generation.`
            )
        ),

        "He" : new PeriodicElement(
            "Helium", "He", 2, new ElementDescription(
                shortDescription="N/A",
                longlongDescription=`N/A`
            )
        ),

        "Li" : new PeriodicElement(
            "Lithium", "Li", 3, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        ),

        "Be" : new PeriodicElement(
            "Berylium", "Be", 4, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        ),

        "F" : new PeriodicElement(
            "Flourine", "F", 9, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        ),

        "Ne" : new PeriodicElement(
            "Neon", "Ne", 10, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`   
            )
        ),

        "Na" : new PeriodicElement(
            "Soduim", "Na", 11, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        ),

        "Mg" : new PeriodicElement(
            "Magnesium", "Mg", 12, new ElementDescription(
                shortDescription="Magnesium is a chemical element with symbol Mg and atomic number 12.",
                longDescription=`Classified as an alkaline earth metal, Magnesium is a solid at room temperature. 
                Magnesium is the eighth most abundant element in Earth’s crust (about 2.5 percent) and is, after aluminum and iron, 
                the third most plentiful structural metal. It is a shiny gray metal having a low density, low melting point and high 
                chemical reactivity. Magnesium is important for many processes in the body, including regulating muscle and nerve 
                function, blood sugar levels, and blood pressure and making protein, bone, and DNA. 
                Used for constipation, as an antacid for heartburn, for low magnesium levels, for pregnancy complications called 
                pre-eclampsia and eclampsia, and for a certain type of irregular heartbeat.`
            )
        ),

        "Cl" : new PeriodicElement(
            "Chlorine", "Cl", 17, new ElementDescription(
                shortDescription="A chemical element with symbol Cl and atomic number 17.",
                longDescription=`
                    The second lightest member of the halogen elements, or Group 17 (Group VII) of the periodic table. 
                    Chlorine is a toxic, corrosive, greenish yellow gas that is irritating to the eyes and to the respiratory system. 
                    Chlorine kills bacteria – it is a disinfectant. It is used to treat drinking water and swimming pool water. 
                    It is also used to make hundreds of consumer products from paper to paints, and from textiles to insecticides. 
                    Another major use for chlorine is in organic chemistry. It is used as an oxidizing agent and in substitution 
                    reactions. 85% of pharmaceuticals use chlorine or its compounds at some stage in their manufacture. 
                    During the production of paper and cloth, chlorine is used as a bleaching agent. It is also used in cleaning 
                    products, including household bleach which is chlorine dissolved in water.
                `
            )
        ),

        "Ar" : new PeriodicElement(
            "Argon", "Ar", 18, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        ),

        "Ca" : new PeriodicElement(
            "Calcium", "Ca", 20, new ElementDescription(
                shortDescription="A chemical element, it has symbol Ca and atomic number 20",
                longDescription=`Calcium is a reactive metal that forms a dark oxide-nitride layer when exposed to air. 
                Its physical and chemical properties are most similar to its heavier homologues strontium and barium. 
                Calcium is the most abundant mineral in the body. Almost all calcium in the body is stored in bones and teeth, 
                giving them structure and hardness. Your body needs calcium for muscles to move and for nerves to carry messages 
                between your brain and every part of your body. Calcium also helps blood vessels move blood throughout your body 
                and helps release hormones that affect many functions in your body.`
            )
        ),

        "Br" : new PeriodicElement(
            "Bromine", "Br", 35, new ElementDescription(
                shortDescription="N/A",
                longDescription=`N/A`
            )
        )
    }
}