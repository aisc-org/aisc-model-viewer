# Steel Connections Calculation
## Bolted Shear Tab — Vertical Brace to Gusset Plate

*All calculations per AISC Steel Construction Manual, 16th Edition (LRFD)*

---

## Sample Structure
Consider a W16x36 girder being connected to two columns as a part of a floor system. The beam is designed as a pin-pin, so it's connections do not need moment control. A simple pin connection for the ends of this beam may be a **shear tab**. Lets design this for a shear tab on one side of a 10' girder carrying a 4klf load.

---

## Members & Applied Loads

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Axial force, $P$ | 0 | kips | Max axial force, from structural analysis |
| Shear reaction, $V$ | 20 | kips | From structural analysis |
| Main member | W16x36 | — | Out-of-plane beam element |
| Side member | PL0.5 | — | Shear tab plate |

---

## Section & Material Properties

### Main Member — W16x36 (AISC Table 1-1)

| Symbol | Value | Unit | Description |
|--------|-------|------|-------------|
| $t_m$ | 0.295 | in | Web thickness |
| $d$ | 15.9 | in | Overall depth |
| $k$ | 0.832 | in | Distance to fillet |
| $\bar{x}$ | 0.75 | in | Centroid location ($k_1$), for shear lag |
| $A_{g,main}$ | 10.6 | in² | Gross cross-sectional area |

### Side Member — PL0.5

| Symbol | Value | Unit | Description |
|--------|-------|------|-------------|
| $t_s$ | 0.5 | in | Plate thickness |
| $A_{g,side}$ | 4.2500 | in² | Gross area $= t_s \cdot (2L_{ey} + (n_{rows}-1)s)$ |

### Material Strengths

| Symbol | Value | Unit | Description |
|--------|-------|------|-------------|
| $F_{u,side}$ | 58 | ksi | Ultimate strength, plate (A36) |
| $F_{u,main}$ | 65 | ksi | Ultimate strength, W-shape (A992) |
| $F_{y,side}$ | 36 | ksi | Yield strength, plate (A36) |
| $F_{y,main}$ | 50 | ksi | Yield strength, W-shape (A992) |

### LRFD Resistance Factors

| Symbol | Value | Description |
|--------|-------|-------------|
| $\phi_y$ | 0.9 | Yielding |
| $\phi_f$ | 0.75 | Fracture |
| $\phi_{bs}$ | 0.75 | Block shear |

---

## Bolt Layout & Geometry

| Symbol | Value | Unit | Description |
|--------|-------|------|-------------|
| $L_{ex}$ | 1.25 | in | Edge distance, x-direction (axial) |
| $L_{ey}$ | 1.25 | in | Edge distance, y-direction (shear) |
| $s$ | 3.0 | in | Row spacing, x-direction |
| $g$ | 3.0 | in | Bolt gage, y-direction |
| $n_{rows}$ | 3 | — | Number of bolt rows |
| $n_{bolts}$ | 1 | — | Bolts per row |
| $n_b$ | 3 | — | Total bolts $= n_{rows} \times n_{bolts}$ |
| $d_b$ | 1.0 | in | Bolt diameter |

---

## 1. Geometry Check

Verify that the bolt layout fits within the available web height.

$$
S_{req} = 2L_{ey} + (n_{bolts}-1) \cdot g = 2(1.25) + (1-1)(3.0) = 8.5000 \text{ in}
$$

$$
S_{avail} = d - 2k = 15.9 - 2(0.832) = 14.2360 \text{ in}
$$

> **GOOD** &nbsp; **Available Space Check** &nbsp;|&nbsp; $S_{req} = 8.5000$ in &nbsp;<&nbsp; $S_{avail} = 14.2360$ in

---

## 2. Yielding — Shear and Axial

*AISC Eq. D2-1: &nbsp; $\phi_y F_y A_g$*

### 2.1 Main Member Yielding

The main member must not yield under combined axial and shear demand.

$$
\phi_y F_{y,main} A_{g,main} = (0.9)(50)(10.6) = 477.000 \text{ k}
$$

> **GOOD** &nbsp; **MM Yield  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 477.000 k &nbsp;≥&nbsp; Demand = 20.000 k

### 2.2 Side Member Yielding — Shear

$$
\phi_y F_{y,side} A_{g,side} = (0.9)(36)(4.2500) = 137.700 \text{ k}
$$

