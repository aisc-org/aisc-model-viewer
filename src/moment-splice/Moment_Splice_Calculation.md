# Beam Moment Splice Connection — LRFD Calculation

**Specification:** AISC Steel Construction Manual, 16th Edition  
**Method:** Load and Resistance Factor Design (LRFD)  
**Bolt Type:** A325-N (threads not excluded from shear plane)

---

## Sample Structure

Two W16x40 girders with a 1.45klf load are spliced together. The total girder length is 30ft and designed to be pin-pin. The splice occurs 10ft from the end of the girder. There is a moment and shear at the point of connection in the girder, so they are both design considerations.

---

## Member Information

| Parameter | Value | Units |
|-----------|-------|-------|
| Section | W16x40 | — |
| Depth, d | 16.0 | in |
| Flange width, b_f | 7.0 | in |
| Flange thickness, t_f | 0.505 | in |
| Web thickness, t_w | 0.305 | in |
| Gross area, A | 11.8 | in² |

---

## Input Parameters

### Material Properties

| Parameter | Symbol | Value | Units | Description |
|-----------|--------|-------|-------|-------------|
| Ultimate strength, plates (A36) | F_u,p | 58 | ksi | Splice plates |
| Ultimate strength, member (A992) | F_u,mm | 65 | ksi | W16x40 |
| Yield strength, plates (A36) | F_y,p | 36 | ksi | Splice plates |
| Yield strength, member (A992) | F_y,mm | 50 | ksi | W16x40 |
| Bolt tensile strength (A325) | F_nt | 90 | ksi | AISC Table J3.2 |
| Bolt shear strength (A325) | F_nv | 54 | ksi | AISC Table J3.2 |

### LRFD Resistance Factors

| Symbol | Value | Limit State |
|--------|-------|-------------|
| phi_y | 0.9 | Yielding |
| phi_f | 0.75 | Fracture |
| phi_bs | 0.75 | Block shear |
| phi_w | 0.75 | Welds |
| phi_bolt | 0.75 | Bolt shear / bearing |

### Applied Loads

| Load | Symbol | Value | Units |
|------|--------|-------|-------|
| Factored moment | M_u | 145 | k-ft |
| Factored shear | V_u | 7.25 | k |

### Web Plate Geometry

| Parameter | Symbol | Value | Units |
|-----------|--------|-------|-------|
| Edge distance, x | L_ex | 1.5 | in |
| Edge distance, y | L_ey | 1.5 | in |
| Bolt gage | g | 3.0 | in |
| Bolt rows | n_rows | 4 | — |
| Bolts per row (per side) | n_bolts | 1 | — |
| Plate height | h | 12.0 | in |
| Plate width | w | 6.5 | in |
| Plate thickness | t_p | 0.5 | in |
| Bolt diameter | d_b | 0.75 | in |

### Flange Plate Geometry

| Parameter | Symbol | Value | Units |
|-----------|--------|-------|-------|
| Edge distance, x | L_ex | 1.5 | in |
| Edge distance, y | L_ey | 1.75 | in |
| Bolt spacing, x | s | 3.0 | in |
| Bolt gage | g | 3.5 | in |
| Bolt rows (per side) | n_rows | 3 | — |
| Bolts per row | n_bolts | 2 | — |
| Plate length | l | 18.0 | in |
| Plate width | w | 7.0 | in |
| Plate thickness | t_p | 0.5 | in |
| Bolt diameter | d_b | 0.75 | in |

---

## Derived Quantities

The moment demand is converted to an equivalent axial force in the flange plates:

$$
F_m = \\frac{M_u}{d} = \\frac{145 \\text{k-ft} \\times 12}{16.0 \\text{in}}
= 108.750 \text{ k}
$$

Gross areas of the splice plates:

$$
A_{g,wp} = t_p \times h = 0.5 \times 12.0 = 6.000 \text{ in}^2
$$

$$
A_{g,fp} = t_p \times l = 0.5 \times 18.0 = 9.000 \text{ in}^2
$$

---

## 1. Flange Plates — Yielding

