import { s3 } from "bun";

const SUPLAY_URL = "https://img.suplaymart.com/img";

async function main() {
    const [, , inputFilePath, ...setIds] = process.argv;

    if (process.argv.length < 4) {
        throw new Error("Must provide args: `<input file> <...set ids>`");
    }

    const inputFile = Bun.file(inputFilePath);

    const checklist = await inputFile.json();

    const failedIds: string[] = [];

    for (const setId of setIds) {
        const set = checklist[setId];

        if (!set) {
            console.log(
                `'${setId}' is not present in the checklist. Skipping...`
            );
            continue;
        }

        for (const card of set.cards) {
            const response = await fetch(`${SUPLAY_URL}/${card.id}.png`);

            if (response.status !== 200) {
                console.log(`Failed to fetch card id '${card.id}'`);
                failedIds.push(card.id);
                continue;
            }

            await s3.write(`${card.id}.png`, response);
            console.log(`Uploaded '${card.id}' to s3.`);
        }
    }

    await Bun.write("./failures.json", JSON.stringify(failedIds, null, 4));
}

await main();
