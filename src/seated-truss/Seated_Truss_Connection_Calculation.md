# Seated Truss Connection — Structural Steel Design Calculation

> **Code basis:** AISC Steel Construction Manual, 16th Edition — LRFD Design Method  
> **Connection type:** Seated k-joist truss connection  
> **Side member:** W44X335 (A992)  
> **Angle:** L3X3X1/2 (A36)  
> **Bolts:** A325-N

---

## Sample Structure

A 16-in deep k-joist frames into a W44x335 girder for a roof system. The joist is 25ft long and spaced 15 feet o.c. There is a 120psf gravity load on the roof and there is a 5psf uplift load. The top chord of the joist sits on top of the girder and bottom chord connects to the girder web with an angle to prevent uplift. The joists are pin-pin, so there is no moment demand. There is also a lateral shear reaction of 0.5 kips.

---

## 1. Design Inputs

### 1.1 Material Properties

| Parameter | Symbol | Value | Unit | Reference |
|-----------|--------|-------|------|-----------|
| Ultimate strength, side member (A992) | $F_{u,\text{steel}}$ | 65.0 | ksi | — |
| Ultimate strength, plate/angle (A36)  | $F_{u,\text{plate}}$ | 58.0 | ksi | — |
| Yield strength, side member (A992)    | $F_{y,\text{steel}}$ | 50.0 | ksi | — |
| Yield strength, plate/angle (A36)     | $F_{y,\text{plate}}$ | 36.0 | ksi | — |
| Bolt tensile strength (A325)          | $F_{nt}$ | 90.0 | ksi | AISC Table J3.2 |
| Bolt shear strength (A325-N)          | $F_{nv}$ | 54.0 | ksi | AISC Table J3.2 |
| Modulus of elasticity                 | $E$ | 29000 | ksi | — |

### 1.2 LRFD Resistance Factors

| Failure Mode | Symbol | Value |
|-------------|--------|-------|
| Yielding  | $\phi_y$  | 0.9 |
| Fracture  | $\phi_f$  | 0.75 |
| Block shear | $\phi_{bs}$ | 0.75 |
| Welds     | $\phi_w$  | 0.75 |
| Bolts (shear / bearing / tension) | $\phi_b$ | 0.75 |

### 1.3 Joist Geometry and Applied Loads

| Parameter | Symbol | Value | Unit | Notes |
|-----------|--------|-------|------|-------|
| Joist span | $L$ | 25.0 | ft | — |
| Tributary spacing | $s$ | 15.0 | ft | — |
| Joist depth | $d_j$ | 16.0 | in | — |
| Factored gravity load | $w_{u,\text{grav}}$ | 120.0 | psf | LRFD combined |
| Factored uplift load  | $w_{u,\text{uplift}}$ | 5.0 | psf | LRFD combined |
| Horizontal shear reaction | $V_{u,\text{shear}}$ | 0.5 | kips | User specified |

### 1.4 Connection Geometry

| Component | Parameter | Symbol | Value | Unit |
|-----------|-----------|--------|-------|------|
| Bearing plate | Thickness | $t_{\text{plate}}$ | 0.5 | in |
| Bearing plate | Width (perp. to joist) | $w$ | 6.0 | in |
| Bearing plate | Length (parallel to joist) | $l$ | 3.0 | in |
| Bearing plate | Projected bearing area | $A_{pb}$ | 0.5 | in² |
| BP bolts | Diameter | $d_b$ | 0.75 | in |
| BP bolts | Number | $n$ | 2 | — |
| BP bolts | Edge distance | $L_e$ | 1.25 | in |
| BP weld | Size | $D$ | 4 | 1/16 in |
| Angle | Section | — | L3X3X1/2 | — |
| Angle | Thickness | $t_{\text{angle}}$ | 0.5 | in |
| Angle | Leg along joist | $L_1$ | 3.0 | in |
| Angle | Leg along side member | $L_2$ | 3.0 | in |
| Angle | Outstanding leg width | $b_{\text{angle}}$ | 2.0 | in |
| Angle bolts | Diameter | $d_b$ | 0.75 | in |
| Angle bolts | Number | $n$ | 2 | — |
| Angle bolts | Edge distance | $L_e$ | 1.25 | in |
| Angle weld | Size | $D$ | 3 | 1/16 in |
| Angle weld | Length | $l_w$ | 3.0 | in |
| Filler metal | Classification strength | $F_{EXX}$ | 70.0 | ksi |

