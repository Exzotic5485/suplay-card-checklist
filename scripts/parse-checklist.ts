import xlsx from "xlsx";

type CardData = {
    id: string;
    name: string;
    variety: string;
    serial: string;
    franchise: string;
};

type ColumnMap = CardData;

function checklistToJSON(
    file: ArrayBuffer,
    rowStart: string,
    columns: ColumnMap
) {
    const workbook = xlsx.read(file);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const cards: CardData[] = [];

    let hasNext = true;
    let row = Number(rowStart);

    while (hasNext) {
        const card: CardData = {
            id: sheet[columns.id + row].w,
            name: sheet[columns.name + row].w,
            franchise: sheet[columns.franchise + row].w,
            serial: sheet[columns.serial + row].w,
            variety: sheet[columns.variety + row].w,
        };

        cards.push(card);

        if(!sheet[columns.id + ++row]) {
            hasNext = false;
        }
    }

    return cards;
}

async function main() {
    const [
        ,
        ,
        inputFilePath,
        rowStart,
        cardNumber,
        cardName,
        cardVariety,
        cardFranchise,
        cardSerial,
    ] = process.argv;

    if (process.argv.length < 9)
        throw new Error(
            "Must provide args: `<input file> <row start> <number column> <name column> <variety column> <franchise column> <serial column>`"
        );

    const file = Bun.file(inputFilePath);

    const checklistJSON = checklistToJSON(await file.arrayBuffer(), rowStart, {
        id: cardNumber,
        name: cardName,
        serial: cardSerial,
        variety: cardVariety,
        franchise: cardFranchise,
    });

    await Bun.write("cards.json", JSON.stringify(checklistJSON, null, 4));
}

await main();
