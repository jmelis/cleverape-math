import { choose, qAdd, qSubtract } from './math-question';

const mathLevels = [
    {
        id: "add-subtract-one-to-ten",
        title: "1 to 10",
        ops: ['+', '-'],
        func: () => choose([qAdd, qSubtract])(),
    }
];

export default mathLevels;