### 1.5 Beam Section Properties (W44X335, AISC Table 1-1)

| Property | Symbol | Value | Unit |
|----------|--------|-------|------|
| Web thickness | $t_w$ | 1.03 | in |
| Beam depth    | $d$   | 44.0 | in |
| Flange thickness | $t_f$ | 1.77 | in |
| Flange width  | $b_f$ | 15.9 | in |
| k-design      | $k$   | 2.56 | in |

---

## 2. Derived Design Forces

Reactions are computed assuming a simply-supported (pin-pin) joist for
gravity and uplift vertical reactions, and a fixed-fixed joist for the
uplift moment used to determine chord force.

### 2.1 Gravity Reaction

$$
R_{u,\text{grav}} = \frac{w_{u,\text{grav}} \cdot s \cdot L}{2 \times 1000}
= \frac{120 \times 15 \times 25}{2 \times 1000}
= 22.5000\ \text{kips}
$$

*Pin-pin vertical reaction*

### 2.2 Uplift Reaction

$$
R_{u,\text{uplift}} = \frac{w_{u,\text{uplift}} \cdot s \cdot L}{2 \times 1000}
= \frac{5 \times 15 \times 25}{2 \times 1000}
= 0.9375\ \text{kips}
$$

*Pin-pin vertical reaction, uplift*

### 2.3 Uplift Moment (Fixed-Fixed)

$$
M_{u,\text{uplift}} = \frac{w_{u,\text{uplift}} \cdot s \cdot L^2}{12 \times 1000}
= \frac{5 \times 15 \times 25^2}{12 \times 1000}
= 3.90625\ \text{k-ft}
$$

*Fixed-fixed end moment*

### 2.4 Chord Tension/Compression

The uplift moment induces tension in the bottom chord and compression in the top chord.
Treating the joist depth as the moment arm:


$$
T/C = \frac{M_{u,\text{uplift}} \times 12}{d_j}
= \frac{3.90625 \times 12}{16}
= 2.9296875\ \text{kips}
$$

*Chord force from uplift moment*

---

## 3. Bearing Plate Checks (Gravity Loading)

### 3.1 Plate Bearing (Beam Flange)

This check verifies that the beam flange has adequate bearing capacity under
the bearing plate. The projected bearing area $A_{pb}$ is obtained from the
joist manufacturer's specifications.


$$
\phi R_n = \phi \cdot 1.8 \cdot F_{y,\text{plate}} \cdot A_{pb}
= 0.75 \times 1.8 \times 36 \times 0.5
= 24.300\ \text{kips}
$$

*AISC Eq. J7-1*

**Demand:** $R_u = R_{u,\text{grav}} = 22.500$ kips

**Utilization:** $D/C = 22.500 / 24.300 = 0.9259$

**Result: GOOD**

### 3.2 Bearing Plate Bolt Shear

Bolts connecting the bearing plate to the beam flange are checked in shear.
The governing demand is the larger of the horizontal shear reaction and the
chord tension/compression force.


$$
A_b = \frac{\pi}{4} d_b^2
= \frac{\pi}{4} \times 0.75^2
= 0.44179\ \text{in}^2
$$

*AISC J3.3 — bolt cross-sectional area*


$$
\phi R_n = \phi \cdot F_{nv} \cdot A_b \cdot n
= 0.75 \times 54 \times 0.44179 \times 2
= 35.785\ \text{kips}
$$

*AISC Eq. J3-1*

**Demand:** $V_u = \max(V_{u,\text{shear}},\, T/C) = \max(0.50,\, 2.9297) = 2.9297$ kips

**Utilization:** $D/C = 2.9297 / 35.785 = 0.0819$

**Result: GOOD**

### 3.3 Bearing Plate Bolt Bearing

Bearing deformation at the bolt holes in the bearing plate is checked. The
deformation at bolt holes is treated as a design consideration (the more
conservative of the two AISC bearing equations).


$$
\phi R_n = \phi \cdot 2.4 \cdot d_b \cdot t \cdot F_{u,\text{plate}} \cdot n
= 0.75 \times 2.4 \times 0.75 \times 0.5 \times 58 \times 2
= 78.300\ \text{kips}
$$

*AISC Eq. J3-6a*

**Demand:** $V_u = \max(T/C,\, V_{u,\text{shear}}) = 2.9297$ kips

