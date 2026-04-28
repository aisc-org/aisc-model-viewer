# Directly Welded Flange Moment Connection
## Structural Steel — LRFD Design Calculation

> **Code Reference:** AISC Steel Construction Manual, 16th Edition  
> **Method:** Load and Resistance Factor Design (LRFD)  
> **Prepared by:** Calculator script — `Directly_Welded_Flange_report.py`

## Sample Structure

A 10ft W21x182 beam is cantilevered off a W21x182 column. There is a 3.33klf gravity load along the cantilevered beam. The connection is a moment connection, so shear and moment reactions are design considerations. 

---

## 1. Project Information and Connection Description

This calculation checks a **directly welded flange moment connection** between a W21×182 beam and a W21×182 column. The beam flanges are directly welded to the column flange to transfer moment. Shear is transferred through a shear plate welded to the column web and bolted to the beam web.

The following failure modes are evaluated in sequence:

1. Shear tab weld capacity
2. Shear tab plate yielding (gross area)
3. Shear tab plate rupture (net area)
4. Bolt shear (shear tab bolts)
5. Bolt bearing — shear tab plate
6. Bolt bearing — beam web
7. Bolt tearout — shear plate
8. Block shear — shear plate
9. Beam web shear
10. Moment flange weld capacity
11. Stiffener plate requirement (column flange bending, web yielding, web crippling)


---

## 2. Input Parameters


### 2.1 Material Properties

| Parameter | Symbol | Value | Units | Reference |
|-----------|--------|-------|-------|-----------|
| Ultimate strength, beam/column (A992) | $F_{u,\text{beam}}$ | 65 | ksi | — |
| Ultimate strength, plate (A36) | $F_{u,\text{plate}}$ | 58 | ksi | — |
| Yield strength, beam/column (A992) | $F_{y,\text{beam}}$ | 50 | ksi | — |
| Yield strength, plate (A36) | $F_{y,\text{plate}}$ | 36 | ksi | — |
| Bolt tensile strength (A325) | $F_{nt}$ | 90 | ksi | AISC Table J3.2 |
| Bolt shear strength (A325, N) | $F_{nv}$ | 54 | ksi | AISC Table J3.2 |
| Modulus of elasticity | $E$ | 29000 | ksi | — |


### 2.2 LRFD Resistance Factors

| Limit State | Symbol | Value |
|-------------|--------|-------|
| Yielding | $\phi_y$ | 0.9 |
| Fracture | $\phi_f$ | 0.75 |
| Block shear | $\phi_{bs}$ | 0.75 |
| Welds | $\phi_w$ | 0.75 |
| Bolts | $\phi_{bolt}$ | 0.75 |


### 2.3 Applied Loads

| Load | Symbol | Value | Units |
|------|--------|-------|-------|
| Shear reaction | $V_u$ | 33.33 | kips |
| Moment reaction | $M_u$ | 166.67 | k-ft |


### 2.4 Beam Properties — W21×182 (AISC Table 1-1)

| Property | Symbol | Value | Units |
|----------|--------|-------|-------|
| Web thickness | $t_w$ | 0.83 | in |
| Depth | $d$ | 22.7 | in |
| Flange thickness | $t_f$ | 1.48 | in |
| Flange width | $b_f$ | 12.5 | in |
| k-design | $k$ | 1.98 | in |


### 2.5 Column Properties — W21×182 (AISC Table 1-1)

| Property | Symbol | Value | Units |
|----------|--------|-------|-------|
| Web thickness | $t_w$ | 0.83 | in |
| Depth | $d$ | 22.7 | in |
| Flange thickness | $t_f$ | 1.48 | in |
| Flange width | $b_f$ | 12.5 | in |
| k-design | $k$ | 1.98 | in |


### 2.6 Shear Plate and Weld Geometry

| Parameter | Symbol | Value | Units |
|-----------|--------|-------|-------|
| Plate height | $h$ | 18 | in |
| Plate width | $w$ | 6 | in |
| Plate thickness | $t$ | 0.5 | in |
| Filler metal strength | $F_{EXX}$ | 70 | ksi |
| Weld size (shear & moment) | $D$ | 4/16 | in |


### 2.7 Bolt Layout

