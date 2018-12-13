import { Given, When, Then } from 'cucumber';
import * as assert from 'assert';

let answer = 0;

Given('I start with {int}', (input) => {
    answer = input;
});

When('I add {int}', (input) => {
    answer = answer + input;
});

Then('I end up with {int}', (input) => {
    assert.equal(answer, input);
});