# Column Splice Connection — Worked Calculation

All calculation steps, values, and equations per AISC Steel Construction Manual, 16th Edition. Bolts are assumed to be A325 (N) type to be conservative.

## Sample Structure

A short 5ft W12x53 column is connected to an existing W12x96 column during a remodel. There is a 1kip lateral point load at the top of the beam in the x-axis from the girder framing into it, and a 120kip gravity load acting axially. The column braced against weak axis bending. The connection transfers the moment to the lower column, so gravity, lateral shear, and moment in the strong axis are design considerations. 

## Member Information

| Parameter | Value |
|---|---|
| Upper main member | W12x53 |
| Lower main member | W12x96 |
| Plate material (A36) | Fy = 36 ksi, Fu = 58 ksi |
| Main member (A992) | Fy = 50 ksi, Fu = 65 ksi |
| Bolts (A325-N) | Fnt = 90 ksi, Fnv = 54 ksi |
| Weld electrode | E70 SMAW (Fexx = 70 ksi) |

## 1. Inputs

### 1.1 Material Properties

| Symbol | Value | Units | Description |
|---|---|---|---|
| $F_u$ (plate) | 58 | ksi | Ultimate strength of plate material (A36) |
| $F_u$ (main)  | 65  | ksi | Ultimate strength of main member (A992) |
| $F_y$ (plate) | 36 | ksi | Yield strength of plate material (A36) |
| $F_y$ (main)  | 50  | ksi | Yield strength of main member (A992) |
| $F_{nt}$ bolt | 90 | ksi | Tensile strength of A325 bolt (Table J3.2) |
| $F_{nv}$ bolt | 54 | ksi | Shear strength of A325 bolt (Table J3.2) |
| $E$ | 29000 | ksi | Modulus of elasticity |

### 1.2 LRFD Resistance Factors

| Symbol | Value | Description |
|---|---|---|
| $\phi_y$ | 0.9 | Yielding |
| $\phi_f$ | 0.75 | Fracture |
| $\phi_{bs}$ | 0.75 | Block shear |
| $\phi_w$ | 0.75 | Welds |
| $\phi_{bolt}$ | 0.75 | Bolt shear, bearing, tearout, tension |

### 1.3 Applied Loads

| Symbol | Value | Units | Description |
|---|---|---|---|
| $M$ | 5 | kft | Max moment (strong axis) |
| $P$ | 120 | k | Axial force |
| $V$ | 1 | k | Max shear (strong axis) |
| Uplift | 0 | k | Uplift force |

### 1.4 Main Member Properties (AISC Manual Table 1-1)

**Upper — W12x53**

| Symbol | Value | Units |
|---|---|---|
| $A_g$ | 15.6 | in² |
| $t_f$ | 0.575 | in |
| $t_w$ | 0.345 | in |
| $d$ | 12.1 | in |
| $b_f$ | 10.0 | in |
| $\bar{x}$ (k1) | 0.9375 | in |

**Lower — W12x96**

| Symbol | Value | Units |
|---|---|---|
| $k$ | 1.5 | in |
| $d$ | 12.7 | in |
| $t_f$ | 0.9 | in |
| $b_f$ | 12.2 | in |

### 1.5 Web Plate Geometry

| Symbol | Value | Units |
|---|---|---|
| $L_{ex}$ | 1.75 | in |
| $L_{ey}$ | 2.0 | in |
| $s$ (x-spacing) | 5.0 | in |
| $g$ (y-gage) | 3.0 | in |
| $n_{rows}$ | 2 | — |
| $n_{bolts}$ | 2 | — |
| $h$ | 15.0 | in |
| $w$ | 8.5 | in |
| $t_p$ | 0.5 | in |
| $d_b$ | 0.75 | in |

### 1.6 Flange Plate Geometry

| Symbol | Value | Units |
|---|---|---|
| $L_{ex}$ | 1.25 | in |
| $L_{ey}$ | 2.0 | in |
| $s$ (x-spacing) | 5.5 | in |
| $g$ (y-gage) | 3.0 | in |
| $n_{rows}$ | 2 | — |
| $n_{bolts}$ | 2 | — |
| $h$ | 16.0 | in |
| $w$ | 8.0 | in |
| $t_p$ | 0.5 | in |
| $d_b$ | 0.75 | in |