| Parameter | Symbol | Value | Units |
|-----------|--------|-------|-------|
| Bolt diameter (A325) | $d_b$ | 0.75 | in |
| Edge distance, x | $L_{ex}$ | 1.25 | in |
| Edge distance, y | $L_{ey}$ | 1.25 | in |
| Bolt spacing | $s$ | 3.0 | in |
| Bolt gage | $g$ | 3.0 | in |
| Rows of bolts | $n_{rows}$ | 3 | — |
| Bolts per row | $n_{bolts}$ | 1 | — |
| Tension stress uniformity | $U_{bs}$ | 1 | — |
| Shear lag factor | $U$ | 1 | — | AISC Table D3.1 |


---

## 3. Geometry Checks


### 3.1 Plate Height vs. Available Web Depth

The shear plate must fit within the clear web height of the beam.

$$
d - 2k = 22.7 - 2(1.98) = 18.740 \text{ in}
$$

$$
h = 18 \text{ in} < 18.740 \text{ in} \quad \checkmark
$$

**Result: Plate Fits in Web: GOOD**


### 3.2 Bolt Pattern vs. Available Web Depth

The vertical bolt pattern extent must fit within the same clear web height.

$$
\text{Space}_{\text{req}} = 2L_{ey} + (n_{\text{rows}}-1)g = 2(1.25) + (3-1)(3.0) = 8.500 \text{ in}
$$

$$
8.500 \text{ in} < 18.740 \text{ in} \quad \checkmark
$$

**Result: Bolt Pattern Fits: GOOD**


---

## 4. Derived Quantities


### 4.1 Flange Force

The moment is resolved into a tension-compression couple at the beam flanges. This flange force is the demand for the moment weld and stiffener checks.

$$
P_{rf} = \frac{M_u}{d} = \frac{M_u \times 12}{d} = \frac{166.67 \times 12}{22.7} = 88.107 \text{ kips}
$$

*AISC Eq. 11-1*


### 4.2 Bolt Cross-Sectional Area

$$
A_b = \frac{\pi}{4} d_b^2 = \frac{\pi}{4}(0.75)^2 = 0.44179 \text{ in}^2
$$

*AISC Specification Section J3*


---

## 5. Check 1 — Shear Tab Weld Capacity

The shear tab is welded to the column web on both sides with a fillet weld. The load acts parallel to the weld axis (angle = 0°). The directional strength increase factor $k_{ds}$ accounts for the angle between the load and the weld axis.


### 5.1 Load Angle Factor

$$
k_{ds} = 1.0 + 0.5\sin(\theta)^{1.5} = 1.0 + 0.5\sin(0°)^{1.5} = 1.0000
$$

*AISC Spec. Eq. J2-5*


### 5.2 Weld Capacity

$$
\phi R_n = \phi_w \cdot 0.6 F_{EXX} \cdot \frac{\sqrt{2}}{2} \cdot \frac{D}{16} \cdot l \cdot k_{ds} \cdot 2
$$

$$
= 0.75(0.6)(70)\left(\frac{\sqrt{2}}{2}\right)\left(\frac{4}{16}\right)(18)(1.0000)(2)= 200.465 \text{ kips}
$$

*AISC Eq. 8-1 (Manual Part 8, Table 8-4)*

Demand: $V_u = 33.33$ kips

$$
\text{Utilization} = \frac{V_u}{\phi R_n} = \frac{33.33}{200.465} = 0.1663
$$

**Result: Shear Tab Weld: GOOD**


---

## 6. Check 2 — Shear Tab Plate: Yielding on Gross Area

Checks that the gross shear area of the plate does not yield under the applied shear.


### 6.1 Gross Shear Area

$$
A_{gv} = t \cdot h = (0.5)(18) = 9.000 \text{ in}^2
$$


### 6.2 Bearing (phi = 1.0, per Excel)

$$
\phi R_n = (1.0)(0.60)(F_{y,\text{plate}})(A_{gv}) = (0.60)(36)(9.0) = 194.400 \text{ kips}
$$

*AISC Eq. D2-1*

$$
\text{Utilization} = \frac{33.33}{194.400} = 0.1715
$$

**Result: Shear Tab Bearing (Gross): GOOD**


### 6.3 Yielding (phi_y = 0.9 applied)

$$
\phi_y P_n = \phi_y F_{y,\text{plate}} A_{gv} = (0.9)(36)(9.0) = 291.600 \text{ kips}
$$

