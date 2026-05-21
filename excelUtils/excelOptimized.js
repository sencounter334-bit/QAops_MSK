const ExcelJs = require('exceljs');

writeExcel("Mango", 300,{rowChange:0,columnChange:2},"G:\\Learn2026\\Playwright_JS\\Excel utils\\ExclUtils002.xlsx");

async function writeExcel(searchText,replaceText,change,filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    const cell = worksheet.getCell(output.row, output.column+change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {
    let output = { row: -1, column:-1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                console.log(rowNumber);
                console.log(colNumber);
                output.row = rowNumber;
                output.column = colNumber;
            }
        })
    })
    return output;
}