### 1.7 Weld and Bearing Inputs

| Symbol | Value | Units | Description |
|---|---|---|---|
| $F_{exx}$ | 70 | ksi | E70 electrode |
| $\phi_w$ | 0.75 | — | Weld resistance factor |
| $D_{min}$ | 0.1875 | in | Minimum fillet size (Table J2.4) |
| $A_{pb}$ | 11.46 | in² | Projected bearing area |

## 2. Derived Quantities

Moment-induced flange force (kft converted via $d$ in inches):

$$
F_m = \dfrac{M}{d_{lower}/12} = \dfrac{5}{12.7/12} = 4.7244\ \text{k}
$$

*AISC Manual Part 12 — Column Splices*

Web plate gross area:

$$
A_{g,wp} = t_p \cdot w = 0.5 \cdot 8.5 = 4.250\ \text{in}^2
$$

*AISC Eq. D2-1 (basis for $A_g$)*

Web plate net area:

$$
A_{n,wp} = (w - n_{bolts}(d_b + \tfrac{1}{8})) \cdot t_p = (8.5 - 2(0.75+\tfrac{1}{8})) \cdot 0.5 = 3.375\ \text{in}^2
$$

*AISC Section B4.3b*

Flange plate gross area:

$$
A_{g,fp} = t_p \cdot w = 0.5 \cdot 8.0 = 4.000\ \text{in}^2
$$

*AISC Eq. D2-1 (basis for $A_g$)*

## 3. Flange Plate Tension Yielding

Checks whether the main member flange and the flange plates can develop the applied tension without yielding on their gross section.

### 3.1 Main Member Yield (per flange plate area)

$$
\phi R_n = \phi_y F_{y,main} A_{g,fp} = 0.9 \cdot 50 \cdot 4.0 = 180.000\ \text{k}
$$

*AISC Eq. D2-1*

Demand $= \max(F_m,\ U\!plift) = \max(4.7244,\ 0) = 4.7244$ k

Result: **GOOD**

### 3.2 Flange Plate Yielding (two plates)

$$
\phi R_n = \phi_y F_{y,plate} A_{g,fp} \cdot 2 = 0.9 \cdot 36 \cdot 4.0 \cdot 2 = 259.200\ \text{k}
$$

*AISC Eq. D2-1*

Demand $= \max(F_m,\ U\!plift) = 4.7244$ k

Result: **GOOD**

## 4. Tensile Net Rupture

Checks whether the plates and the main member can develop the tension load without rupturing on the net section through the bolt holes.

### 4.1 Flange Plate Net Rupture (two plates)

Effective net area of each plate (shear lag factor $U=1$ for plates):

$$
A_e = A_{g,fp} - n_{bolts}(d_b+\tfrac{1}{8}) t_p = 4.0 - 2(0.75+\tfrac{1}{8}) \cdot 0.5 = 3.125\ \text{in}^2
$$

*AISC Section D3 ($A_e = A_n$ when $U = 1$)*

$$
\phi R_n = \phi_f F_{u,plate} A_e \cdot 2 = 0.75 \cdot 58 \cdot 3.125 \cdot 2 = 271.875\ \text{k}
$$

*AISC Eq. D2-2*

Demand $= \max(F_m,\ U\!plift) = 4.7244$ k

Result: **GOOD**

### 4.2 Main Member Net Rupture

Net area of the main member:

$$
A_n = A_{g,main} - n_{bolts}(d_b+\tfrac{1}{8}) t_w = 15.6 - 2(0.75+\tfrac{1}{8}) \cdot 0.345
 = 14.996\ \text{in}^2
$$

*AISC Section B4.3b*

Shear lag factor for W-shape (flange-only connection):

$$
U = 1 - \dfrac{\bar{x}}{L} = 1 - \dfrac{\bar{x}}{(n_{rows}-1)\,s} = 1 - \dfrac{0.9375}{(2-1) \cdot 5.5} = 0.8295
$$

*AISC Table D3.1 (Case 7 — W-shape, flange connection)*

$$
A_e = A_n \cdot U = 14.996 \cdot 0.8295 = 12.44\ \text{in}^2
$$