This section checks whether the flange splice plates and the main member flanges have sufficient gross cross-sectional area to carry the axial force F_m without yielding. The available tensile yield strength is phi_y * F_y * A_g.

### 1a. Main Member Flange Yielding

The resisting area is the flange gross area: A_g = b_f * t_f.

$$
\phi P_n = \phi_y \cdot F_{y,mm} \cdot b_f \cdot t_f
$$

$$
= 0.9 \times 50 \text{ ksi} \times 7.0 \text{ in} \times 0.505 \text{ in}
= 159.075 \text{ k}
$$

*AISC Eq. D2-1*

Demand: F_m = 108.750 k     Capacity: 159.075 k     **GOOD**

### 1b. Flange Plate Yielding

$$
\phi P_n = \phi_y \cdot F_{y,p} \cdot A_{g,fp}
$$

$$
= 0.9 \times 36 \text{ ksi} \times 9.000 \text{ in}^2
= 291.600 \text{ k}
$$

*AISC Eq. D2-1*

Demand: F_m = 108.750 k     Capacity: 291.600 k     **GOOD**

---

## 2. Flange Plates — Net Section Fracture

Net section fracture occurs through the bolt holes. Holes are punched or drilled and are treated as (d_b + 1/8 in) wide per AISC Section B4.3. For the main member, the shear lag factor U is applied because the force is transferred through the flanges only, not the full section.

### 2a. Flange Plate Net Fracture

Net area of the splice plate:

$$
A_e = A_g - n_{bolts} \cdot (d_b + \tfrac{1}{8}) \cdot t_p
$$

$$
= 9.000 - 2 \times (0.75 + 0.125) \times 0.5
= 8.125 \text{ in}^2
$$

*AISC Eq. D3-1*

Available fracture strength:

$$
\phi P_n = \phi_f \cdot F_{u,p} \cdot A_e
$$

$$
= 0.75 \times 58 \text{ ksi} \times 8.125 \text{ in}^2
= 353.438 \text{ k}
$$

*AISC Eq. D2-2*

Demand: F_m = 108.750 k     Capacity: 353.438 k     **GOOD**

### 2b. Main Member Flange Net Fracture (with Shear Lag)

Net flange area:

$$
A_n = b_f \cdot t_f - n_{bolts} \cdot (d_b + \tfrac{1}{8}) \cdot t_f
$$

$$
= 7.0 \times 0.505 - 2 \times (0.75 + 0.125) \times 0.505
= 2.65125 \text{ in}^2
$$

*AISC Eq. D3-1*

Shear lag factor (Case 2, W-shape, connected through flange only):

$$
U = 1 - \frac{\bar{x}}{L} \quad \text{where } L = (n_{rows}-1) \cdot s
$$

$$
L = (3 - 1) \times 3.0 = 6.000 \text{ in}
$$

$$
U = 1 - \frac{0.8125}{6.000} = 0.86458
$$

*AISC Table D3.1*

Effective net area:

$$
A_e = A_n \cdot U
$$

$$
= 2.65125 \times 0.86458 = 2.29223 \text{ in}^2
$$

*AISC Eq. D3-1*

Available fracture strength:

$$
\phi P_n = \phi_f \cdot F_{u,mm} \cdot A_e
$$

$$
= 0.75 \times 65 \text{ ksi} \times 2.29223 \text{ in}^2
= 111.746 \text{ k}
$$

*AISC Eq. D2-2*

Demand: F_m = 108.750 k     Capacity: 111.746 k     **GOOD**

---

## 3. Flange Bolts — Shear

The bolt group transfers the flange force F_m via shear. Bolt strength is taken directly from AISC Table 7-1 for A325-N bolts in double shear. The total capacity is the number of bolts times the single-bolt available strength.

$$
\phi R_n = n_b \cdot \phi r_n \quad n_b = n_{rows} \times n_{bolts}
$$

$$
= (3 \times 2) \times 35.8 \text{ k/bolt}
= 214.800 \text{ k}
$$

*AISC Eq. J3-1, J3-2; AISC Table 7-1*

