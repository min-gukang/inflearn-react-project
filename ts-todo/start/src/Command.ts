import { waitForInput } from "./Input";
import { AppState } from "./type";

export abstract class Command { //추상클래스는 다른 클래스를 생성하는 용도
    constructor (
        public key: string,
        private desc: string
        ) {}
    toString() {
        return `${this.key}: ${this.desc}`;
    }
    //key를 눌렀을 때 실행할 함수 정의 
    //지금 여기서 구현 안할것이기 때문에 추상메소드로 정의 
    //async이기 때문에 Promise를 반환, 어떤 것도 리턴하지 않는 것으로 일단 void정의 
    abstract async run(state: AppState): Promise<void> 
}

export class CommandPrintTodos extends Command {
    constructor() {
        super('p', '모든 할 일 출력하기'); //부모의 constructor 호출 
    }
    async run(state: AppState): Promise<void> {
      for(const todo of state.todos) { //모든 todo 출력
        const text = todo.toString(); //toString메소드 정의해야함
        console.log(text);
      }
      await waitForInput('press any key: '); //아무 키나 입력받도록 밑에서 기다려 줌
    }
}