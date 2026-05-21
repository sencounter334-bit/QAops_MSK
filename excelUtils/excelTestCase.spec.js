const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');

async function writeExcel(searchText,replaceText,change,filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);
    const reqdColumn = output.column+change.columnChange;
    let output2 = {row: output.row, column: reqdColumn}
    const cell = worksheet.getCell(output.row, reqdColumn);
    cell.value = replaceText;
    
    await workbook.xlsx.writeFile(filePath);
    return output2
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

//writeExcel("Mango", 300,{rowChange:0,columnChange:2},"G:\\Learn2026\\Playwright_JS\\Excel utils\\ExclUtils002.xlsx");
test('Excel download and upload with change',async({page})=>
{
const searchText = 'Mango'
const updatedValue = 300;
await page.goto('https://rahulshettyacademy.com/upload-download-test/');
const downloadPromise = page.waitForEvent('download');
await page.getByRole('button',{name:'Download'}).click();
const dl = await downloadPromise;//waits untill the promise is resolved
const filepath = await dl.path();
//'C:\\Users\\Senthil kumar\\Downloads\\download.xlsx'
const output2 = await writeExcel(searchText, updatedValue,{rowChange:0,columnChange:2},filepath);

await page.locator('#fileinput').click();
await page.locator('#fileinput').setInputFiles(filepath);
//const table = page.locator('.table-wrapper');
// const row = table.locator(`#row-${output.row}`);
// constcell = row.locator(`div[data-column-id=${output.column+change.columnChange}]`);
// expect(cell).toHaveText(replaceText);
//const reqdTextLocator = page.getByText(searchText)
const webRow = (output2.row)-2;//since 1 header + web index starts from 0
const reqdRow = page.locator(`#row-${webRow}`);
const textfinal = reqdRow.locator(`[data-column-id=${output2.column}]`);
console.log(textfinal);
await expect(textfinal).toHaveText(updatedValue);


});