*AISC Eq. D2-1*

$$
\text{Utilization} = \frac{33.33}{291.600} = 0.1143
$$

**Result: Shear Tab Yielding: GOOD**


---

## 7. Check 3 — Shear Tab Plate: Rupture on Net Area

Checks that the net cross-sectional area of the plate (after deducting bolt holes) does not fracture in tension under the applied load.


### 7.1 Net Area

Bolt holes are taken as bolt diameter plus 1/8 in. (standard hole, AISC Table B4.3b).

$$
A_n = A_g - n_{\text{rows}}\left(d_b + \tfrac{1}{8}\right)t = 9.0 - (3)(0.875)(0.5) = 7.68750 \text{ in}^2
$$

$$
A_e = U A_n = (1)(7.68750) = 7.68750 \text{ in}^2
$$

*AISC Eq. D3-1 (U = 1.0, shear lag factor)*


### 7.2 Fracture Capacity

$$
\phi_f P_n = \phi_f F_{u,\text{plate}} A_n = (0.75)(58)(7.68750) = 334.4062 \text{ kips}
$$

*AISC Eq. D2-2*

$$
\text{Utilization} = \frac{33.33}{334.4062} = 0.0997
$$

**Result: Shear Tab Rupture: GOOD**


---

## 8. Check 4 — Shear Tab Bolt Shear

Checks the shear capacity of the bolt group connecting the shear tab to the beam web.


### 8.1 Bolt Area

$$
A_b = \frac{\pi}{4} d_b^2 = \frac{\pi}{4}(0.75)^2 = 0.44179 \text{ in}^2
$$


### 8.2 Bolt Shear Capacity

$$
\phi R_n = \phi_{bolt} F_{nv} A_b n = (0.75)(54)(0.44179)(3) = 53.6771 \text{ kips}
$$

*AISC Eq. J3-1*

$$
\text{Utilization} = \frac{33.33}{53.6771} = 0.6209
$$

**Result: Bolt Shear: GOOD**


---

## 9. Check 5 — Shear Tab Bolt Bearing

Checks bearing deformation of the shear plate around each bolt hole. Deformation at bolt hole is assumed to be a design consideration (conservative).

$$
\phi R_n = \phi_{bolt} \cdot 2.4 \, d_b \, t \, F_{u,\text{plate}} \, n = (0.75)(2.4)(0.75)(0.5)(58)(3) = 117.4500 \text{ kips}
$$

*AISC Eq. J3-6a*

$$
\text{Utilization} = \frac{33.33}{117.4500} = 0.2838
$$

**Result: Shear Tab Bolt Bearing: GOOD**


---

## 10. Check 6 — Beam Web Bolt Bearing

Checks bearing deformation of the beam web around each bolt hole. The resistance factor $\phi_{bolt} = 0.75$ is applied as the first multiplier. (Note: the original Excel formula used $t_f$ in this position — corrected here.)

$$
\phi R_n = \phi_{bolt} \cdot 2.4 \, d_b \, t_w \, F_{u,\text{beam}} \, n = (0.75)(2.4)(0.75)(0.83)(65)(3) = 218.4975 \text{ kips}
$$

*AISC Eq. J3-6a*

$$
\text{Utilization} = \frac{33.33}{218.4975} = 0.1525
$$

**Result: Beam Web Bolt Bearing: GOOD**


---

## 11. Check 7 — Shear Plate Bolt Tearout

Checks bearing tearout of the shear plate edge at the bolt nearest the free edge. Demand is the applied shear $V_u$. (Note: the original Excel utilization formula used $d$ in inches as demand — corrected here.)


### 11.1 Clear Distance

$$
L_c = L_{ey} - \frac{d_b + \tfrac{1}{8}}{2} = 1.25 - \frac{0.75 + 0.125}{2} = 0.81250 \text{ in}
$$

*AISC Specification Section J3.10*


### 11.2 Tearout Capacity and Utilization

$$
\phi R_n = 1.2 \, L_c \, t \, F_{u,\text{plate}} \cdot 2 \cdot \phi_{bolt} = 1.2(0.81250)(0.5)(58)(2)(0.75) = 42.4125 \text{ kips}
$$

*AISC Eq. J3-6c (deformation at bolt hole is a design consideration)*