Demand: F_m = 108.750 k     Capacity: 214.800 k     **GOOD**

---

## 4. Flange Plate Bearing

Bearing (or tearout) is checked at the bolt holes. Two mechanisms are compared at each bolt location: bearing deformation of the plate material (1.2·L_c·t·F_u) and tearout of the plate edge (2.4·d_b·t·F_u). The lesser controls at each bolt. One edge bolt and (n_rows - 1) interior bolts act on each side, and two plates act simultaneously.

### 4a. Flange Splice Plates

Clear distances:

$$
L_{c1} = L_{ey} - \frac{d_b + \tfrac{1}{16}}{2}
= 1.75 - \frac{0.75 + 0.0625}{2} = 1.34375 \text{ in}
$$

$$
L_{c2} = g - (d_b + \tfrac{1}{16})
= 3.5 - (0.75 + 0.0625) = 2.68750 \text{ in}
$$

*AISC Section J3.10*

Edge bolt — bearing and tearout:

$$
\phi r_{n,B1} = \phi \cdot 1.2 \cdot F_{u,p} \cdot L_{c1} \cdot t_p
= 0.75 \times 1.2 \times 58 \times 1.34375 \times 0.5
= 35.072 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T1} = \phi \cdot 2.4 \cdot F_{u,p} \cdot d_b \cdot t_p
= 0.75 \times 2.4 \times 58 \times 0.75 \times 0.5
= 39.150 \text{ k}
$$

*AISC Eq. J3-6a*

Edge bolt controls: BEARING, phi_r_n1 = 35.072 k

Interior bolt — bearing and tearout:

$$
\phi r_{n,B2} = \phi \cdot 1.2 \cdot F_{u,p} \cdot L_{c2} \cdot t_p
= 0.75 \times 1.2 \times 58 \times 2.68750 \times 0.5
= 70.144 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T2} = \phi \cdot 2.4 \cdot F_{u,p} \cdot d_b \cdot t_p
= 0.75 \times 2.4 \times 58 \times 0.75 \times 0.5
= 39.150 \text{ k}
$$

*AISC Eq. J3-6a*

Interior bolt controls: TEAROUT, phi_r_n2 = 39.150 k

Total bearing capacity (two plates, double shear):

$$
\phi R_n = \phi r_{n1} + (n_{rows}-1) \cdot \phi r_{n2} \cdot 2
$$

$$
= 35.072 + (3-1) \times 39.150 \times 2
= 191.672 \text{ k}
$$

*AISC Eq. J3-6*

Demand: F_m = 108.750 k     Capacity: 191.672 k     **GOOD**

### 4b. Main Member Flange Bearing

Same clear distances L_c1 and L_c2 apply; plate thickness replaced by t_f, F_u replaced by F_u,mm.

$$
\phi r_{n,B1} = \phi \cdot 1.2 \cdot F_{u,mm} \cdot L_{c1} \cdot t_f
= 0.75 \times 1.2 \times 65 \times 1.34375 \times 0.505
= 39.698 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T1} = \phi \cdot 2.4 \cdot F_{u,mm} \cdot d_b \cdot t_f
= 0.75 \times 2.4 \times 65 \times 0.75 \times 0.505
= 44.314 \text{ k}
$$

*AISC Eq. J3-6a*

Edge bolt controls: BEARING, phi_r_n1 = 39.698 k

$$
\phi r_{n,B2} = \phi \cdot 1.2 \cdot F_{u,mm} \cdot L_{c2} \cdot t_f
= 0.75 \times 1.2 \times 65 \times 2.68750 \times 0.505
= 79.395 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T2} = \phi \cdot 2.4 \cdot F_{u,mm} \cdot d_b \cdot t_f
= 0.75 \times 2.4 \times 65 \times 0.75 \times 0.505
= 44.314 \text{ k}
$$

*AISC Eq. J3-6a*

Interior bolt controls: TEAROUT, phi_r_n2 = 44.314 k

Total bearing capacity (single flange, one shear plane per bolt):

