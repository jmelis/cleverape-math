import { choose, qAdd, qSubtract } from './math-question';

const mathLevels = [
    {
        id: "add-one-to-five",
        ops: ['+'],
        title: "1 to 5",
        func: () => qAdd({aMax: 5, bMax: 5}),
    },
    {
        id: "subtract-positive-one-to-five",
        ops: ['-'],
        title: "1 to 5",
        func: () => qSubtract({aMax: 5, bMax: 5, positiveResult: true}),
    },
    {
        id: "add-subtract-positive-one-to-ten",
        ops: ['+', '-'],
        title: "1 to 10",
        func: () => choose([
            qAdd(),
            qSubtract({positiveResult: true}),
        ]),
    },
    {
        id: "add-subtract-positive-one-to-twenty-one-small-number",
        ops: ['+', '-'],
        title: "1 to 20 and a small number",
        func: () => choose([
            qAdd({aMax: 20, bMax: 10}),
            qSubtract({aMax: 20, bMax: 20, positiveResult: true}),
        ]),
    },
    {
        id: "add-subtract-positive-one-large-number-one-small-number",
        ops: ['+', '-'],
        title: "1 to 100 and a small number",
        func: () => choose([
            qAdd({aMax: 100, bMax: 10}),
            qSubtract({aMax: 100, bMax: 10, positiveResult: true}),
        ]),
    },
];

export default mathLevels;