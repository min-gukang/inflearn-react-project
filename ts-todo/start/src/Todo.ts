import { Priority } from "./type";

export default class Todo {
    static nextId: number = 1;
    constructor (
        private title: string, 
        private priority: Priority, 
        public id: number = Todo.nextId //나중에 밖에서 접근할 수 있도록 해주기 위해 public으로 함. 
    ) {
      Todo.nextId++;
    }
    toString() {
        return `${this.id}) 제목: ${this.title} (우선순위: ${this.priority})`
    }
}
