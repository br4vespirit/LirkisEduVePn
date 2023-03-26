
/**
 * @class
 */
export default class Place {
    /**
     * Constructs instance of PetriNet
     * @param {string} placeName - Name of transition.
     */
    constructor(placeName) {
      this.placeName = placeName;
    }


    always() {
        const taskPanel = document.querySelector(`#task${this.placeName}`);
        if(taskPanel){
            taskPanel.setAttribute('visible', !taskPanel.getAttribute('visible'));
            taskPanel.children.item(2).classList.toggle('interactible');
        }
    }
}