$$
\phi R_n = \phi r_{n1} + (n_{rows}-1) \cdot \phi r_{n2}
$$

$$
= 39.698 + (3-1) \times 44.314
= 128.325 \text{ k}
$$

*AISC Eq. J3-6*

Demand: F_m = 108.750 k     Capacity: 128.325 k     **GOOD**

---

## 5. Web Plate — Gross Shear Yielding

The web plates resist the factored shear V_u. Shear yielding strength is 0.6·F_y·A_g per AISC Section J4.2, with two plates acting in parallel.

$$
\phi V_n = \phi_y \cdot 0.6 \cdot F_{y,p} \cdot A_{g,wp} \cdot 2
$$

$$
= 0.9 \times 0.6 \times 36 \text{ ksi} \times 6.000 \text{ in}^2 \times 2
= 233.280 \text{ k}
$$

*AISC Eq. D2-1 / J4-3*

Demand: V_u = 7.25 k     Capacity: 233.280 k     **GOOD**

---

## 6. Web Plate — Net Section Fracture

Net area accounts for the bolt holes. The 0.6 factor converts tensile fracture strength to shear fracture strength. Two plates act together.

$$
A_e = A_{g,wp} - n_{bolts} \cdot (d_b + \tfrac{1}{8}) \cdot t_p
$$

$$
= 6.000 - 1 \times (0.75 + 0.125) \times 0.5
= 5.5625 \text{ in}^2
$$

*AISC Eq. D3-1*

$$
\phi V_n = \phi_f \cdot 0.6 \cdot F_{u,mm} \cdot A_e \cdot 2
$$

$$
= 0.75 \times 0.6 \times 65 \text{ ksi} \times 5.5625 \text{ in}^2 \times 2
= 325.406 \text{ k}
$$

*AISC Eq. D2-2*

Demand: V_u = 7.25 k     Capacity: 325.406 k     **GOOD**

---

## 7. Web Bolts — Shear

The web bolt group transfers the shear V_u. Bolt strength is taken from AISC Table 7-1 for A325-N bolts in double shear.

$$
\phi R_n = n_b \cdot \phi r_n \quad n_b = n_{rows} \times n_{bolts}
$$

$$
= (4 \times 1) \times 35.8 \text{ k/bolt}
= 143.200 \text{ k}
$$

*AISC Eq. J3-1, J3-2; AISC Table 7-1*

Demand: V_u = 7.25 k     Capacity: 143.200 k     **GOOD**

---

## 8. Web Plate Bearing

Bearing and tearout are checked at the web plate bolt holes. Two web plates act simultaneously. The controlling mechanism at each bolt location is the lesser of bearing and tearout.

### 8a. Web Splice Plates

Clear distances:

$$
L_{c1} = L_{ey} - \frac{d_b + \tfrac{1}{16}}{2}
= 1.5 - \frac{0.75 + 0.0625}{2} = 1.09375 \text{ in}
$$

$$
L_{c2} = g - (d_b + \tfrac{1}{16})
= 3.0 - (0.75 + 0.0625) = 2.18750 \text{ in}
$$

*AISC Section J3.10*

$$
\phi r_{n,B1} = \phi \cdot 1.2 \cdot F_{u,p} \cdot L_{c1} \cdot t_p
= 0.75 \times 1.2 \times 58 \times 1.09375 \times 0.5
= 28.547 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T1} = \phi \cdot 2.4 \cdot F_{u,p} \cdot d_b \cdot t_p
= 0.75 \times 2.4 \times 58 \times 0.75 \times 0.5
= 39.150 \text{ k}
$$

*AISC Eq. J3-6a*

Edge bolt controls: BEARING, phi_r_n1 = 28.547 k

$$
\phi r_{n,B2} = \phi \cdot 1.2 \cdot F_{u,p} \cdot L_{c2} \cdot t_p
= 0.75 \times 1.2 \times 58 \times 2.18750 \times 0.5
= 57.094 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T2} = \phi \cdot 2.4 \cdot F_{u,p} \cdot d_b \cdot t_p
= 0.75 \times 2.4 \times 58 \times 0.75 \times 0.5
= 39.150 \text{ k}
$$

