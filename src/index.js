import { SELECTORS } from "./constants.js";

const RANDOM_NUM_MIN = 1;
const RANDOM_NUM_MAX = 9;

const DOM = (selector) => document.querySelector(`#${selector}`);

export default class BaseballGame {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
        this.computerInputNumber = this.makeComputerInputNumbers();
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
        const matchScore = this.getMatchScore(computerInputNumbers, userInputNumbers);
        const strikeScore = this.getStrikeScore(computerInputNumbers, userInputNumbers);
        const ballScore = matchScore-strikeScore;
        if (matchScore === 0){
            return "낫싱"
        }
        if (ballScore === 0){
            return `${strikeScore} 스트라이크`
        }
        if (strikeScore === 0){
            return `${ballScore} 볼`
        }
        return `${ballScore} 볼 ${strikeScore} 스트라이크`;
    }
    
    getMatchScore(computerInputNumbers, userInputNumbers){
        const computerNumArr = [...computerInputNumbers.toString()];
        const userNumArr = [...userInputNumbers.toString()];
        return computerNumArr.reduce((acc,cur)=>{
            if (userNumArr.includes(cur)){
                return acc += 1;
            }
            return acc;
        },0)
    }
    
    getStrikeScore(computerInputNumbers, userInputNumbers){
        const computerNumArr = [...computerInputNumbers.toString()];
        const userNumArr = [...userInputNumbers.toString()];
        return computerNumArr.reduce((acc,cur,idx)=>{
            if (userNumArr[idx]===cur){
                return acc += 1;
            }
            return acc;
        },0)
    }
    
    submit(){
        const result = this.play(this.computerInputNumber,Number(DOM(SELECTORS.INPUT).value));
        console.log(result);
    }
    
    onClick(event){
        event.preventDefault();
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}

new BaseballGame(app);