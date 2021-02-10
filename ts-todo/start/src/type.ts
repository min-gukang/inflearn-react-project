import Todo from "./Todo";

export enum Priority {
    High,
    Medium,
    Low
}

export interface AppState {
    todos: Todo[];    
}

export const PRIORITY_NAME_MAP: {[key in Priority]: string} = { //mapped 타입을 작성해서 enum Prioirity에 값이 추가됬을 때 이 객체에도 넣으라고 에러뜨게 함.  
    [Priority.High]: '높음',
    [Priority.Medium]: '중간',
    [Priority.Low]: '낮음',
}

export interface ActionNewTodo {
    type: 'newTodo'; //식별가능한 유니온 타입을 해주기 위해 
    title: string;
    priority: Priority;
}

export interface ActionDeleteTodo {
    type: 'deleteTodo'; //식별가능한 유니온 타입을 해주기 위해 
    id: number;
}

export type Action = ActionNewTodo | ActionDeleteTodo;  