> **GOOD** &nbsp; **SM Yield — shear  (vs V)** &nbsp;|&nbsp; Capacity = 137.700 k &nbsp;≥&nbsp; Demand = 20.000 k

### 2.3 Side Member Yielding — Axial

$$
A_{g,side,axial} = t_s \cdot (2L_{ex} + (n_{bolts}-1)g) = (0.5)(2(1.25) + (1-1)(3.0)) = 1.2500 \text{ in}^2
$$

$$
\phi_y F_{y,side} A_{g,side,axial} = (0.9)(36)(1.2500) = 40.500 \text{ k}
$$

> **GOOD** &nbsp; **SM Yield — axial  (vs P)** &nbsp;|&nbsp; Capacity = 40.500 k &nbsp;≥&nbsp; Demand = 0.000 k

---

## 3. Fracture — Shear and Axial

*AISC Eq. D2-2: &nbsp; $\phi_f F_u A_e$ &nbsp; | &nbsp; Net area per AISC B4.3b, shear lag per AISC D3.1*

### 3.1 Side Member Fracture

Hole deduction: $d_h = d_b + \frac{1}{8}$" per AISC B4.3b

$$
A_{e,side} = A_{g,side} - n_{bolts}(d_b + \tfrac{1}{8})t_s = 4.2500 - (1)(1.125)(0.5) = 3.6875 \text{ in}^2
$$

$$
\phi_f F_{u,side} A_{e,side} = (0.75)(58)(3.6875) = 160.4062 \text{ k}
$$

> **GOOD** &nbsp; **SM Fracture  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 160.406 k &nbsp;≥&nbsp; Demand = 20.000 k

### 3.2 Main Member Fracture

Shear lag factor $U$ per AISC Table D3.1:

$$
A_{n,main} = A_{g,main} - n_{bolts}(d_b + \tfrac{1}{8})t_m = 10.6 - (1)(1.125)(0.295) = 10.2681 \text{ in}^2
$$

$$
U = 1 - \frac{\bar{x}}{L} = 1 - \frac{0.75}{6.0} = 0.8750
$$

$$
A_{e,main} = A_{n,main} \cdot U = (10.2681)(0.8750) = 8.9846 \text{ in}^2
$$

$$
\phi_f F_{u,main} A_{e,main} = (0.75)(65)(8.9846) = 437.9997 \text{ k}
$$

> **GOOD** &nbsp; **MM Fracture  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 438.000 k &nbsp;≥&nbsp; Demand = 20.000 k

---

## 4. Block Shear

*AISC Eq. J4-5: &nbsp; $\phi_{bs}[0.6F A_{shear} + F_u A_{net,tension}]$*

Failure plane: shear rupture along bolt group + tension rupture across edge distance.

### 4.1 Main Member Block Shear

Failure along both shear planes flanking the bolt group:

$$
A_{gv} = t_m \cdot 2(n_{rows}-1)s = (0.295) \cdot 2(3-1)(3.0) = 3.5400 \text{ in}^2
$$

$$
A_{nv} = A_{gv} - (n_{rows}-1)(d_b+\tfrac{1}{8})t_m = 3.5400 - (3-1)(1.125)(0.295) = 2.8763 \text{ in}^2
$$

$$
A_{gt} = 2 L_{ex} t_m = 2(1.25)(0.295) = 0.7375 \text{ in}^2
$$

$$
A_{nt} = A_{gt} - (d_b+\tfrac{1}{8})t_m = 0.7375 - (1.125)(0.295) = 0.4056 \text{ in}^2
$$

$$
\phi_{bs}[0.6 F_{y} A_{gv} + F_u A_{nt}] = (0.75)[0.6(50)(3.5400) + (65)(0.4056)] = 99.4242 \text{ k} \quad \text{(yielding)}
$$

$$
\phi_{bs}[0.6 F_{u} A_{nv} + F_u A_{nt}] = (0.75)[0.6(65)(2.8763) + (65)(0.4056)] = 103.9045 \text{ k} \quad \text{(fracture)}
$$

Controlling mechanism: **YIELDING** &nbsp;→&nbsp; $\phi R_n = 99.4242$ k

> **GOOD** &nbsp; **MM Block Shear  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 99.424 k &nbsp;≥&nbsp; Demand = 20.000 k

### 4.2 Side Member Block Shear — Shear (y-direction)

$$
A_{gv} = t_s(L_{ex} + (n_{bolts}-1)g) = (0.5)(1.25 + (1-1)(3.0)) = 0.6250 \text{ in}^2
$$