**Utilization:** $D/C = 2.9297 / 78.300 = 0.0374$

**Result: GOOD**

### 3.4 Bearing Plate Bolt Tearout

Tearout of material beyond the bolt hole is checked using the clear distance
$L_c$ from the edge of the bolt hole to the edge of the plate.


$$
L_c = L_e - \frac{d_b + \tfrac{1}{8}}{2}
= 1.25 - \frac{0.75 + 0.125}{2}
= 0.8125\ \text{in}
$$

*AISC J3.10 — clear distance for tearout*


$$
\phi R_n = \phi \cdot 1.2 \cdot L_c \cdot t \cdot F_{u,\text{plate}} \cdot n
= 0.75 \times 1.2 \times 0.8125 \times 0.5 \times 58 \times 2
= 42.4125\ \text{kips}
$$

*AISC Eq. J3-6c*

**Demand:** $V_u = V_{u,\text{shear}} = 0.500$ kips (horizontal shear only)

**Utilization:** $D/C = 0.500 / 42.4125 = 0.0118$

**Result: GOOD**

### 3.5 Bearing Plate Weld (Gravity / Shear)

Two fillet welds connect the joist top-chord angles to the bearing plate.
Under gravity loading the resultant force is parallel to the weld throat
($\theta = 0°$), so no directional strength increase applies.


$$
k_{ds} = 1.0 + 0.5 \sin^{1.5}(\theta)
= 1.0 + 0.5 \times \sin^{1.5}(0°)
= 1.000
$$

*AISC Eq. J2-5 — directional strength factor*


$$
\phi R_n = \phi \cdot 0.6 F_{EXX} \cdot \frac{\sqrt{2}}{2} \cdot \frac{D}{16} \cdot l_w \cdot k_{ds} \cdot 2
= 0.75 \times 0.6 \times 70 \times \frac{\sqrt{2}}{2} \times \frac{3}{16} \times 3.0 \times 1.000 \times 2
= 25.058\ \text{kips}
$$

*AISC Eq. 8-1 — fillet weld strength*

**Demand:** $V_u = \max(V_{u,\text{shear}},\, T/C) = 2.9297$ kips

**Utilization:** $D/C = 2.9297 / 25.058 = 0.1169$

**Result: GOOD**

---

## 4. Uplift Checks (Top Chord / Bearing Plate)

### 4.1 Uplift Bolt Tension

Under net uplift the bearing plate bolts are loaded in tension. The full
uplift reaction is assumed to be transferred through these bolts.


$$
A_b = \frac{\pi}{4} d_b^2
= \frac{\pi}{4} \times 0.75^2
= 0.44179\ \text{in}^2
$$

*AISC J3.3 — bolt cross-sectional area*


$$
\phi R_n = \phi \cdot F_{nt} \cdot A_b \cdot n
= 0.75 \times 90 \times 0.44179 \times 2
= 59.641\ \text{kips}
$$

*AISC Eq. J3-1 — bolt tensile strength*

**Demand:** $T_u = R_{u,\text{uplift}} = 0.9375$ kips

**Utilization:** $D/C = 0.9375 / 59.641 = 0.0157$

**Result: GOOD**

### 4.2 Uplift Weld Tension

The fillet welds connecting the joist angles to the bearing plate resist
uplift as tensile forces perpendicular to the weld axis ($\theta = 90°$),
which activates the full directional strength increase.


$$
k_{ds} = 1.0 + 0.5 \sin^{1.5}(\theta)
= 1.0 + 0.5 \times \sin^{1.5}(90°)
= 1.500
$$

*AISC Eq. J2-5 — directional strength factor (perpendicular loading)*


$$
\phi R_n = \phi \cdot 0.6 F_{EXX} \cdot \frac{\sqrt{2}}{2} \cdot \frac{D}{16} \cdot l_w \cdot k_{ds} \cdot 2
= 0.75 \times 0.6 \times 70 \times \frac{\sqrt{2}}{2} \times \frac{3}{16} \times 3.0 \times 1.500 \times 2
= 37.587\ \text{kips}
$$

*AISC Eq. 8-1 — fillet weld strength*

**Demand:** $T_u = R_{u,\text{uplift}} = 0.9375$ kips

**Utilization:** $D/C = 0.9375 / 37.587 = 0.0249$

**Result: GOOD**

---