*AISC Eq. D3-1*

$$
\phi R_n = \phi_f F_{u,main} A_e = 0.75 \cdot 65 \cdot 12.44 = 606.453\ \text{k}
$$

*AISC Eq. D2-2*

Demand $= \max(F_m,\ U\!plift) = 4.7244$ k

Result: **GOOD**

## 5. Flange Plate — Bolt Group in Tension

Checks the bolt group on the flange plate side: bolt shear, plate bearing, and plate tearout at interior and exterior bolts. The governing strength is the minimum of the three at each bolt location, summed over all bolts.

Bolt shear per bolt:

$$
\phi r_n = F_{nv} \cdot \tfrac{\pi}{4} d_b^2 \cdot \phi_{bolt} = 54 \cdot \tfrac{\pi}{4} \cdot 0.75^2 \cdot 0.75 = 17.892\ \text{k/bolt}
$$

*AISC Eq. J3-1*

Plate bearing per bolt:

$$
\phi r_n = \phi_{bolt} \cdot 2.4\, d_b t_p F_u = 0.75 \cdot 2.4 \cdot 0.75 \cdot 0.5 \cdot 58 = 39.150\ \text{k/bolt}
$$

*AISC Eq. J3-6a*

Clear distance and tearout at interior bolts:

$$
l_{c1} = g - (d_b + \tfrac{1}{16}) = 3.0 - (0.75 + \tfrac{1}{16}) = 2.1875\ \text{in}
$$

*AISC Section J3.10*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c1} t_p F_u = 0.75 \cdot 1.2 \cdot 2.1875 \cdot 0.5 \cdot 58 = 57.094\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

Clear distance and tearout at exterior bolts:

$$
l_{c2} = L_{ey} - 0.5(d_b + \tfrac{1}{16}) = 2.0 - 0.5(0.75 + \tfrac{1}{16}) = 1.5938\ \text{in}
$$

*AISC Section J3.10*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c2} t_p F_u = 0.75 \cdot 1.2 \cdot 1.59375 \cdot 0.5 \cdot 58 = 41.597\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

Group capacity:

$$
\phi R_n = n_{bolts}\bigl[\min(\phi r_{ext}) + \min(\phi r_{int})(n_{rows}-1)\bigr] = 2\bigl[17.892 + 17.892(2-1)\bigr] = 71.569\ \text{k}
$$

*AISC Section J3 (bolt-group summation)*

Demand $= \max(F_m,\ U\!plift) = 4.7244$ k 
Utilization $= 0.0660$

Result: **GOOD**

## 6. Column Flange — Bolt Group in Tension

Same bolt-group check, but now on the main-member (column flange) side: bolt shear, column-flange bearing, and column-flange tearout.

Bolt shear per bolt (same as §5):

$$
\phi r_n = F_{nv}\tfrac{\pi}{4} d_b^2 \phi_{bolt} = 54 \cdot \tfrac{\pi}{4} \cdot 0.75^2 \cdot 0.75 = 17.892\ \text{k/bolt}
$$

*AISC Eq. J3-1*

Column-flange bearing:

$$
\phi r_n = \phi_{bolt} \cdot 2.4\, d_b t_{f,main} F_{u,main} = 0.75 \cdot 2.4 \cdot 0.75 \cdot 0.575 \cdot 65 = 50.456\ \text{k/bolt}
$$

*AISC Eq. J3-6a*

Tearout at interior bolts:

$$
l_{c1} = g - (d_b + \tfrac{1}{16}) = 3.0 - (0.75 + \tfrac{1}{16}) = 2.1875\ \text{in}
$$

*AISC Section J3.10*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c1} t_{f,main} F_{u,main} = 0.75 \cdot 1.2 \cdot 2.1875 \cdot 0.575 \cdot 65 = 73.582\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

Tearout at exterior bolts:

$$
l_{c2} = L_{ey} - 0.5(d_b + \tfrac{1}{16}) = 2.0 - 0.5(0.75 + \tfrac{1}{16}) = 1.5938\ \text{in}
$$

*AISC Section J3.10*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c2} t_{f,main} F_{u,main} = 0.75 \cdot 1.2 \cdot 1.59375 \cdot 0.575 \cdot 65 = 53.610\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

