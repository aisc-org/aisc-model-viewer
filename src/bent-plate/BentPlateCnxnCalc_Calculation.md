# Bent Plate Connection Calculation

**Per AISC Steel Construction Manual, 16th Edition (LRFD)**
All calculations follow AISC 360-22 unless noted otherwise.

---

## Sample Structure
A W16x36 joist frames into another W16x36 girder at a 45-degree angle, based on unique geometry demands. Joist is 20 feet long and has a 2klf load on it, with 20-kip vertical reactions. The joist is designed as pin-pin, so no moment demand. A bent plate is a similar connection to the simple shear tab, with the added feature of accomadating the angle of the member.

---

## Member Information

| Parameter | Value | Unit | Description |
|---|---|---|---|
| Main Member | W16x36 | — | Out-of-plane beam element |
| Side Member | PL3/8 | — | Shear tab plate |

---

## Inputs

### Material Properties

| Parameter | Symbol | Value | Unit | Reference |
|---|---|---|---|---|
| Beam ultimate strength | $F_{u,\text{beam}}$ | 65.0 | ksi | A992 |
| Plate ultimate strength | $F_{u,\text{plate}}$ | 58.0 | ksi | A36 |
| Beam yield strength | $F_{y,\text{beam}}$ | 50.0 | ksi | A992 |
| Plate yield strength | $F_{y,\text{plate}}$ | 36.0 | ksi | A36 |
| Bolt tensile strength | $F_{nt}$ | 90.0 | ksi | A325, AISC Table J3.2 |
| Bolt shear strength | $F_{nv}$ | 54.0 | ksi | A325 (N), AISC Table J3.2 |
| Modulus of elasticity | $E$ | 29000 | ksi | AISC Table 2-4 |

### LRFD Resistance Factors

| Factor | Symbol | Value | Application |
|---|---|---|---|
| Yielding | $\phi_y$ | 0.9 | Tension/compression yielding |
| Fracture | $\phi_f$ | 0.75 | Tension fracture |
| Block shear | $\phi_{bs}$ | 0.75 | Block shear rupture |
| Welds | $\phi_w$ | 0.75 | Weld design strength |
| Bolt | $\phi_{bolt}$ | 0.75 | Bolt tension and shear |

### Applied Loads

| Parameter | Symbol | Value | Unit | Source |
|---|---|---|---|---|
| Axial force | $P$ | 0.0 | k | Structural analysis |
| Shear reaction | $V$ | 20.0 | k | Structural analysis |

### Plate Geometry

| Parameter | Symbol | Value | Unit | Description |
|---|---|---|---|---|
| Plate thickness | $t_s$ | 0.375 | in | Side member (plate) |

### Main Member Geometry (AISC Table 1-1)

| Parameter | Symbol | Value | Unit | Description |
|---|---|---|---|---|
| Web thickness | $t_m$ | 0.295 | in | Main member web |
| kdes | $k$ | 0.832 | in | Fillet-to-face distance |
| Depth | $d$ | 15.9 | in | Beam depth |
| Gross area | $A_{g,\text{main}}$ | 10.6 | in² | Beam gross area |
| Shear lag coord | $\bar{x}$ | 0.75 | in | k1 from Table 1-1 |

### Bolt Layout

| Parameter | Symbol | Value | Unit | Description |
|---|---|---|---|---|
| Edge distance, x | $L_{ex}$ | 1.25 | in | Edge to bolt, x direction |
| Edge distance, y | $L_{ey}$ | 1.25 | in | Edge to bolt, y direction |
| Bolt spacing, x | $s$ | 3.0 | in | Spacing in x direction |
| Bolt gage, y | $g$ | 3.0 | in | Gage in y direction |
| Rows of bolts | $n_{rows}$ | 2 | — | |
| Bolts per row | $n_{bolts}$ | 1 | — | |
| Bolt diameter | $d_b$ | 1.0 | in | A325 bolt |
| Eccentricity, bend to bolts | $e_1$ | 2.0 | in | |
| Eccentricity, bend to weld | $e_2$ | 4.25 | in | |