## 5. Bottom Chord Angle Checks (Uplift Condition)

The bottom chord is connected to the beam flange via an L3X3X1/2 angle
with bolts and fillet welds. All checks below use the chord tension/
compression force as the governing demand unless noted.

### 5.1 Bottom Chord Bolt Shear

Bolts connecting the angle to the beam are checked in shear under the
chord tension/compression force induced by the uplift moment.


$$
A_b = \frac{\pi}{4} d_b^2
= \frac{\pi}{4} \times 0.75^2
= 0.44179\ \text{in}^2
$$

*AISC J3.3 — bolt cross-sectional area*


$$
\phi R_n = \phi \cdot F_{nv} \cdot A_b \cdot n
= 0.75 \times 54 \times 0.44179 \times 2
= 35.785\ \text{kips}
$$

*AISC Eq. J3-1 — bolt shear strength*

**Demand:** $V_u = T/C = 2.9297$ kips

**Utilization:** $D/C = 2.9297 / 35.785 = 0.0819$

**Result: GOOD**

### 5.2 Angle Bolt Bearing

Bearing capacity at the bolt holes in the angle leg is verified. Deformation
at the bolt holes is treated as a design consideration.


$$
\phi R_n = \phi \cdot 2.4 \cdot d_b \cdot t_{\text{angle}} \cdot F_{u,\text{plate}} \cdot n
= 0.75 \times 2.4 \times 0.75 \times 0.50 \times 58 \times 2
= 78.300\ \text{kips}
$$

*AISC Eq. J3-6a — bolt bearing strength*

**Demand:** $V_u = \max(T/C,\, w_{u,\text{uplift}}) = \max(2.9297,\, 5.0) = 5.000$ kips

**Utilization:** $D/C = 5.000 / 78.300 = 0.0639$

**Result: GOOD**

### 5.3 Angle Bolt Tearout

Tearout beyond the bolt hole in the angle leg is checked using the clear
distance to the plate edge.


$$
L_c = L_e - \frac{d_b + \tfrac{1}{8}}{2}
= 1.25 - \frac{0.75 + 0.125}{2}
= 0.8125\ \text{in}
$$

*AISC J3.10 — clear distance for tearout*


$$
\phi R_n = \phi \cdot 1.2 \cdot L_c \cdot t_{\text{angle}} \cdot F_{u,\text{plate}} \cdot n
= 0.75 \times 1.2 \times 0.8125 \times 0.50 \times 58 \times 2
= 42.4125\ \text{kips}
$$

*AISC Eq. J3-6c — tearout strength*

**Demand:** $V_u = w_{u,\text{uplift}} = 5.0$ kips

**Utilization:** $D/C = 5.0 / 42.4125 = 0.1179$

**Result: GOOD**

### 5.4 Angle Welds (Uplift Condition)

Two fillet welds connect the angle leg to the beam flange. Under uplift the
force is perpendicular to the weld axis ($\theta = 90°$).


$$
k_{ds} = 1.0 + 0.5 \sin^{1.5}(\theta)
= 1.0 + 0.5 \times \sin^{1.5}(90°)
= 1.500
$$

*AISC Eq. J2-5 — directional strength factor*


$$
\phi R_n = \phi \cdot 0.6 F_{EXX} \cdot \frac{\sqrt{2}}{2} \cdot \frac{D}{16} \cdot l_w \cdot k_{ds} \cdot 2
= 0.75 \times 0.6 \times 70 \times \frac{\sqrt{2}}{2} \times \frac{3}{16} \times 3.0 \times 1.500 \times 2
= 37.587\ \text{kips}
$$

*AISC Eq. 8-1 — fillet weld strength*

**Demand:** $T_u = w_{u,\text{uplift}} = 5.0$ kips

**Utilization:** $D/C = 5.0 / 37.587 = 0.1330$

**Result: GOOD**

---

## 6. Stiffener Plate Check (Beam Web and Flange)

Three local failure modes of the beam web and flange are evaluated to
determine whether a transverse stiffener plate is required at the
connection. The bearing length is taken as the angle outstanding leg
width: $l_b = 2.0$ in.

### 6.1 Local Flange Bending

This check verifies that the beam flange can resist bending under the
concentrated force from the connection without a stiffener.


$$
\phi R_n = \phi_y \cdot 6.25 \cdot F_{yf} \cdot t_f^2
= 0.9 \times 6.25 \times 50 \times 1.77^2
= 881.128\ \text{kips}
$$

