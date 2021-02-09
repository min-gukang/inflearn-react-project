import { Command, CommandPrintTodos } from "./Command";
import { waitForInput } from "./Input";
import Todo from "./Todo";
import { AppState, Priority } from "./type";

const commands: Command[] = [new CommandPrintTodos()];

async function main() {
  const state: AppState = {
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
          await command.run(state);
      }
  }
}

main();