### Weld Parameters

| Parameter | Symbol | Value | Unit | Description |
|---|---|---|---|---|
| Electrode strength | $F_{EXX}$ | 70.0 | ksi | E70 SMAW electrode |
| Min weld size | $D_{min}$ | 0.1875 | in | AISC Table J2-4 |

---

## Derived Quantities

Decompose the axial load $P$ at 45 degrees into in-plane components:

$$
P_g = P \cos(45°) = 0.0 \times \cos(45°) = 0.0000 \text{ k}
$$

Space required in the y direction for the bolt group:

$$
s_{req,y} = 2L_{ey} + (n_{rows}-1) \cdot g = 2(1.25) + (2-1)(3.0) = 5.5000 \text{ in}
$$

Plate gross area:

$$
A_{g,\text{side}} = s_{req,y} \cdot t_s = 5.5 \times 0.375 = 2.0625 \text{ in}^2
$$

Available space on beam web:

$$
s_{avail} = d - 2k = 15.9 - 2(0.832) = 14.2360 \text{ in}
$$

Space check: $s_{req,y} = 5.5 \text{ in} < s_{avail} = 14.236 \text{ in}$ — **GOOD**

---

## 1. Yielding

This section checks that applied loads do not exceed the gross-section yielding capacity of the main member (beam web) and the side member (plate) under shear and axial demands.

### 1.1 Main Member (Beam Web) Yield

The gross area yielding capacity of the beam:

$$
\phi_y R_n = \phi_y F_{y,\text{beam}} A_{g,\text{main}}
$$

*AISC Eq. D2-1*

$$
= 0.9 \times 50.0 \times 10.6 = 477.000 \text{ k}
$$

Demand: $\max(P, V) = \max(0.0, 20.0) = 20.000$ k

$\phi_y R_n = 477.000 \text{ k} > 20.000 \text{ k}$ — Beam Yield Check **GOOD**

### 1.2 Side Member (Plate) Shear Yield

The plate gross area shear yielding capacity:

$$
\phi_y R_n = \phi_y F_{y,\text{plate}} A_{g,\text{side}}
$$

*AISC Eq. D2-1*

$$
= 0.9 \times 36.0 \times 2.0625 = 66.825 \text{ k}
$$

Demand: $V = 20.0$ k

$\phi_y R_n = 66.825 \text{ k} > 20.0 \text{ k}$ — Plate Shear Yield Check **GOOD**

### 1.3 Side Member (Plate) Axial Yield

The plate axial yielding capacity using the gross area:

$$
\phi_y R_n = \phi_y \left[ t_s(1 + 2L_{ex} + (n_{rows}-1)s) \right] F_{y,\text{beam}}
$$

*AISC Eq. D2-1*

$$
= 0.9 \times [0.375(1 + 2(1.25) + (2-1)(3.0))] \times 50.0 = 109.6875 \text{ k}
$$

$\phi_y R_n = 109.6875 \text{ k} > 0.0 \text{ k}$ — Plate Axial Yield Check **GOOD**

---

## 2. Fracture

This section checks the net-section fracture capacity of the side and main members. The main member check includes a shear lag reduction factor to account for incomplete load transfer through the connection.

### 2.1 Side Member (Plate) Fracture

