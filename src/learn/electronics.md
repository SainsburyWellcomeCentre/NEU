---
layout: wiki.njk
title: Electrical Engineering Fundamentals
topic_label: Electronics
---

Understanding electrical principles is critical for building reliable data acquisition systems
and avoiding signal artefacts that corrupt experimental results.

## Electromagnetic Interference

EMI is unwanted electrical energy that couples into signal lines from nearby sources — power supplies, motors, fluorescent lighting, or even other instruments on the same bench. In neuroscience recordings, 50/60 Hz mains interference is the most common artefact.

> ### Key Points
> - Shield sensitive cables (e.g., EEG/LFP leads) and **ground the shield at one end only** to prevent ground loops.
> - Keep analogue signal cables physically separated from noisy digital lines or power cables.
> - Twist wire pairs (like CAN bus or differential signals) so that induced noise cancels out.

## Grounding & Ground Loops

A ground loop occurs when two devices are connected to ground through different paths, creating a large loop of wire. Magnetic fields passing through this loop induce a current, which appears as noise in your signals.

> ### Key Points
> - Implement a **star ground** topology where all equipment grounds connect at a single central point.
> - If devices must be powered from different circuits, use an opto-isolator or digital isolator to break the ground loop.
> - Never use the shield of a BNC cable to carry return current; it should only act as a Faraday cage.

## Signal Conditioning

Raw signals from biological sensors (like photodetectors or electrodes) are often too small or noisy to be read directly by an ADC.

> ### Key Points
> - **Amplify early:** Place the first stage of amplification as close to the sensor as possible to maximize SNR.
> - **Filter before digitizing:** Always use a hardware anti-aliasing (low-pass) filter before your ADC to prevent high-frequency noise from folding into your signal band.
> - Use differential amplifiers where possible, as they reject common-mode noise.

## PCB Design Basics

A poorly laid out PCB can introduce noise, crosstalk, and thermal issues that no amount of firmware can fix. Good PCB practices are essential for any custom electronics in the lab.

> ### Key Points
> - Use an **unbroken ground plane** on at least one layer — never route signal traces through it.
> - Separate analogue and digital ground regions, connecting them at a single point.
> - Keep high-speed or noisy traces (clocks, PWM) away from sensitive analogue inputs.
> - Use wider traces for power delivery and add thermal relief pads for hand soldering.
