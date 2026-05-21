import {test as base} from '@playwright/test';

interface TestDataForOrder
{
username: string;
password: string;
productName: string;
};
export const customTest = base.extend<{testDataForOrder: TestDataForOrder}>
(
{
testDataForOrder:    {
    username : "anshikaw@gmail.com",
    password : "Learning@830$3mK3",
    productName:"ADIDAS ORIGINAL"
    
    }
}
)