$$
\phi R_n = n_{bolts}\bigl[\min(\phi r_{ext}) + \min(\phi r_{int})(n_{rows}-1)\bigr] = 2\bigl[17.892 + 17.892(2-1)\bigr] = 71.569\ \text{k}
$$

*AISC Section J3*

Demand $= \max(F_m,\ U\!plift) = 4.7244$ k 
Utilization $= 0.0660$

Result: **GOOD**

## 7. Block Shear — Flange Plates

Checks whether a block of material bounded by the bolt holes can tear out. The capacity is the minimum of fracture on the net shear plane plus fracture on the net tension plane, or yielding on the gross shear plane plus fracture on the net tension plane.

$$
A_{nv} = \bigl[g(n_{bolts}-1) - (0.5(n_{bolts}-1)d_b + 0.125)\bigr] t_p = \bigl[3.0(2-1) - (0.5(2-1)0.75 + 0.125)\bigr] \cdot 0.5 = 1.250\ \text{in}^2
$$

*AISC Section J4.3 (net shear area)*

$$
A_{nt} = 2 L_{ey} t_p - (d_b + 0.125) t_p = 2 \cdot 2.0 \cdot 0.5 - (0.75 + 0.125) \cdot 0.5 = 1.562\ \text{in}^2
$$

*AISC Section J4.3 (net tension area)*

$$
A_{gv} = t_p \cdot g(n_{rows}-1) = 0.5 \cdot 3.0(2-1) = 1.500\ \text{in}^2
$$

*AISC Section J4.3 (gross shear area)*

$U_{bs} = 1$ (uniform tension stress)

$$
R_n = \min\bigl(0.6 F_u A_{nv} + U_{bs} F_u A_{nt},\ 0.6 F_y A_{gv} + U_{bs} F_u A_{nt}\bigr) = \min\bigl(0.6 \cdot 58 \cdot 1.25 + 1 \cdot 58 \cdot 1.5625,\ 0.6 \cdot 36 \cdot 1.5 + 1 \cdot 58 \cdot 1.5625\bigr) = 123.025\ \text{k}
$$

*AISC Eq. J4-5*

Demand $= 4.7244$ k 

Result: **GOOD**

## 8. Flange Weld Sizing

Sizes the fillet welds connecting the flange plates to the main member flange. Load is parallel to the weld axis so the directional increase factor $k_{ds}=1.0$.

$$
L_w = (h/2) \cdot 2 = (16.0/2) \cdot 2 = 16.000\ \text{in}
$$

*AISC Section J2.4 (effective weld length)*

$$
k_{ds} = 1 + 0.5\sin^{1.5}(\theta) = 1 + 0.5\sin^{1.5}(0^\circ) = 1.000
$$

*AISC Eq. J2-5*

$$
D_{min} = 0.1875 = 0.1875 = 0.1875\ \text{in}
$$

*AISC Table J2.4*

$$
D_{req} = \dfrac{\max(U\!plift, F_m)}{L_w (1/\sqrt{2}) \cdot 0.6 F_{exx} \phi_w k_{ds}} = \dfrac{4.7244}{16.0 \cdot (1/\sqrt{2}) \cdot 0.6 \cdot 70 \cdot 0.75 \cdot 1.0} = 0.01326\ \text{in}
$$

*AISC Eq. J2-3*

Provided weld size $D_w = \max(D_{min},\ \lceil D_{req} \cdot 16 \rceil/16) = 0.1875$ in

Result: **GOOD**

## 9. Column Flange — Axial Bearing

Checks bearing on the finished bearing surface between the two column sections. Assumes no bearing through the web.

$$
\phi R_n = \phi_{bs} F_{u,main} A_{pb} = 0.75 \cdot 65 \cdot 11.46 = 558.675\ \text{k}
$$

*AISC Eq. J7-1 (as replicated from workbook — sheet omits 1.8 factor and uses $F_u$ instead of $F_y$)*

Demand $= P = 120$ k 
Utilization $= 0.2148$

Result: **GOOD**

## 10. Web Plate — Gross Yielding and Net Rupture in Shear

Checks the web plate for shear yielding across its gross section and shear rupture across the net section through the bolt holes.