$$
A_{nv} = A_{gv} - (n_{bolts}-0.5)(d_b+\tfrac{1}{8})t_s = 0.6250 - (1-0.5)(1.125)(0.5) = 0.3438 \text{ in}^2
$$

$$
A_{gt} = L_{ex} \cdot t_s = (1.25)(0.5) = 0.6250 \text{ in}^2
$$

$$
A_{nt} = A_{gt} - \tfrac{1}{2}(d_b+\tfrac{1}{8})t_s = 0.6250 - 0.5625(0.5) = 0.3438 \text{ in}^2
$$

Controlling mechanism: **FRACTURE** &nbsp;→&nbsp; $\phi R_n = 23.9250$ k

> **GOOD** &nbsp; **SM Block Shear — shear  (vs V)** &nbsp;|&nbsp; Capacity = 23.925 k &nbsp;≥&nbsp; Demand = 20.000 k

### 4.3 Side Member Block Shear — Axial (x-direction)

$$
A_{gv} = t_s(L_{ey} + (n_{rows}-1)s) = (0.5)(1.25 + (3-1)(3.0)) = 3.6250 \text{ in}^2
$$

$$
A_{nv} = A_{gv} - (n_{rows}-0.5)(d_b+\tfrac{1}{8})t_s = 3.6250 - (3-0.5)(1.125)(0.5) = 2.2188 \text{ in}^2
$$

$$
A_{gt} = L_{ey} \cdot t_s = (1.25)(0.5) = 0.6250 \text{ in}^2
$$

$$
A_{nt} = A_{gt} - \tfrac{1}{2}(d_b+\tfrac{1}{8})t_s = 0.6250 - 0.5625(0.5) = 0.3438 \text{ in}^2
$$

Controlling mechanism: **FRACTURE** &nbsp;→&nbsp; $\phi R_n = 72.8625$ k

> **GOOD** &nbsp; **SM Block Shear — axial  (vs P)** &nbsp;|&nbsp; Capacity = 72.862 k &nbsp;≥&nbsp; Demand = 0.000 k

---

## 5. Bearing Strength at Bolt Holes

*AISC Eq. J3-6a (crushing): $\phi_f(2.4 F_u d_b t)$ &nbsp;|&nbsp; AISC Eq. J3-6c (bearing): $\phi_f(1.2 F_u L_c t)$*

The lesser of bearing and crushing controls at each bolt location. Clear distances: $L_{c1} = L_e - d_h/2$ (edge bolt), $L_{c2} = s_{spacing} - d_h$ (interior bolt), where $d_h = d_b + 1/16 = 1.0625$ in.

### 5.1 Main Member — Shear Direction (y)

$$
L_{c1} = L_e - d_h/2 = 1.25 - 1.0625/2 = 0.71875 \text{ in}
$$

$$
L_{c2} = s - d_h = 3.0 - 1.0625 = 1.93750 \text{ in}
$$

$$
\text{Edge bearing} = \phi_f(1.2 F_u)L_{c1} t = (0.75)(1.2)(65)(0.71875)(0.295) = 12.4038 \text{ k}
$$

