const readline = require("readline"); // Library for terminal input
const fs = require("fs"); // Module for filestream operations

// const makes it so a variable cannot be reassigned
const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
});

// new creates a new instance of an object
// Here, creates a new instance of a Promise object
// Promise object is something that doesn't exist yet, but is expected.
// resolve puts the data into the Promise object once obtained.
// arrow syntax '=>' is shorthand defining a new function on one line.
function ask(question) {
    return new Promise(resolve => {
        // rl.question is an existing method, gives user input to resolve callback function.
        rl.question(question, resolve);
    });
}

const data = {
    user_inputs: []
}

// async functions are allowed to use await within them, along with other asynchronous operations.
async function main() {
    while (true) {
        // await pauses the async function until Promise is fulfilled, other tasks continue.
        const input = await ask("> ");

        if (input == "quit") {
            break;
        }

        data.user_inputs.push(input);

        // JSON built into JS runtime.
        // stringify turns JS object into JSON text.
        // This line is essentially 'with open' and 'json.dump' in one.
        fs.writeFileSync("data.json", JSON.stringify(data, null, 4)); 

        console.log("Input saved.");
    }
    // Built-in method to shut down readline interface.
    rl.close();

    const text = fs.readFileSync("data/data.json", "utf8");

    // JSON.parse takes JSON formatted text and turns it into a JS value.
    const read_data = JSON.parse(text)
    
    // Backticks needed for interpolating variable values ${}, otherwse can use double quotes.
    // JS uses dot notation for accessing object elements.
    for (let i = 0;i < read_data.user_inputs.length; i++) {
        console.log(`Message ${i+1}: ${read_data.user_inputs[i]}`);
    }
}

main();