### 10.1 Gross Shear Yielding

$$
\phi R_n = \phi_v \cdot 0.6 F_y A_{g,wp} = 1.0 \cdot 0.6 \cdot 36 \cdot 4.25 = 91.800\ \text{k}
$$

*AISC Eq. J4-3 ($\phi_v = 1.0$)*

Demand $= V = 1$ k

Result: **GOOD**

### 10.2 Net Shear Rupture

$$
\phi R_n = \phi_f \cdot 0.6 F_u A_{n,wp} = 0.75 \cdot 0.6 \cdot 58 \cdot 3.375 = 88.087\ \text{k}
$$

*AISC Eq. J4-4*

Demand $= V = 1$ k

Result: **GOOD**

## 11. Web Plate — Bolt Group in Shear

Checks bolt shear, web-plate bearing, and web-plate tearout. Note that the sheet's tearout length formula uses $(d_b+1/16)/2$ rather than the full hole correction.

$$
\phi r_n = F_{nv}\tfrac{\pi}{4} d_b^2 \phi_{bolt} = 54 \cdot \tfrac{\pi}{4} \cdot 0.75^2 \cdot 0.75 = 17.892\ \text{k/bolt}
$$

*AISC Eq. J3-1*

$$
\phi r_n = \phi_{bolt} \cdot 2.4 d_b t_p F_u = 0.75 \cdot 2.4 \cdot 0.75 \cdot 0.5 \cdot 58 = 39.150\ \text{k/bolt}
$$

*AISC Eq. J3-6a*

$$
l_{c1} = s - \tfrac{d_b + 1/16}{2} = 5.0 - \tfrac{0.75 + 1/16}{2} = 4.5938\ \text{in}
$$

*AISC Section J3.10 (per workbook formula)*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c1} t_p F_u = 0.75 \cdot 1.2 \cdot 4.59375 \cdot 0.5 \cdot 58 = 119.897\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

$$
l_{c2} = L_{ex} - \tfrac{d_b + 1/16}{2} = 1.75 - \tfrac{0.75 + 1/16}{2} = 1.3438\ \text{in}
$$

*AISC Section J3.10 (per workbook formula)*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c2} t_p F_u = 0.75 \cdot 1.2 \cdot 1.34375 \cdot 0.5 \cdot 58 = 35.072\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

$$
\phi R_n = n_{bolts}\bigl[\min(\phi r_{ext}) + \min(\phi r_{int})(n_{rows}-1)\bigr] = 2\bigl[17.892 + 17.892(2-1)\bigr] = 71.569\ \text{k}
$$

*AISC Section J3*

Demand $= V = 1$ k 
Utilization $= 0.0140$

Result: **GOOD**

## 12. Upper Column Web — Bolt Group in Shear

Same checks on the column side.

$$
\phi r_n = F_{nv}\tfrac{\pi}{4} d_b^2 \phi_{bolt} = 54 \cdot \tfrac{\pi}{4} \cdot 0.75^2 \cdot 0.75 = 17.892\ \text{k/bolt}
$$

*AISC Eq. J3-1*

$$
\phi r_n = \phi_{bolt} \cdot 2.4 d_b t_{w,main} F_{u,main} = 0.75 \cdot 2.4 \cdot 0.75 \cdot 0.345 \cdot 65 = 30.2737\ \text{k/bolt}
$$

*AISC Eq. J3-6a*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c1} t_{w,main} F_{u,main} = 0.75 \cdot 1.2 \cdot 4.59375 \cdot 0.345 \cdot 65 = 92.7132\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

$$
\phi r_n = \phi_{bolt} \cdot 1.2 l_{c2} t_{w,main} F_{u,main} = 0.75 \cdot 1.2 \cdot 1.34375 \cdot 0.345 \cdot 65 = 27.12\ \text{k/bolt}
$$

*AISC Eq. J3-6c*

Group capacity:

$$
\phi R_n = n_{bolts}\bigl[\min(\phi r_{ext,wp}) + \min(\phi r_{int,wp})(n_{rows}-1)\bigr] = 2\bigl[17.892 + 17.892(2-1)\bigr] = 71.569\ \text{k}
$$