*AISC Eq. J3-6a*

Interior bolt controls: TEAROUT, phi_r_n2 = 39.150 k

Total bearing capacity (two plates, double shear):

$$
\phi R_n = \phi r_{n1} + (n_{rows}-1) \cdot \phi r_{n2} \cdot 2
$$

$$
= 28.547 + (4-1) \times 39.150 \times 2
= 263.447 \text{ k}
$$

*AISC Eq. J3-6*

Demand: V_u = 7.25 k     Capacity: 263.447 k     **GOOD**

### 8b. Main Member Web Bearing

Plate thickness replaced by t_w, F_u replaced by F_u,mm.

$$
\phi r_{n,B1} = \phi \cdot 1.2 \cdot F_{u,mm} \cdot L_{c1} \cdot t_w
= 0.75 \times 1.2 \times 65 \times 1.09375 \times 0.305
= 19.515 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T1} = \phi \cdot 2.4 \cdot F_{u,mm} \cdot d_b \cdot t_w
= 0.75 \times 2.4 \times 65 \times 0.75 \times 0.305
= 26.764 \text{ k}
$$

*AISC Eq. J3-6a*

Edge bolt controls: BEARING, phi_r_n1 = 19.515 k

$$
\phi r_{n,B2} = \phi \cdot 1.2 \cdot F_{u,mm} \cdot L_{c2} \cdot t_w
= 0.75 \times 1.2 \times 65 \times 2.18750 \times 0.305
= 39.030 \text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi r_{n,T2} = \phi \cdot 2.4 \cdot F_{u,mm} \cdot d_b \cdot t_w
= 0.75 \times 2.4 \times 65 \times 0.75 \times 0.305
= 26.764 \text{ k}
$$

*AISC Eq. J3-6a*

Interior bolt controls: TEAROUT, phi_r_n2 = 26.764 k

Total bearing capacity (one web, one shear plane per bolt):

$$
\phi R_n = \phi r_{n1} + (n_{rows}-1) \cdot \phi r_{n2}
$$

$$
= 19.515 + (4-1) \times 26.764
= 99.806 \text{ k}
$$

*AISC Eq. J3-6*

Demand: V_u = 7.25 k     Capacity: 99.806 k     **GOOD**

---

## 9. Block Shear — Web Plates

Block shear is a failure mode combining shear rupture along one or more planes and tension rupture on a perpendicular plane. AISC Eq. J4-5 takes the minimum of two limiting states: fracture on both planes, or shear yielding combined with tension fracture.

Net shear area:

$$
A_{nv} = \bigl[g(n_{rows}-1) - (0.5\,d_b + \tfrac{1}{8})\bigr]\,t_p + L_{ey}\,t_p
$$

$$
= \bigl[3.0(4-1) - (0.5 \times 0.75 + 0.125)\bigr] \times 0.5 + 1.5 \times 0.5
= 5.0000 \text{ in}^2
$$

Net tension area:

$$
A_{nt} = 2\,L_{ex}\,t_p - (d_b + \tfrac{1}{8})\,t_p
$$

$$
= 2 \times 1.5 \times 0.5 - (0.75 + 0.125) \times 0.5
= 1.0625 \text{ in}^2
$$

Gross shear area:

$$
A_{gv} = t_p \cdot g \cdot (n_{rows}-1)
$$

$$
= 0.5 \times 3.0 \times (4-1) = 4.5000 \text{ in}^2
$$

Block shear strength (U_bs = 1, uniform tension):

$$
R_n = \min\!\bigl(0.6\,F_u\,A_{nv} + U_{bs}\,F_u\,A_{nt},\; 0.6\,F_y\,A_{gv} + U_{bs}\,F_u\,A_{nt}\bigr)
$$

$$
\text{Option 1: } 0.6 \times 58 \times 5.0000 + 1 \times 58 \times 1.0625 = 235.625 \text{ k}
$$

