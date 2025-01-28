import { s3 } from "bun";

const SUPLAY_URL = "https://img.suplaymart.com/img";

async function main() {
    const [, , inputFilePath] = process.argv;

    if (process.argv.length < 3) {
        throw new Error("Must provide args: `<input file>`");
    }

    const inputFile = Bun.file(inputFilePath);

    const set = await inputFile.json();

    const failedIds: string[] = [];

    const taskQueue = new TaskQueue(async (cardId: string, i) => {
        const response = await fetch(`${SUPLAY_URL}/${cardId}.png`);

        if (response.status !== 200) {
            console.log(`Failed to fetch card id '${cardId}'`);
            failedIds.push(cardId);
            return;
        }

        await s3.write(`${cardId}.png`, response);

        console.log(
            `Uploaded ${cardId}.png to s3. (${i} / ${set.cards.length})`
        );
    }, 8);

    await taskQueue.run(set.cards.map((card, i) => [card.id, i + 1]));

    await Bun.write("./failures.json", JSON.stringify(failedIds, null, 4));
}

class TaskQueue<T> {
    constructor(
        public taskFn: (...args: T[]) => void,
        public parallel = 4
    ) {}

    async run(argsArr: T[][]) {
        for (let i = 0; i < argsArr.length; i += this.parallel) {
            const chunk = argsArr.slice(i, i + this.parallel);
            const chunkPromises = chunk.map((args) => this.taskFn(...args));

            await Promise.all(chunkPromises);
        }
    }
}

await main();
