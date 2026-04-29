---
layout: wiki.njk
title: Mechanical Design
topic_label: Mechanical
---

Designing reliable mechanical components is essential for experimental setups, ensuring stability, precision, and ease of use.

## Tolerances & Fits

Properly specified tolerances ensure parts fit together as intended without requiring excessive machining time or cost.

> ### Key Points
> - Use standard clearance and interference fits (e.g., ISO standard) where possible.
> - Consider manufacturing methods when specifying tolerances (e.g., CNC milling vs. 3D printing).
> - Apply looser tolerances where precise fit isn't critical to reduce cost.

## Material Selection

Choosing the right material impacts the strength, weight, and biocompatibility of your parts.

> ### Key Points
> - **Aluminum (e.g., 6061-T6):** Good balance of strength, weight, and machinability. Excellent for structural components.
> - **Stainless Steel (e.g., 316L):** High strength and corrosion resistance. Ideal for parts exposed to fluids or requiring high rigidity.
> - **Plastics (e.g., POM/Delrin):** Low friction, easy to machine. Good for bushings and non-load-bearing parts.
> - Consider biocompatibility for parts directly interacting with animals.

## Fasteners & Threads

Selecting appropriate fasteners ensures reliable assembly and disassembly of your setups.

> ### Key Points
> - Standardize on a few metric thread sizes (e.g., M2, M3, M4) to reduce the number of tools required.
> - Use threaded inserts in soft materials like plastics or 3D prints for repeated assembly.
> - Apply threadlocker (e.g., Loctite) to components subjected to vibration.

## 3D Printing Guidelines

3D printing (FDM, SLA) is invaluable for rapid prototyping and creating custom fixtures.

> ### Key Points
> - Design for the specific printing process (e.g., avoid steep overhangs for FDM, provide escape holes for SLA).
> - Orient parts to maximize strength along critical axes, as FDM prints are weakest between layers.
> - Incorporate tolerances for shrinkage and expansion, especially for holes and mating surfaces.
