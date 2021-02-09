import { Command, CommandNewTodo, CommandPrintTodos } from "./Command";
import { waitForInput } from "./Input";
import Todo from "./Todo";
import { Action, AppState, Priority } from "./type";

const commands: Command[] = [new CommandPrintTodos(), new CommandNewTodo()];

async function main() {
  let state: AppState = {
      todos: [
          new Todo('test1', Priority.High),
          new Todo('test1', Priority.Medium),
          new Todo('test1', Priority.Low)
      ]
  }
  while(true) {
      console.clear(); //처음에 화면 클리어 
      for(const command of commands) {
        console.log(command.toString());
      }
      console.log();
      const key = await waitForInput('input command: '); //입력받은 key를 활용해서 커맨드 실행 => command 클래스 작성
      console.clear();
      const command = commands.find(item => item.key ===  key);
      console.log(command);
      if(command) {
        const action = await command.run(state);
        if(action) {
          state = getNextState(state, action);
        }
      }
  }
}

main();

//이 함수의 역할은 현재상태와 Action을 입력으로 받아서 다음 상태를 반환을해주는 역할을 한다. 
function getNextState(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'newTodo':
      return {
        ...state,
        todos : [...state.todos, new Todo(action.title, action.priority)],    
      }
  }
}