$$
\text{Utilization} = \frac{V_u}{\phi R_n} = \frac{33.33}{42.4125} = 0.7859
$$

**Result: Shear Plate Bolt Tearout: GOOD**


---

## 12. Check 8 — Shear Plate Block Shear

Block shear is a failure mode in which a block of material tears out, combining shear rupture on one face with tension rupture (or yielding) on the perpendicular face.


### 12.1 Block Shear Areas

$$
A_{nv} = t\left[h - L_{ey} - \left(n_{\text{rows}}-\tfrac{1}{2}\right)(d_b+\tfrac{1}{8})\right] = (0.5)\left[18-1.25-(2.5)(0.875)\right] = 7.28125 \text{ in}^2
$$

*AISC Commentary Section J4.3*

$$
A_{nt} = t\left[(n_{\text{bolts}}-1)\left(s-(d_b+\tfrac{1}{8})\right)\right] = (0.5)[(1-1)(2.125)] = 0.00000 \text{ in}^2
$$

$$
A_{gv} = t(h-L_{ey}) = (0.5)(18-1.25) = 8.37500 \text{ in}^2
$$


### 12.2 Block Shear Capacity

$$
\phi R_n = \phi_{bs} \min\!\left(0.6F_{u,\text{plate}}\,A_{nv}+U_{bs}F_{u,\text{plate}}\,A_{nt},\;0.6F_{y,\text{plate}}\,A_{gv}+U_{bs}F_{u,\text{plate}}\,A_{nt}\right)
$$

$$
= (0.75)\min(253.3875,\; 180.9000) = 135.6750 \text{ kips}
$$

*AISC Eq. J4-5*

$$
\text{Utilization} = \frac{33.33}{135.6750} = 0.2457
$$

**Result: Block Shear: GOOD**


---

## 13. Check 9 — Beam Web Shear

Checks that the beam web has adequate shear capacity. For compact webs satisfying $h/t_w \le 2.24\sqrt{E/F_y}$, the resistance factor is taken as $\phi = 1.00$ and $C_{v1} = 1.0$.


### 13.1 Web Shear Area

$$
A_w = d \cdot t_w = (22.7)(0.83) = 18.8410 \text{ in}^2
$$


### 13.2 Web Shear Capacity

$$
C_{v1} = 1 \quad (h/t_w \le 2.24\sqrt{E/F_y})
$$

*AISC Eq. G2-2*

$$
\phi V_n = (1.0)(0.6)(F_{y,\text{beam}})(A_w)(C_{v1}) = (0.6)(50)(18.8410)(1) = 565.2300 \text{ kips}
$$

*AISC Eq. G2-1  (phi = 1.0 per Section G2.1(a))*

$$
\text{Utilization} = \frac{33.33}{565.2300} = 0.0590
$$

**Result: Beam Web Shear: GOOD**


---

## 14. Check 10 — Moment Flange Weld Capacity

The beam flanges are directly welded to the column flange to transfer the moment couple. The weld load is perpendicular to the weld axis (angle = 90°), which gives a directional strength increase factor of $k_{ds} = 1.5$.


### 14.1 Load Angle Factor

$$
k_{ds} = 1.0 + 0.5\sin(\theta)^{1.5} = 1.0 + 0.5\sin(90°)^{1.5} = 1.5000
$$

*AISC Spec. Eq. J2-5*


### 14.2 Weld Capacity

$$
\phi R_n = \phi_w \cdot 0.6 F_{EXX} \cdot \frac{\sqrt{2}}{2} \cdot \frac{D}{16} \cdot l \cdot k_{ds} \cdot 2
$$

$$
= (0.75)(0.6)(70)\left(\frac{\sqrt{2}}{2}\right)\left(\frac{4}{16}\right)(12.5)(1.5000)(2)= 208.8175 \text{ kips}
$$

*AISC Eq. 8-1 (Manual Part 8)*

$$
Demand: P_{rf} = \frac{\left(M \cdot 12 \right)}{d} = \frac{2000}{22.7} = 88.1075 kips
$$

$$
\text{Utilization} = \frac{P_{rf}}{\phi R_n} = \frac{88.1075}{208.8175} = 0.4219
$$

**Result: Moment Flange Weld: GOOD**


---

## 15. Check 11 — Stiffener Plate Requirement

