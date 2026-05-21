Feature: Ecomm validations
@regression
Scenario: Placing the order
    Given Login to ecomm app with "qatest.sk11@gmail.com" and "Qatest@1234"
    When Add product to cart "ZARA COAT 3"
    Then Verify "ZARA COAT 3" is displayed in cart
    When Placed order with valid details
    Then Verify order in Order History page