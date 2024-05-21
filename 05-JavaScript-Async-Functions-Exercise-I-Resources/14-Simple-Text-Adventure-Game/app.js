function textAdventure() {
    let userInput = prompt("Welcome to the simple text adventure game! Type 'start' to begin.");

    while (userInput !== "no") {
        switch (userInput) {
            case "start":
                userInput = prompt("You find yourself in a dark forest. You can go 'left' or 'right'. What do you do? (left/right)");
                if (userInput === "left") {
                    userInput = prompt("You encounter a wild animal! You can 'fight' or 'run'. What do you do? (fight/run)");
                    if (userInput === "fight") {
                        alert("You bravely fight the animal and win!");
                    } else if (userInput === "run") {
                        alert("You run away safely.");
                    } else {
                        alert("Invalid input. Please try again.");
                    }
                } else if (userInput === "right") {
                    userInput = prompt("You find a treasure chest! You can 'open' it or 'leave' it. What do you do? (open/leave)");
                    if (userInput === "open") {
                        alert("You open the chest and find a treasure! You win!");
                    } else if (userInput === "leave") {
                        alert("You leave the chest and go back to the start.");
                    } else {
                        alert("Invalid input. Please try again.");
                    }
                } else {
                    alert("Invalid input. Please try again.");
                }
                break;
            default:
                alert("Invalid input. Please try again.");
                break;
        }

        userInput = prompt("Do you want to play again? (yes/no)");
        if(userInput == "yes"){
            userInput = "start"
        }
    }

    alert("Thank you for playing!");
}

// Call the function to start the game
textAdventure();
