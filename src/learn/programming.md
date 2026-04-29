---
layout: wiki.njk
title: Programming & Firmware
topic_label: Programming
---

Robust software is the backbone of modern experimental automation. Writing clean, maintainable, and reliable code ensures reproducibility.

## Version Control (Git)

Version control is non-negotiable for any software project, allowing you to track changes, collaborate, and revert to known good states.

> ### Key Points
> - Commit often with clear, descriptive messages.
> - Use branches for new features or experiments to keep the main branch stable.
> - Host repositories on platforms like GitHub or GitLab for backup and sharing.

## Code Style & Linting

Consistent code style makes software easier to read, understand, and maintain, especially in collaborative environments.

> ### Key Points
> - Adhere to standard style guides (e.g., PEP 8 for Python, Google C++ Style Guide).
> - Use automated formatters (e.g., Black, Prettier) and linters (e.g., Flake8, ESLint) in your workflow.
> - Document your code thoroughly with docstrings and comments explaining *why*, not just *what*.

## Hardware Interfacing

Reliable communication between software and hardware is critical for data acquisition and stimulus delivery.

> ### Key Points
> - Handle communication timeouts gracefully to prevent software hangs.
> - Use established protocols (e.g., Serial/UART, SPI, I2C) rather than creating custom ones when possible.
> - Buffer incoming data to prevent dropped samples during high-speed acquisition.

## Real-time Constraints

Many neuroscience experiments require precise timing for stimulus presentation and behavior logging. Standard operating systems (like Windows or macOS) are not real-time.

> ### Key Points
> - Offload time-critical tasks (e.g., generating precise pulses) to dedicated microcontrollers (e.g., Arduino, Teensy).
> - Use hardware timers and interrupts rather than software loops for precise delays.
> - If precise software timing is required, use a Real-Time Operating System (RTOS) or dedicated real-time hardware.