Net area of the plate (deducting one hole row of $d_b + 1/8"$ per AISC B4.3b):

$$
A_{e,\text{side}} = A_{g,\text{side}} - n_{\text{bolts}}(d_b + \tfrac{1}{8})t_s
$$

*AISC Section B4.3b*

$$
= 2.0625 - 1(1.0 + 0.125)(0.375) = 1.640625 \text{ in}^2
$$

Fracture capacity:

$$
\phi_f R_n = \phi_f F_{u,\text{plate}} A_{e,\text{side}}
$$

*AISC Eq. D2-1*

$$
= 0.75 \times 58.0 \times 1.640625 = 71.3672 \text{ k}
$$

Demand: $\max(P_g, V) = \max(0.0000, 20.0) = 20.0000$ k

$\phi_f R_n = 71.3672 \text{ k} > 20.0000 \text{ k}$ — Plate Fracture Check **GOOD**

### 2.2 Main Member (Beam) Fracture with Shear Lag

Shear lag factor (W-shape connected through web):

$$
U = 1 - \frac{\bar{x}}{(n_{\text{rows}}-1)s}
$$

*AISC Table D3.1 Case 2*

$$
= 1 - \frac{0.75}{(2-1)(3.0)} = 0.7500
$$

Net area of the beam:

$$
A_{n,\text{main}} = A_{g,\text{main}} - n_{\text{bolts}}(d_b + \tfrac{1}{8})t_m
$$

*AISC Section B4.3b*

$$
= 10.6 - 1(1.0 + 0.125)(0.295) = 10.268125 \text{ in}^2
$$

Effective net area:

$$
A_{e,\text{main}} = A_{n,\text{main}} \cdot U
$$

*AISC Eq. D3-1*

$$
= 10.268125 \times 0.7500 = 7.701094 \text{ in}^2
$$

Fracture capacity:

$$
\phi_f R_n = \phi_f F_{u,\text{beam}} A_{e,\text{main}}
$$

*AISC Eq. D2-1*

$$
= 0.75 \times 65.0 \times 7.701094 = 375.4283 \text{ k}
$$

Demand: $\max(P, V) = 20.000$ k

$\phi_f R_n = 375.4283 \text{ k} > 20.000 \text{ k}$ — MM Fracture Check **GOOD**

---

## 3. Block Shear

Block shear rupture occurs when a block of material tears out bounded by the bolt holes and the plate edges. Both the shear-direction (V) and axial-direction (P) failure paths are checked. AISC J4-5 takes the minimum of the yielding- and fracture-controlled expressions as the controlling capacity.

### 3.1 Plate Block Shear — Shear (V) Direction

Gross and net shear areas:

$$
A_{gv} = t_s \left[ L_{ex} + (n_{\text{rows}}-1)g \right]
$$

*AISC J4.3b*

$$
= 0.375 \times [1.25 + (2-1)(3.0)] = 1.59375 \text{ in}^2
$$

$$
A_{nv} = A_{gv} - \left(n_{\text{rows}} - 0.5\right)\left(d_b + \tfrac{1}{8}\right)t_s
$$

*AISC Section B4.3b*

$$
= 1.59375 - (2 - 0.5)(1.0 + 0.125)(0.375) = 0.9609375 \text{ in}^2
$$

Gross and net tension areas:

$$
A_{gt} = t_s \cdot L_{ex} = 0.375 \times 1.25 = 0.46875 \text{ in}^2
$$

$$
A_{nt} = A_{gt} - \frac{d_b + \tfrac{1}{8}}{2} \, t_s = 0.46875 - \frac{1.0+0.125}{2}(0.375) = 0.2578125 \text{ in}^2
$$

Block shear — yielding limit:

$$
\phi_{bs} R_{n,\text{yield}} = \phi_{bs}\left[0.6 F_{y,\text{plate}} A_{gv} + F_{u,\text{plate}} A_{nt}\right]
$$

*AISC Eq. J4-5*

$$
= 0.75[0.6(36.0)(1.59375) + (58.0)(0.2578125)] = 37.0336 \text{ k}
$$

Block shear — fracture limit:

$$
\phi_{bs} R_{n,\text{frac}} = \phi_{bs}\left[0.6 F_{u,\text{plate}} A_{nv} + F_{u,\text{plate}} A_{nt}\right]
$$

*AISC Eq. J4-5*

$$
= 0.75[0.6(58.0)(0.9609375) + (58.0)(0.2578125)] = 36.2953 \text{ k}
$$

Controlling mode: FRACTURE

$\phi_{bs} R_n = \min(37.0336, 36.2953) = 36.2953$ k

Demand: $V = 20.0$ k

Plate Block Shear (Shear) Check **GOOD**

### 3.2 Plate Block Shear — Axial (P) Direction

Using the y-direction edge distance and x-direction spacing:

$$
A_{gv} = t_s \left[ L_{ey} + (n_{\text{rows}}-1)s \right]
$$

*AISC J4.3b*

$$
= 0.375 \times [1.25 + (2-1)(3.0)] = 1.59375 \text{ in}^2
$$

$$
A_{nv} = A_{gv} - (n_{\text{rows}}-0.5)(d_b+\tfrac{1}{8})t_s = 1.59375 - (2-0.5)(1.0+0.125)(0.375) = 0.9609375 \text{ in}^2
$$

$$
A_{gt} = t_s \cdot L_{ey} = 0.375 \times 1.25 = 0.46875 \text{ in}^2
$$

$$
A_{nt} = A_{gt} - \frac{d_b+\tfrac{1}{8}}{2}\,t_s = 0.46875 - 0.5625 \times 0.375 = 0.2578125 \text{ in}^2
$$

$$
\phi_{bs} R_{n,\text{yield}} = \phi_{bs}[0.6 F_{y,\text{plate}} A_{gv} + F_{u,\text{plate}} A_{nt}]
$$

*AISC Eq. J4-5*

$$
= 0.75[0.6(36.0)(1.59375) + (58.0)(0.2578125)] = 37.0336 \text{ k}
$$

$$
\phi_{bs} R_{n,\text{frac}} = \phi_{bs}[0.6 F_{u,\text{plate}} A_{nv} + F_{u,\text{plate}} A_{nt}]
$$

*AISC Eq. J4-5*

$$
= 0.75[0.6(58.0)(0.9609375) + (58.0)(0.2578125)] = 36.2953 \text{ k}
$$

Controlling mode: FRACTURE

$\phi_{bs} R_n = 36.2953$ k, Demand: $P_g = 0.0000$ k

Plate Block Shear (Axial) Check **GOOD**

---

## 4. Bearing Strength at Bolt Holes

Bearing is checked on both the main member (beam web) and side member (plate). For each direction, the edge bolt uses the edge clear distance $L_{c1}$ and interior bolts use the bolt-spacing clear distance $L_{c2}$. The controlling mode per bolt is the lesser of bearing ($1.2 L_c t F_u$) and tearout ($2.4 d_b t F_u$).

**Clear distances:**

$$
L_{c1} = L_e - \frac{d_b + 0.0675}{2}
$$

*AISC J3.10*

$$
L_{c1,y} = 1.25 - \frac{1.0+0.0675}{2} = 0.71625 \text{ in}, \quad L_{c1,x} = 1.25 - \frac{1.0+0.0675}{2} = 0.71625 \text{ in}
$$

$$
L_{c2,y} = g - (d_b+0.0675) = 3.0 - (1.0+0.0675) = 1.93250 \text{ in}, \quad L_{c2,x} = s - (d_b+0.0675) = 3.0 - (1.0+0.0675) = 1.93250 \text{ in}
$$

### 4.1 Main Member (Beam Web) Shear Bearing — y Direction

$$
\phi R_{n,B1} = \phi (1.2 F_{u,\text{beam}}) L_{c1,y} \, t_m
$$

*AISC Eq. J3-6a*

$$
= 0.75(1.2 \times 65.0)(0.71625)(0.295) = 12.3607 \text{ k} \quad (\text{BEARING controls for edge bolt})
$$

$$
\phi R_{n,B2} = \phi (1.2 F_{u,\text{beam}}) L_{c2,y} \, t_m = 0.75(1.2 \times 65.0)(1.93250)(0.295) = 33.3501 \text{ k}
$$

*AISC Eq. J3-6a*

Total capacity summed over all bolt rows:

$$
\phi R_{n,\text{total}} = \min(B_1, T_1) + (n_{\text{rows}}-1)\min(B_2, T_2)
$$

*AISC J3.10*

$$
= \min(12.3607, 34.5150) + (2-1)\min(33.3501, 34.5150) = 45.7108 \text{ k}
$$

Demand: $V = 20.0$ k

Beam Shear Bearing Check **GOOD**

### 4.2 Side Member (Plate) Shear Bearing — y Direction

$$
\phi R_{n,B1} = \phi(1.2 F_{u,\text{plate}}) L_{c1,y} \, t_s = 0.75(1.2 \times 58.0)(0.71625)(0.375) = 14.0206 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi R_{n,B2} = \phi(1.2 F_{u,\text{plate}}) L_{c2,y} \, t_s = 0.75(1.2 \times 58.0)(1.93250)(0.375) = 37.8287 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi R_{n,\text{total}} = \min(B_1,T_1) + (n_{\text{rows}}-1)\min(B_2,T_2)
$$

*AISC J3.10*

$$
= \min(14.0206, 39.1500) + (2-1)\min(37.8287, 43.8750) = 51.8493 \text{ k}
$$

Demand: $V = 20.0$ k

Plate Shear Bearing Check **GOOD**

### 4.3 Main Member (Beam Web) Axial Bearing — x Direction

$$
\phi R_{n,B1} = \phi(1.2 F_{u,\text{beam}}) L_{c1,x} \, t_m = 0.75(1.2 \times 65.0)(0.71625)(0.295) = 12.3607 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi R_{n,B2} = \phi(1.2 F_{u,\text{beam}}) L_{c2,x} \, t_m = 0.75(1.2 \times 65.0)(1.93250)(0.295) = 33.3501 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi R_{n,\text{total}} = \min(B_1,T_1) + (n_{\text{rows}}-1)\min(B_2,T_2) = \min(12.3607,34.5150) + (2-1)\min(33.3501,34.5150) = 45.7108 \text{ k}
$$

*AISC J3.10*

Demand: $P_g = 0.0000$ k

Beam Axial Bearing Check **GOOD**

### 4.4 Side Member (Plate) Axial Bearing — x Direction

$$
\phi_{bs} R_{n,B1} = \phi_{bs}(1.2 \, t_s) L_{c1,x} F_{u,\text{plate}} = 0.75(1.2 \times 0.375)(0.71625)(58.0) = 14.0206 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi_{bs} R_{n,B2} = \phi_{bs}(1.2 \, t_s) L_{c2,x} F_{u,\text{plate}} = 0.75(1.2 \times 0.375)(1.93250)(58.0) = 37.8287 \text{ k}
$$

*AISC Eq. J3-6a*

$$
\phi_{bs} R_{n,\text{total}} = \min(B_1,C_1) + (n_{\text{rows}}-1)\min(B_2,C_2) = \min(14.0206,39.1500) + (2-1)\min(37.8287,39.1500) = 51.8493 \text{ k}
$$

*AISC J3.10*

Demand: $P_g = 0.0000$ k

Plate Axial Bearing Check **GOOD**

---

## 5. Bolt Failure

Bolts are checked for in-plane shear and for the additional shear demand introduced by eccentricity between the bend line and the bolt group centroid.

### 5.1 Bolt Shear Capacity

Individual bolt shear strength (single shear, $A_b = \pi d_b^2 / 4$):

$$
\phi r_n = \phi \, A_b \, F_{nv} = \phi \cdot \frac{\pi d_b^2}{4} \cdot F_{nv}
$$

*AISC Eq. J3-1*

$$
= 0.75 \times \frac{\pi (1.0)^2}{4} \times 54.0 = 31.808626 \text{ k/bolt}
$$

Total capacity for $n_b = n_{{rows}} \times n_{{bolts}} = {nb}$ bolts:

$$
\phi R_n = n_b \cdot \phi r_n = 2 \times 31.808626 = 63.617251 \text{ k}
$$

Demand: $\max(P, V) = 20.000$ k

Bolt Shear Check **GOOD**

### 5.2 Eccentric Shear Check

The bolt group is loaded eccentrically by the moment $M = P \cdot e_1$. The elastic vector method (AISC Part 7, Table 7-5) gives the resultant force on the most remote bolt:

Polar moment of the bolt group (sum of distances):

$$
I_p = \sum_{i=1}^{n_b} r_i = \sum \sqrt{x_i^2 + y_i^2}
$$

*AISC Part 7, Table 7-5*

$$
= \sqrt{0^2+1.5000^2} + \sqrt{0^2+1.5000^2} = 3.0000 \text{ in}
$$

$$
R_{rm} = \frac{P \cos(0°) \cdot e_1 \cdot c}{I_p}
$$

*AISC Part 7, Table 7-5*

$$
= \frac{0.0 \times 1 \times 2.0 \times 1.5000}{3.0000} = 0.0000 \text{ k}
$$

$R_{rm} = 0.0000$ k $< \phi r_n = 31.8086$ k — Eccentricity Check **GOOD**

---

## 6. Weld from Plate to Column: Sizing

The plate is welded to the column using a fillet weld on both sides. The required weld leg size is determined by dividing the maximum demand by the design strength per unit length of weld (45-degree fillet weld, $\theta = 45°$).

Total weld length (one weld on each side of the plate):

$$
L_w = 2 \, s_{req,y}
$$

$$
= 2 \times 5.5000 = 11.0000 \text{ in}
$$

Required weld leg size:

$$
D_{\text{req}} = \frac{\max(P, V)}{\dfrac{1}{\sqrt{2}} \cdot \phi_w \cdot 0.6 \cdot F_{EXX} \cdot L_w}
$$

*AISC Eq. J2-3*

$$
= \frac{20.000}{\dfrac{1}{\sqrt{2}} \times 0.75 \times 0.6 \times 70.0 \times 11.0000} = 0.081628 \text{ in}
$$

Minimum weld size from AISC Table J2-4: $D_{min} = 0.1875$ in

Specified weld size (round $D_{{req}}$ up to nearest $\frac{{1}}{{16}}$"):

$$
D_w = \max\!\left(D_{min},\, \left\lceil D_{req} \times 16 \right\rceil / 16\right) = 0.1875 \text{ in}
$$

*AISC Table J2-4*

---

## Summary of All Checks

| Check | Capacity | Demand | Unit | Result |
|---|---|---|---|---|
| Space Available | 14.2360 | 5.5000 | in | **GOOD** |
| 1a. Beam Yield | 477.000 | 20.000 | k | **GOOD** |
| 1b. Plate Shear Yield | 66.825 | 20.000 | k | **GOOD** |
| 1c. Plate Axial Yield | 109.688 | 0.000 | k | **GOOD** |
| 2a. Plate Fracture | 71.3672 | 20.0000 | k | **GOOD** |
| 2b. MM Fracture | 375.4283 | 20.000 | k | **GOOD** |
| 3a. Plate Blk Shear (V) | 36.2953 | 20.000 | k | **GOOD** |
| 3b. Plate Blk Shear (P) | 36.2953 | 0.0000 | k | **GOOD** |
| 4a. Beam Shear Bearing | 45.7108 | 20.000 | k | **GOOD** |
| 4b. Plate Shear Bearing | 51.8493 | 20.000 | k | **GOOD** |
| 4c. Beam Axial Bearing | 45.7108 | 0.0000 | k | **GOOD** |
| 4d. Plate Axial Bearing | 51.8493 | 0.0000 | k | **GOOD** |
| 5a. Bolt Shear | 63.6173 | 20.000 | k | **GOOD** |
| 5b. Eccentricity | 63.6173 | 0.0000 | k | **GOOD** |
| 6a. Weld Size Check | 0.1875 | 0.1875 | in | **GOOD** |

**Overall Result: **ALL CHECKS PASS****