*AISC Eq. J10-1 — local flange bending*

### 6.2 Web Local Yielding

Web yielding capacity is calculated assuming the concentrated load is
applied at a distance less than or equal to $d$ from the end of the member
(conservative). The resistance factor for web yielding is $\phi = 1.0$.


$$
\phi R_n = 1.0 \cdot F_{yw} \cdot t_w \cdot (2.5k + l_b)
= 1.0 \times 50 \times 1.03 \times (2.5 \times 2.56 + 2.0)
= 432.600\ \text{kips}
$$

*AISC Eq. J10-3 — web local yielding (at distance ≤ d from end)*

### 6.3 Web Crippling

Web crippling capacity is calculated for a force applied at a distance
less than $d/2$ from the end of the member (AISC Eq. J10-5b applies).


$$
\phi R_n = \phi \cdot 0.4 t_w^2 \left[1 + \left(\frac{4l_b}{d} - 0.2\right)\left(\frac{t_w}{t_f}\right)^{1.5}\right] \sqrt{\frac{E F_{yw} t_f}{t_w}} \cdot Q_f
= 0.75 \times 0.4 \times 1.03^2 \times \left[1 + \left(\frac{4 \times 2.0}{44} - 0.2\right)\left(\frac{1.03}{1.77}\right)^{1.5}\right] \times \sqrt{\frac{29000 \times 50 \times 1.77}{1.03}}\times 1.0
= 498.343\ \text{kips}
$$

*AISC Eq. J10-5b — web crippling (load at ≤ d/2 from end)*

### 6.4 Governing Stiffener Check

The governing (minimum) capacity is web local yielding:

$$
\phi R_{n,\text{gov}} = \min(881.128,\, 432.600,\, 498.343) = 432.600\text{ kips}
$$

*Governing capacity from the minimum of AISC Eq. J10-1, J10-3, J10-5b*

**Demand:** $R_u = R_{u,\text{grav}} = 22.500$ kips

**Utilization:** $D/C = 22.500 / 432.600 = 0.0520$

**Result: NO STIFFENER REQUIRED**

---

## 7. Summary of All Checks

| # | Check | AISC Ref. | Capacity φRn (kips) | Demand Ru (kips) | D/C | Result |
|---|-------|-----------|---------------------|------------------|-----|--------|
| 1 | Plate Bearing | J7-1 | 24.300 | 22.5000 | 0.9259 | GOOD |
| 2 | BP Bolt Shear | J3-1 | 35.785 | 2.9297 | 0.0819 | GOOD |
| 3 | BP Bolt Bearing | J3-6a | 78.300 | 2.9297 | 0.0374 | GOOD |
| 4 | BP Bolt Tearout | J3-6c | 42.412 | 0.5000 | 0.0118 | GOOD |
| 5 | BP Weld (gravity) | Eq. 8-1 | 25.058 | 2.9297 | 0.1169 | GOOD |
| 6 | Uplift Bolt Tension | J3-1 | 59.641 | 0.9375 | 0.0157 | GOOD |
| 7 | Uplift Weld Tension | Eq. 8-1 | 37.587 | 0.9375 | 0.0249 | GOOD |
| 8 | Bottom Chord Bolt Shear (uplift) | J3-1 | 35.785 | 2.9297 | 0.0819 | GOOD |
| 9 | Angle Bolt Bearing (uplift) | J3-6a | 78.300 | 5.0000 | 0.0639 | GOOD |
| 10 | Angle Bolt Tearout (uplift) | J3-6c | 42.412 | 5.0000 | 0.1179 | GOOD |
| 11 | Angle Welds (uplift) | Eq. 8-1 | 37.587 | 5.0000 | 0.1330 | GOOD |
| 12a | Flange Bending | J10-1 | 881.128 | 22.5000 | 0.0255 | — |
| 12b | Web Local Yielding (governs) | J10-3 | 432.600 | 22.5000 | 0.0451 | NO STIFFENER REQUIRED |
| 12c | Web Crippling | J10-5b | 498.343 | 22.5000 | 0.0520 | — |

---

*Calculation prepared per AISC Steel Construction Manual, 16th Edition (LRFD).*  
*All blue-filled cells in the source workbook are reproduced as the Inputs block above.*  
*Green result cells correspond to the Result column in this summary table.*