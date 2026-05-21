Feature: Validating errors
@Validations
Scenario Outline: Validating error on incorrect login
Given Enter incorrect credentials in Ecomm2 app "<username>", "<password>"
Then Error message should be displayed

Examples:
| username              | password     |
| qatest.sk11@gmail.com | Qatest@12345 |
| qatest.sk22@gmail.com | Qatest@12345 |