$$
\text{Edge crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(65)(1.0)(0.295) = 34.5150 \text{ k}
$$

Edge bolt controls: **BEARING** &nbsp;→&nbsp; $12.4038$ k

$$
\text{Typical bearing} = \phi_f(1.2 F_u)L_{c2} t = (0.75)(1.2)(65)(1.93750)(0.295) = 33.4364 \text{ k}
$$

$$
\text{Typical crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(65)(1.0)(0.295) = 34.5150 \text{ k}
$$

Typical bolt controls: **BEARING** &nbsp;→&nbsp; $33.4364$ k

$$
\phi R_n = \min(B_1,C_1) + (n-1)\min(B_2,C_2) = 12.4038 + (3-1)(33.4364) = 79.2766 \text{ k}
$$

> **GOOD** &nbsp; **Shear Bearing — MM  (vs V)** &nbsp;|&nbsp; Capacity = 79.277 k &nbsp;≥&nbsp; Demand = 20.000 k

### 5.2 Side Member — Shear Direction (y)

$$
L_{c1} = L_e - d_h/2 = 1.25 - 1.0625/2 = 0.71875 \text{ in}
$$

$$
L_{c2} = s - d_h = 3.0 - 1.0625 = 1.93750 \text{ in}
$$

$$
\text{Edge bearing} = \phi_f(1.2 F_u)L_{c1} t = (0.75)(1.2)(58)(0.71875)(0.5) = 18.7594 \text{ k}
$$

$$
\text{Edge crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(58)(1.0)(0.5) = 52.2000 \text{ k}
$$

Edge bolt controls: **BEARING** &nbsp;→&nbsp; $18.7594$ k

$$
\text{Typical bearing} = \phi_f(1.2 F_u)L_{c2} t = (0.75)(1.2)(58)(1.93750)(0.5) = 50.5687 \text{ k}
$$

$$
\text{Typical crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(58)(1.0)(0.5) = 52.2000 \text{ k}
$$

Typical bolt controls: **BEARING** &nbsp;→&nbsp; $50.5687$ k

$$
\phi R_n = \min(B_1,C_1) + (n-1)\min(B_2,C_2) = 18.7594 + (3-1)(50.5687) = 119.8969 \text{ k}
$$

> **GOOD** &nbsp; **Shear Bearing — SM  (vs V)** &nbsp;|&nbsp; Capacity = 119.897 k &nbsp;≥&nbsp; Demand = 20.000 k

### 5.3 Main Member — Axial Direction (x)

$$
L_{c1} = L_e - d_h/2 = 1.25 - 1.0625/2 = 0.71875 \text{ in}
$$

$$
L_{c2} = s - d_h = 3.0 - 1.0625 = 1.93750 \text{ in}
$$

$$
\text{Edge bearing} = \phi_f(1.2 F_u)L_{c1} t = (0.75)(1.2)(65)(0.71875)(0.295) = 12.4038 \text{ k}
$$

$$
\text{Edge crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(65)(1.0)(0.295) = 34.5150 \text{ k}
$$

Edge bolt controls: **BEARING** &nbsp;→&nbsp; $12.4038$ k

$$
\text{Typical bearing} = \phi_f(1.2 F_u)L_{c2} t = (0.75)(1.2)(65)(1.93750)(0.295) = 33.4364 \text{ k}
$$

$$
\text{Typical crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(65)(1.0)(0.295) = 34.5150 \text{ k}
$$

Typical bolt controls: **BEARING** &nbsp;→&nbsp; $33.4364$ k

$$
\phi R_n = \min(B_1,C_1) + (n-1)\min(B_2,C_2) = 12.4038 + (1-1)(33.4364) = 12.4038 \text{ k}
$$

> **GOOD** &nbsp; **Axial Bearing — MM  (vs P)** &nbsp;|&nbsp; Capacity = 12.404 k &nbsp;≥&nbsp; Demand = 0.000 k

### 5.4 Side Member — Axial Direction (x)

$$
L_{c1} = L_e - d_h/2 = 1.25 - 1.0625/2 = 0.71875 \text{ in}
$$

$$
L_{c2} = s - d_h = 3.0 - 1.0625 = 1.93750 \text{ in}
$$

$$
\text{Edge bearing} = \phi_f(1.2 F_u)L_{c1} t = (0.75)(1.2)(58)(0.71875)(0.5) = 18.7594 \text{ k}
$$

$$
\text{Edge crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(58)(1.0)(0.5) = 52.2000 \text{ k}
$$

Edge bolt controls: **BEARING** &nbsp;→&nbsp; $18.7594$ k

$$
\text{Typical bearing} = \phi_f(1.2 F_u)L_{c2} t = (0.75)(1.2)(58)(1.93750)(0.5) = 50.5687 \text{ k}
$$

$$
\text{Typical crushing} = \phi_f(2.4 F_u)d_b t = (0.75)(2.4)(58)(1.0)(0.5) = 52.2000 \text{ k}
$$

Typical bolt controls: **BEARING** &nbsp;→&nbsp; $50.5687$ k

$$
\phi R_n = \min(B_1,C_1) + (n-1)\min(B_2,C_2) = 18.7594 + (1-1)(50.5687) = 18.7594 \text{ k}
$$

> **GOOD** &nbsp; **Axial Bearing — SM  (vs P)** &nbsp;|&nbsp; Capacity = 18.759 k &nbsp;≥&nbsp; Demand = 0.000 k

---

## 6. Bolt Failure

### 6.1 Bolt Shear Strength

*AISC Eq. J3-1. Single-bolt capacity $\phi r_n$ from AISC Table 7-1 (A325-N, single shear).*

$$
V_u = n_b \cdot \phi r_n = (3)(24.35) = 73.050 \text{ k}
$$

> **GOOD** &nbsp; **Bolt Shear  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 73.050 k &nbsp;≥&nbsp; Demand = 20.000 k

### 6.2 Slip-Critical Strength

*AISC Eq. J3-4. Class A surface, standard holes.*

| Symbol | Value | Description |
|--------|-------|-------------|
| $\phi$ | 1.0 | Std/short-slotted holes |
| $D_u$ | 1.13 | Bolt pretension factor |
| $\mu$ | 0.3 | Friction coefficient, Class A |
| $h_f$ | 1.0 | Filler plate factor |
| $T_b$ | 51 | Min. fastener pretension (k), AISC Table J3.1 |
| $N_s$ | 1 | Number of shearing planes |

$$
V_u = n_b \phi D_u \mu h_f T_b N_s = (3)(1.0)(1.13)(0.3)(1.0)(51)(1) = 51.867 \text{ k}
$$

> **GOOD** &nbsp; **Slip-Critical  (vs max(P,V))** &nbsp;|&nbsp; Capacity = 51.867 k &nbsp;≥&nbsp; Demand = 20.000 k

---

## 7. Weld Sizing — Plate to Column

*AISC Eq. J2-3. E70 SMAW electrode, fillet weld both sides of plate.*

| Symbol | Value | Unit | Description |
|--------|-------|------|-------------|
| $\phi$ | 0.75 | — | LRFD shear resistance factor |
| $F_{EXX}$ | 70 | ksi | Electrode strength (E70) |
| $D_{min}$ | 0.1875" | in | Min. weld size, AISC Table J2-4 |

$$
L_w = 2[2L_{ey} + (n_{bolts}-1)g] = 2[2(1.25) + (1-1)(3.0)] = 17.0000 \text{ in}
$$

$$
D_{req} = \frac{V}{L_w \cdot \frac{1}{\sqrt{2}} \cdot 0.6 F_{EXX} \cdot \phi} = \frac{20}{17.0000 \cdot \frac{1}{\sqrt{2}} \cdot 0.6(70)(0.75)} = 0.052818 \text{ in}
$$

$D_{req} = 0.052818$" &nbsp;<&nbsp; $D_{min} = 0.1875$" &nbsp;→&nbsp; Use $D_{min}$ per AISC Table J2-4

$$
D_w = D_{min} = 0.1875 \text{ in} = \frac{3}{16}\text{" weld}
$$

> **GOOD** &nbsp; **Weld Size Check** &nbsp;|&nbsp; $D_w = 0.1875$" &nbsp;≥&nbsp; $D_{min} = 0.1875$"

---

## Summary of All Checks

| # | Check | Capacity (k) | Demand (k) | Result |
|---|-------|:------------:|:----------:|:------:|
| 1 | Available Space | 14.236 | 8.500 | GOOD |
| 2.1 | MM Yield  (vs max(P,V)) | 477.000 | 20.000 | GOOD |
| 2.2 | SM Yield — shear  (vs V) | 137.700 | 20.000 | GOOD |
| 2.3 | SM Yield — axial  (vs P) | 40.500 | 0.000 | GOOD |
| 3.1 | SM Fracture  (vs max(P,V)) | 160.406 | 20.000 | GOOD |
| 3.2 | MM Fracture  (vs max(P,V)) | 438.000 | 20.000 | GOOD |
| 4.1 | MM Block Shear  (vs max(P,V)) | 99.424 | 20.000 | GOOD |
| 4.2 | SM Block Shear — shear  (vs V) | 23.925 | 20.000 | GOOD |
| 4.3 | SM Block Shear — axial  (vs P) | 72.862 | 0.000 | GOOD |
| 5.1 | Shear Bearing — MM  (vs V) | 79.277 | 20.000 | GOOD |
| 5.2 | Shear Bearing — SM  (vs V) | 119.897 | 20.000 | GOOD |
| 5.3 | Axial Bearing — MM  (vs P) | 12.404 | 0.000 | GOOD |
| 5.4 | Axial Bearing — SM  (vs P) | 18.759 | 0.000 | GOOD |
| 6.1 | Bolt Shear  (vs max(P,V)) | 73.050 | 20.000 | GOOD |
| 6.2 | Slip-Critical  (vs max(P,V)) | 51.867 | 20.000 | GOOD |
| 7 | Weld Size | 0.188 | 0.188 | GOOD |

### — All checks pass — Connection is acceptable.

---

*Report generated by `shear_tab_calculator.py` — AISC Manual 16th Ed. (LRFD)*
