import { waitForInput } from "./Input";
import { ActionNewTodo, AppState, Priority, PRIORITY_NAME_MAP } from "./type";
import { getIsValidEnumValue } from "./util";

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
    abstract async run(state: AppState): Promise<void | ActionNewTodo> 
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

export class CommandNewTodo extends Command {
    constructor() {
        super('n', '할 일 추가하기'); //부모의 constructor 호출 
    }
    async run(): Promise<void | ActionNewTodo> {
        // 0(높음) ~ 2(낮음) => enum을 한글로 맵핑하기 위해서 map을 하나관리한다. => type.ts
      const title = await waitForInput('title :');
      const priorityStr = await waitForInput(
          `priority ${PRIORITY_NAME_MAP[Priority.High]}(${Priority.High}) ~ ${PRIORITY_NAME_MAP[Priority.Low]}(${Priority.Low}): `
          );
      const priority = Number(priorityStr);
      if(title && CommandNewTodo.getIsPriority(priority)) {
        //위 mapping작업까지 하고 이제 toDo 추가 => 이는 앱의 상태 변경 유도, 근데 이는 index.ts에서 통합해서 관리하는게 좋을 듯
        //그래서 여기에서는 앱의 상태를 어떻게 바꿔야 하는지만 설명을 해주고 index.ts쪽에서 그 설명을 보고 직접 수정하면 좋음  
        return {
            type: 'newTodo',
            title,
            priority
        }
      }
    }
    static getIsPriority(priority: number): priority is Priority { //입력한 priority가 Priority enum에 속해 있는지 확인!
        return getIsValidEnumValue(Priority, priority);
    }
}