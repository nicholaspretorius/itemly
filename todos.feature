Feature: Todos
    Scenario: GET /todos 0
        Given There are no todos
        When I make a GET request to "/todos"
        Then The response should contain an array
        And the length of the array should be equal to 0

    Scenario: GET /todos 1
        Given There is only one todo
        When I make a GET request to "/todos"
        Then The responses should contain an array
        And the length of the array should be equal to 1

    Scenario: GET /todos >=1
        Given There are one or more todos
        When I make a GET request to "/todos"
        Then The response array should contain one or more objects
        And The first object should be equal to a todo object 

    Scenario: GET /todos 2
        Given There is more than one todo
        When I make a GET request to "/todos"
        Then The response should contain an array
        And the length of the array should be equal to 2
