const ExcelJs = require('exceljs');
const workbook = new ExcelJs.Workbook();
let r,c;

async function excelTest()
{
await workbook.xlsx.readFile("G:\\Learn2026\\Playwright_JS\\Excel utils\\ExclUtils002.xlsx");
const worksheet = workbook.getWorksheet('Sheet1');
worksheet.eachRow((row,rowNumber) =>
{
row.eachCell((cell,colNumber) =>
{
console.log(cell.value);
})
})
}
//Verify if apple is present in the Excel, finits coordinates
async function findApple()
{
await workbook.xlsx.readFile("G:\\Learn2026\\Playwright_JS\\Excel utils\\ExclUtils002.xlsx");
const worksheet = workbook.getWorksheet('Sheet1');
worksheet.eachRow((row,rowNumber)=>
{
    row.eachCell((cell,colNumber)=>
    {
        if(cell.value === 'Apple')
        {
            console.log(rowNumber);
            console.log(colNumber);
            r = rowNumber;
            c = colNumber;
        }
        })
    })
const cell = worksheet.getCell(r,c);
cell.value = 'Avacado';
await workbook.xlsx.writeFile("G:\\Learn2026\\Playwright_JS\\Excel utils\\ExclUtils002.xlsx");
}
//excelTest();
findApple();