$$
\text{Option 2: } 0.6 \times 36 \times 4.5000 + 1 \times 58 \times 1.0625 = 158.825 \text{ k}
$$

$$
R_n = \min(235.625,\; 158.825) = 158.825 \text{ k}
$$

*AISC Eq. J4-5*

Demand: V_u = 7.25 k     Capacity: 158.825 k     **GOOD**

---

## 10. Block Shear — Flange Plates

Block shear on the flange splice plate is checked with the flange axial force F_m as the demand. The geometry uses the flange plate bolt pattern.

Net shear area:

$$
A_{nv} = \bigl[g(n_{rows}-1) - (0.5(n_{rows}-1)\,d_b + \tfrac{1}{8})\bigr]\,t_p + L_{ey}\,t_p
$$

$$
= \bigl[3.5(3-1) - (0.5 \times 2 \times 0.75 + 0.125)\bigr] \times 0.5 + 1.75 \times 0.5
= 3.9375 \text{ in}^2
$$

Net tension area:

$$
A_{nt} = 2\,L_{ex}\,t_p - (d_b + \tfrac{1}{8})\,t_p
$$

$$
= 2 \times 1.5 \times 0.5 - (0.75 + 0.125) \times 0.5
= 1.0625 \text{ in}^2
$$

Gross shear area:

$$
A_{gv} = t_p \cdot g \cdot (n_{rows}-1)
$$

$$
= 0.5 \times 3.5 \times (3-1) = 3.5000 \text{ in}^2
$$

Block shear strength (U_bs = 1, uniform tension):

$$
R_n = \min\!\bigl(0.6\,F_u\,A_{nv} + U_{bs}\,F_u\,A_{nt},\; 0.6\,F_y\,A_{gv} + U_{bs}\,F_u\,A_{nt}\bigr)
$$

$$
\text{Option 1: } 0.6 \times 58 \times 3.9375 + 1 \times 58 \times 1.0625 = 198.650 \text{ k}
$$

$$
\text{Option 2: } 0.6 \times 36 \times 3.5000 + 1 \times 58 \times 1.0625 = 137.225 \text{ k}
$$

$$
R_n = \min(198.650,\; 137.225) = 137.225 \text{ k}
$$

*AISC Eq. J4-5*

Demand: F_m = 108.750 k     Capacity: 137.225 k     **GOOD**

---

## Summary of All Design Checks

| # | Check | Capacity (k) | Demand (k) | Reference | Result |
|---|-------|-------------|------------|-----------|--------|
| 1a | MM Flange Yielding | 159.075 | 108.750 | AISC D2-1 | GOOD |
| 1b | Flange Plate Yielding | 291.600 | 108.750 | AISC D2-1 | GOOD |
| 2a | Flange Plate Net Fracture | 353.438 | 108.750 | AISC D2-2 | GOOD |
| 2b | MM Flange Net Fracture | 111.746 | 108.750 | AISC D2-2 | GOOD |
| 3 | Flange Bolt Shear | 214.800 | 108.750 | AISC J3-1 | GOOD |
| 4a | Flange Plate Bearing | 191.672 | 108.750 | AISC J3-6 | GOOD |
| 4b | MM Flange Bearing | 128.325 | 108.750 | AISC J3-6 | GOOD |
| 5 | Web Plate Gross Yielding | 233.280 | 7.250 | AISC J4-3 | GOOD |
| 6 | Web Plate Net Fracture | 325.406 | 7.250 | AISC D2-2 | GOOD |
| 7 | Web Bolt Shear | 143.200 | 7.250 | AISC J3-1 | GOOD |
| 8a | Web Plate Bearing | 263.447 | 7.250 | AISC J3-6 | GOOD |
| 8b | MM Web Bearing | 99.806 | 7.250 | AISC J3-6 | GOOD |
| 9 | Web Plate Block Shear | 158.825 | 7.250 | AISC J4-5 | GOOD |
| 10 | Flange Plate Block Shear | 137.225 | 108.750 | AISC J4-5 | GOOD |

**OVERALL RESULT: ALL CHECKS PASS — CONNECTION IS ACCEPTABLE**
