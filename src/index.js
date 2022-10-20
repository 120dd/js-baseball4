const RANDOM_NUM_MIN = 1;
const RANDOM_NUM_MAX = 9;

export default class BaseballGame {
    constructor() {
        this.makeComputerInputNumbers();
    }
    
    makeComputerInputNumbers(){
        const inputNumberSet = new Set();
        while (inputNumberSet.size < 3){
        const randomNumber = MissionUtils.Random.pickNumberInRange(RANDOM_NUM_MIN, RANDOM_NUM_MAX);
            inputNumberSet.add(randomNumber)
        }
        const computerInputNumbers = Number([...inputNumberSet].join(""));
        console.log(computerInputNumbers);
        return computerInputNumbers;
    }
    
    play(computerInputNumbers, userInputNumbers) {
        return "결과 값 String";
    }
}

new BaseballGame();