Checks whether the column web and flange can resist the concentrated flange force without stiffener plates. Three limit states govern: flange local bending, web local yielding, and web crippling. The bearing length is taken as the beam flange width ($l_b = b_f$). The force is assumed applied at a distance $\le d$ from the column end (conservative).

$F_{yf} = F_{yw} = 50$ ksi (A992 column),  $l_b = b_{f,\text{beam}} = 12.5$ in,  $Q_f = 1$ (solid section)


### 15.1 Flange Local Bending

$$
\phi R_n = (0.9)(6.25)(F_{yf})(t_f^2) = (0.9)(6.25)(50)(1.48)^2 = 616.0500 \text{ kips}
$$

*AISC Eq. J10-1*


### 15.2 Web Local Yielding

Load applied at a distance $\le d$ from member end (conservative):

$$
\phi R_n = (1.0)(F_{yw})(t_w)(2.5k + l_b) = (50)(0.83)(2.5 \times 1.98 + 12.5) = 724.1750 \text{ kips}
$$

*AISC Eq. J10-3*


### 15.3 Web Crippling

Applicable when $l_b/d > 0.2$: $l_b/d = 12.5/22.7 = 0.5507 > 0.2$ — confirmed.

$$
\phi R_n = (0.75)(0.40)\,t_w^2\!\left[1+\left(\frac{4l_b}{d}-0.2\right)\!\left(\frac{t_w}{t_f}\right)^{\!1.5}\right]\sqrt{\frac{E\,F_{yw}\,t_f}{t_w}}\,Q_f
$$

$$
= (0.75)(0.40)(0.83)^2\left[1+\left(\frac{4(12.5)}{(22.7)}-0.2\right)\left(\frac{0.83}{1.48}\right)^{1.5}\right]\sqrt{\frac{29000 \times 50 \times 1.48}{0.83}}\,(1)= 611.8173 \text{ kips}
$$

*AISC Eq. J10-5b (lb/d > 0.2 and force at distance ≤ d/2 from end)*


### 15.4 Governing Capacity and Utilization

$$
R_{n,\text{min}} = \min(616.0500,\; 724.1750,\; 611.8173) = 611.8173 \text{ kips (Web Crippling governs)}
$$

$$
\text{Utilization} = \frac{P_{rf}}{R_{n,\text{min}}} = \frac{88.1075}{611.8173} = 0.1440
$$

**Result: Stiffener Plate: NO STIFFENER REQUIRED**


---

## 16. Summary of All Checks

| # | Limit State | Capacity (kips) | Demand (kips) | Utilization | Result |
|---|-------------|-----------------|---------------|-------------|--------|
| 1 | Shear Tab Weld | 200.465 | 33.330 | 0.1663 | **GOOD** |
| 2 | Shear Tab Bearing (Gross) | 194.400 | 33.330 | 0.1715 | **GOOD** |
| 3 | Shear Tab Yielding | 291.600 | 33.330 | 0.1143 | **GOOD** |
| 4 | Shear Tab Rupture | 334.406 | 33.330 | 0.0997 | **GOOD** |
| 5 | Bolt Shear | 53.677 | 33.330 | 0.6209 | **GOOD** |
| 6 | Shear Tab Bolt Bearing | 117.450 | 33.330 | 0.2838 | **GOOD** |
| 7 | Beam Web Bolt Bearing | 218.497 | 33.330 | 0.1525 | **GOOD** |
| 8 | Shear Plate Bolt Tearout | 42.412 | 33.330 | 0.7859 | **GOOD** |
| 9 | Block Shear | 135.675 | 33.330 | 0.2457 | **GOOD** |
| 10 | Beam Web Shear | 565.230 | 33.330 | 0.0590 | **GOOD** |
| 11 | Moment Flange Weld | 208.817 | 88.107 | 0.4219 | **GOOD** |
| 12 | Stiffener: Flange Bending | 616.050 | 88.107 | 0.1430 | **GOOD** |
| 13 | Stiffener: Web Yielding | 724.175 | 88.107 | 0.1217 | **GOOD** |
| 14 | Stiffener: Web Crippling | 611.817 | 88.107 | 0.1440 | **GOOD** |

---

**Overall Result:**  All checks GOOD — no stiffener required.

---
*End of Calculation*