module qs {
    export class Stack<T> {
        public dataStore = [];
        public top = 0;
        public pop(): T {
            return this.dataStore[--this.top];
        }
        public push(elem): void {
            this.dataStore[this.top++] = elem;
        }
        public peek(): T {
            return this.dataStore[this.top - 1];
        }
        public clear(): void {
            this.top = 0;
        }
        public get length(): number {
            return this.top;
        }
    }
}