*AISC Section J3 (as replicated)*

Demand $= V = 1$ k 
Utilization $= 0.0140$

Result: **GOOD**

## 13. Block Shear — Web Plates

Block shear on the web plates; the workbook compares the capacity against the axial load $P$.

$$
A_{nv} = \bigl[g(n_{bolts}-1) - (0.5(n_{bolts}-1)d_b + 0.125)\bigr] t_p = \bigl[3.0(2-1) - (0.5(2-1)0.75 + 0.125)\bigr] \cdot 0.5 = 1.250\ \text{in}^2
$$

*AISC Section J4.3*

$$
A_{nt} = 2 L_{ey} t_p - (d_b + 0.125) t_p = 2 \cdot 2.0 \cdot 0.5 - (0.75 + 0.125) \cdot 0.5 = 1.562\ \text{in}^2
$$

*AISC Section J4.3*

$$
A_{gv} = t_p \cdot g(n_{bolts}-1) = 0.5 \cdot 3.0(2-1) = 1.500\ \text{in}^2
$$

*AISC Section J4.3*

$$
R_n = \min\bigl(0.6 F_u A_{nv} + U_{bs} F_u A_{nt},\ 0.6 F_y A_{gv} + U_{bs} F_u A_{nt}\bigr) = \min\bigl(0.6 \cdot 58 \cdot 1.25 + 1 \cdot 58 \cdot 1.5625,\ 0.6 \cdot 36 \cdot 1.5 + 1 \cdot 58 \cdot 1.5625\bigr) = 123.025\ \text{k}
$$

*AISC Eq. J4-5*

Demand $= P = 120$ k

Result: **GOOD**

## 14. Web Weld Sizing

Sizes the fillet welds connecting the web plate to the column web. Here the load is transverse to the weld axis, so $k_{ds}=1+0.5\sin^{1.5}(90^\circ)=1.5$.

$$
L_w = (w/2) \cdot 2 = (8.5/2) \cdot 2 = 8.500\ \text{in}
$$

*AISC Section J2.4 (effective weld length)*

$$
k_{ds} = 1 + 0.5\sin^{1.5}(\theta) = 1 + 0.5\sin^{1.5}(90^\circ) = 1.500
$$

*AISC Eq. J2-5*

$$
D_{req} = \dfrac{V}{L_w (1/\sqrt{2}) \cdot 0.6 F_{exx} \phi_w k_{ds}} = \dfrac{1}{8.5 \cdot (1/\sqrt{2}) \cdot 0.6 \cdot 70 \cdot 0.75 \cdot 1.5} = 0.00352\ \text{in}
$$

*AISC Eq. J2-3*

Provided weld size $D_w = \max(D_{min},\ \lceil D_{req} \cdot 16 \rceil/16) = 0.1875$ in

Result: **GOOD**

## 15. Summary of All Checks

| Check | Capacity | Demand | Unit | Result |
|---|---|---|---|---|
| 1 MM flange yield | 180.0000 | 4.7244 | k | **GOOD** |
| 2 FP gross yielding | 259.2000 | 4.7244 | k | **GOOD** |
| 3 FP tensile rupture | 271.8750 | 4.7244 | k | **GOOD** |
| 4 MM tensile rupture | 595.4840 | 4.7244 | k | **GOOD** |
| 5 FP bolt group | 71.5694 | 4.7244 | k | **GOOD** |
| 6 CF bolt group | 71.5694 | 4.7244 | k | **GOOD** |
| 7 Block shear — FP | 123.0250 | 4.7244 | k | **GOOD** |
| 8 Flange weld size  | 0.1875 | 0.1875 | in | **GOOD** |
| 9 Column flange bearing | 558.6750 | 120.0000 | k | **GOOD** |
| 10 WP shear yielding | 91.8000 | 1.0000 | k | **GOOD** |
| 11 WP shear rupture | 88.0875 | 1.0000 | k | **GOOD** |
| 12 WP bolt group | 71.5694 | 1.0000 | k | **GOOD** |
| 13 Block shear — WP | 123.0250 | 120.0000 | k | **GOOD** |
| 14 Web weld size | 0.1875 | 0.1875 | in | **GOOD** |

**Overall Design: GOOD**
