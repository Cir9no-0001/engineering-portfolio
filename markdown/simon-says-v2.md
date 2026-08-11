# Project Overview

## What is this?

Simon Says V2 is an Arduino-based memory game inspired by Simon Says, built using an Ardunio UNO, a breadboard,
four different colored LEDs, an IR remote, an LCD display, and a piezo. The game works by generating increasingly
complex sequences of colored LED flashes that the user must memorize and reproduce using an IR remote controller.

The project combines embedded programming, circuit design, CAD design, and user interaction by integrating
multiple electronic components into a functional electronic toy.

## Why I Made This

I created this project to explore embedded systems and gain practical experience working with microcontrollers,
electronic components, and real-time user input processing.

The project allowed me to apply programming concepts such as arrays, random sequence generation, state management,
and input validation while learning how hardware and software interact in a physical system.

# Tech Stack

- **Microcontroller:** Arduino Uno R3
- **Programming Language:** Arduino C/C++
- **Circuit Design & Simulation:** Tinkercad Circuits
- **Hardware Design & Build:** Tinkercad 3D Design + 3D Printing
- **Components:**
  - 16x2 I2C LCD Display
  - IR Receiver Module
  - IR Remote Controller
  - RGB LEDs (Red, Green, Blue, Yellow)
  - Piezo Buzzer
  - 1kΩ Current-Limiting Resistors
  - Breadboard and Jumper Wires

# Key Features

## Interactive Gameplay System

The game generates a random sequence of LED colors that increases in length as the player progresses.
Each LED corresponds to a specific input from the IR remote, allowing the user to recreate the displayed pattern.

The Arduino continuously tracks user input, compares it against the generated sequence, and determines whether the player successfully completed the round.

Key gameplay features include:

- Randomized LED sequence generation
- Real-time IR remote input detection
- Sequence validation and error checking
- Increasing difficulty as rounds progress
- Audio and visual feedback during gameplay

## Difficulty and Progression System

Game difficulty from 1-5 can be set at the start of each new game playthrough which controls how fast the LED sequence flashes.
Additionally, the difficulty gradually increases by extending the sequence length by one after every three successful rounds. This
challenges the player’s memory and creates a progressive gameplay experience.

The Arduino manages game states including:

- Starting a new game
- Displaying the current sequence
- Waiting for player input
- Checking answers
- Handling success and failure conditions
- Keeping track of current and high score

## User Interface and Feedback System

A 16x2 I2C LCD display provides players with real-time information throughout the game.

The display communicates important game states such as:

- Welcome/start messages
- Player instructions
- Difficulty increases
- Success messages
- Failure notifications
- Scorekeeping

Additional feedback is provided through:

- LED animations to display sequences
- Custom piezo buzzer tones for different LEDs and thier corresponding IR input

# Development Process

## Tinkercraft Circuits Prototyping

Before assembling the physical circuit, I designed and tested the system in Tinkercad Circuits
to verify component connections and Arduino logic.

The simulation allowed me to validate:

- LED control and sequence behavior
- IR remote input handling
- LCD communication through the I2C interface
- Buzzer feedback functionality
- Overall gameplay logic before physical assembly

This reduced hardware debugging time and allowed me to iterate on the design more efficiently.

## CAD Design and 3D Printing

To transform the breadboard prototype into a more polished standalone device, I designed a
custom enclosure using Tinkercad 3D Design. The enclosure was designed around the dimensions
and placement of the Arduino, breadboard, LCD display, LEDs, buzzer, and IR receiver. The
design required multiple iterations to account for real-world manufacturing limitations.

During refinement, I adjusted:

- Sliding-piece connections to improve fit while accounting for 3D printing tolerances (enclosure twist lock)
- Component spacing to prevent interference inside the enclosure
- Openings for the IR receiver to ensure reliable remote communication
- Mounting areas to securely position internal electronics

After finalizing the design, I 3D printed the enclosure and integrated the electronics into
the final assembly. This process provided hands-on experience with CAD iteration, tolerance design
, and 3D printing.

## Assembly and Debugging

After completing the enclosure and circuit design, I assembled the electronics inside the 3D printed housing
and tested the complete system.

Debugging involved both electrical and mechanical challenges, including:

- Resolving wiring and component connection issues
- Adjusting Arduino code and enclosure design for reliable user input detection
- Troubleshooting LCD and IR communication
- Modifying enclosure dimensions to improve component fit and accessibility
- Changing material and design choices (infill, hole types, snap lock tolerances)

# Final Product

The final product is a fully functional Arduino-based memory game enclosed inside a custom-designed 3D printed housing. The completed device integrates
embedded programming, electronic hardware, and mechanical design into a standalone interactive system rather than a simple exposed breadboard prototype.

Players interact with the game through an IR remote controller, where their inputs are processed by the Arduino and compared against the generated
LED sequence. The Arduino manages the entire gameplay system by controlling the LED patterns, tracking player progress, updating the LCD display,
generating custom buzzer feedback, and managing difficulty progression and scoring.

The 3D printed enclosure was a critical component of the final design, requiring multiple iterations to achieve proper functionality and usability.
The final enclosure securely houses the Arduino, breadboard, LCD display, LEDs, piezo buzzer, and IR receiver while maintaining accessibility for
user interaction. Design challenges such as sliding-piece tolerances, snap-lock mechanisms, component clearance, and IR receiver placement required
iterative adjustments between CAD design and physical testing.

Through the complete development process, I gained experience with the full engineering design cycle: designing and simulating circuits, developing
embedded software, creating mechanical CAD models, manufacturing physical components, and refining prototypes based on testing results. The final device
demonstrates the integration of software, electronics, and mechanical systems to create a functional and user-focused product.
