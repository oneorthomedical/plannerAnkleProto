import Preplanification from "../assets/js/class/Preplanification";

let dataPreplanification =  {
    number : `20`,
    side : 'Gauche' ,
    isTexture : true,
    state : '0',
    path : '../stl/',
    pathRadio : '../radio'
};
describe('Warrior Unit Test', () => {
    let preplanification;
    beforeEach(() => {
        preplanification = new Preplanification(dataPreplanification);
    });

    it('should return warrior weapon', () => {
        expect(preplanification.number).toBe('PPI2B0020');
    });
});
