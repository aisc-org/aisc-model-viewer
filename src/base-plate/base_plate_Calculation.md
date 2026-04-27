# Steel Base Plate Connection — Structural Calculation

**Calculation method:** LRFD
**Design standard:** AISC Steel Construction Manual, 15th Edition
**Supplementary reference:** AISC Design Guide 1 (DG1), 3rd Edition — *Base Plate and Anchor Rod Design*

---

## Sample Structure

Consider a W14x82 steel column at the corner of a building has supports four floors, each contributing 50 kips to the gravity load. The 18psf lateral wind load is applied to the side of the building, which has columns at 27'-9". The lateral forces are resisted by a moment frame. The vertical reaction is 200 kips, the moment reaction is 1 k-ft at the base of the column, and the shear reaction is 10 kips.

## Project Information

| Item | Description |
|------|-------------|
| Connection type | Base plate — vertical W-shape column to concrete footing |
| Column section | W14×82 |
| Design basis | LRFD; loads from RISA 3D structural model |
| Key assumption | No concrete pedestal; base plate bears directly on footing |
| Key assumption | Centered column on base plate |
| Key assumption | Steel checks only (concrete anchor checks by others) |

## 1. Design Inputs

### 1.1 Material Properties

| Symbol | Parameter | Value | Units | Reference |
|--------|-----------|------:|-------|-----------|
| $F_{u,\text{plate}}$ | Ultimate strength, A36 plate | 58 | ksi | AISC Table 2-4 |
| $F_{y,\text{plate}}$ | Yield strength, A36 plate | 36 | ksi | AISC Table 2-4 |
| $F_{u,\text{bolt}}$ | Anchor rod ultimate strength | 50 | ksi | AISC Table J3.2 |
| $F_{nt}$ | Nominal tensile strength, anchor rod | 90 | ksi | AISC Table J3.2 |
| $F_{nv}$ (table) | Nominal shear strength, A325 bolt | 54 | ksi | AISC Table J3.2 |
| $F_{exx}$ | Weld filler metal classification strength | 70 | ksi | AWS D1.1 |
| $f'_c$ | Concrete compressive strength | 3000 | psi | Project specification |
| $E$ | Modulus of elasticity, steel | 29000 | ksi | AISC Appendix 4 |

### 1.2 LRFD Resistance Factors

| Symbol | Factor | Value | Application |
|--------|--------|------:|-------------|
| $\phi_p$ | Axial / plate yielding | 0.9 | Base plate flexure |
| $\phi_v$ | Shear | 0.75 | Bolt shear; weld shear |
| $\phi_t$ | Tension | 0.75 | Anchor rod tensile rupture |
| $\phi_c$ | Concrete bearing | 0.65 | Footing bearing |
| $\phi_f$ | Friction | 0.65 | Steel-on-concrete friction |
| $\phi_w$ | Welds | 0.75 | Fillet weld capacity |
| $\phi_b$ | Bending | 0.9 | Member flexure |

### 1.3 Applied Loads (Factored, LRFD)

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $P_u$ | Factored axial force (compression +) | 200 | k |
| $V$ | Factored shear force | 10 | k |
| $M$ | Factored base moment | 1 | k·ft |

### 1.4 Geometry

**Base Plate**

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $t_{pl}$ | Plate thickness | 1.25 | in |
| $N$ (=$l_p$) | Plate length (parallel to column web) | 19.5 | in |
| $B$ (=$w_p$) | Plate width (parallel to column flange) | 14.0 | in |

**Column — W14×82 (AISC Table 1-1)**

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $d$ | Depth | 14.3 | in |
| $b_f$ | Flange width | 10.1 | in |
| $t_f$ | Flange thickness | 0.855 | in |
| $t_w$ | Web thickness | 0.51 | in |
| $k_{des}$ | k-design distance | 1.45 | in |
| $T$ | T-distance | 10.875 | in |

**Footing**

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $l_f$ | Footing length (parallel to N) | 144 | in |
| $w_f$ | Footing width (parallel to B) | 144 | in |
| $d_{ftg}$ | Effective footing depth | 26 | in |

**Anchor Bolts**

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $d_b$ | Bolt diameter | 0.7500 | in |
| $n$ | Number of bolts | 6 | — |
| $e_{1}$ | Edge distance along N | 2.0 | in |
| $e_{2}$ | Edge distance along B | 3.5 | in |
| $n_{thr}$ | Threads per inch | 10 | /in |
| Threads in shear plane? | — | No | — |

**Weld**

| Symbol | Parameter | Value | Units |
|--------|-----------|------:|-------|
| $D$ | Weld size | 4 | 1/16 in |
| $l$ | Weld length (= T distance) | 10.875 | in |

---

## 2. Concrete Bearing Capacity

The base plate transfers the column axial load into the concrete footing through direct bearing. The concrete beneath the plate can develop enhanced bearing strength when the loaded area is smaller than the supporting concrete area, as described by the frustrum model. The frustrum projects downward at 1:2 slope from the base plate edges through the footing depth.

### 2.1 Frustrum Geometry

The frustrum horizontal extension $e_f$ equals twice the effective footing depth:

$$
e_f = 2 \cdot d_{ftg} = 2 \times 26 = 52.0\text{ in}
$$

*AISC DG1 §3.1 — frustrum projection at 1H:2V slope*

Half-difference to footing edge (N side): $e_l = 0.5(l_f - l_p) = 0.5(144 - 19.5) = 62.250$ in (FULL EXTENSION — frustrum does not reach edge)

Half-difference to footing edge (B side): $e_w = 0.5(w_f - w_p) = 0.5(144 - 14.0) = 65.000$ in (FULL EXTENSION)

### 2.2 Bearing Areas

$A_1$ — loaded area at top of frustrum (base plate footprint):

$$
A_1 = l_p \times w_p = 19.5 \times 14.0 = 273\text{ in}^2
$$

*AISC Spec. Eq. J8-1 notation*

$A_2$ — projected area at bottom of frustrum (full extension on both sides):

$$
A_2 = (l_p + 2e_f)(w_p + 2e_f) = (19.5 + 2(52))(14.0 + 2(52)) = 14573\text{ in}^2
$$

*AISC Spec. Eq. J8-2 notation*

### 2.3 Design Bearing Strength

Because $A_2 > A_1$, the enhanced bearing strength formula applies with an upper-bound limit:

$$
\phi P_p = \min\!\left(\phi_c \cdot 0.85 f'_c A_1 \sqrt{\frac{A_2}{A_1}},\;\; \phi_c \cdot 1.7 f'_c A_1\right)
$$

*AISC Spec. Eq. J8-2*

$$
\phi P_p = \min\!\left(0.65 \cdot 0.85 \times 3000 \times 273 \times \sqrt{\frac{14573}{273}},\; 0.65 \times 1.7 \times 3000 \times 273\right) \div 1000
$$

$$
\phi P_p = 904.995\text{ k}
$$

*AISC Spec. Eq. J8-2*

**Demand:** $P_u = 200$ k

**Result:** $\phi P_p = 904.995$ k $\geq$ $P_u = 200$ k — **GOOD**

---

## 3. Base Plate Yielding

The base plate acts as a cantilever supported by the bearing pressure from the concrete. The critical overhang dimension $x$ (the larger of $m$ and $n$) governs the flexural demand on a 1-inch-wide strip of plate.

### 3.1 Overhang Dimensions

$$
m = \frac{N - 0.95d}{2} = \frac{19.5 - 0.95 \times 14.3}{2} = 2.9575\text{ in}
$$

*AISC DG1 Eq. 4-10*

$$
n = \frac{B - 0.80b_f}{2} = \frac{14.0 - 0.80 \times 10.1}{2} = 2.9600\text{ in}
$$

*AISC DG1 Eq. 4-11*

$$
x = \max(m,\, n) = \max(2.9575, 2.9600) = 2.9600\text{ in}
$$

*AISC DG1 §4.1 — controlling cantilever dimension*

### 3.2 Plastic Section Modulus of 1-Inch Strip

$$
Z_y = \frac{1}{4} t_{pl}^2 = \frac{1}{4} \times 1.25^2 = 0.390625\text{ in}^3
$$

*AISC DG1 §4.1 — plastic modulus per unit width*

### 3.3 Flexural Capacity of 1-Inch Strip

$$
\phi M_n = \phi_p \cdot Z_y \cdot F_{y,\text{plate}} = 0.9 \times 0.390625 \times (36 \times 1000) \div 12 = 1054.6875\text{ lb·ft}
$$

*AISC Spec. Eq. F11-1 — plastic moment capacity*

### 3.4 Flexural Demand on 1-Inch Strip

Bearing pressure under plate:

$$
f_p = \frac{P_u}{B \cdot N} = \frac{200 \times 1000}{19.5 \times 14.0} = 732.6007\text{ lb/in}^2
$$

*AISC DG1 §4.1 — uniform bearing pressure assumption*

$$
M_u = f_p \cdot 1\text{ in} \cdot \frac{x^2}{2} \div 12 = 732.6007 \times \frac{2.9600^2}{2} \div 12 = 267.4481\text{ lb·ft}
$$

*AISC DG1 Eq. 4-14 — cantilever moment on 1-in strip*

**Result:** $\phi M_n = 1054.6875$ lb·ft $\geq$ $M_u = 267.4481$ lb·ft — **GOOD**

---

## 4. Anchor Rod Tensile Strength

Under an applied base moment, the anchor rods on the tension side resist the net uplift. For this loading combination, the large compressive axial force reduces the net tension demand to zero. The check verifies the steel rupture capacity of all anchor rods in tension.

### 4.1 Effective Stress Area

For 6 rods with 10 threads per inch:

$$
A_{se,N} = n \cdot \frac{\pi}{4}\left(d_b - \frac{0.9743}{n_{thr}}\right)^2 = 6 \cdot \frac{\pi}{4}\left(0.75 - \frac{0.9743}{10}\right)^2 = 2.006760\text{ in}^2
$$

*AISC DG1 Eq. 4-21 — effective tensile stress area*

### 4.2 Design Tensile Strength

$$
\phi R_{nt} = \phi_t \cdot A_{se,N} \cdot F_{u,\text{bolt}} = 0.75 \times 2.006760 \times 50 = 75.2535\text{ k}
$$

*AISC Spec. Eq. J3-1 — design tensile strength of bolts/rods*

### 4.3 Tensile Demand

The net tension demand accounts for the applied moment and the column axial compression. The bolt group lever arm spans between bolt rows:

$$
l_v = \frac{l_p - 2 e_1}{12} = \frac{19.5 - 2 \times 2.0}{12} = 1.2917\text{ ft}
$$

*AISC DG1 §4.4 — bolt group geometry*

$$
R_{ut} = \max\!\left(\frac{M}{l_v} - P_u,\; 0\right) = \max\!\left(\frac{1}{1.2917} - 200, 0\right) = 0.0000\text{ k}
$$

*AISC DG1 §4.4 — net tension from moment less axial compression*

**Result:** $\phi R_{nt} = 75.2535$ k $\geq$ $R_{ut} = 0.0000$ k — **GOOD**

*Note: The compression from the axial force in the column is so great that the relatively low tension force caused by the moment cannot overcome it, leasing R_{ut} to equal 0, hence the logic above, which zeroes the force rather than have negative tension (which this check wouldn't apply to).*

---

## 5. Anchor Rod Shear Strength

Shear at the column base is resisted first by friction between the base plate and the concrete (see Section 8). This check establishes the bolt group's full shear capacity for reference.

### 5.1 Nominal Shear Stress

Threads are **excluded** from the shear plane, so the higher shear stress applies:

$$
F_{nv} = 0.563 \cdot F_{u,\text{bolt}} = 0.563 \times 50 = 28.1500\text{ ksi}
$$

*AISC Table J3.2 — nominal shear stress, threads excluded from shear plane*

### 5.2 Gross Bolt Area

$$
A_b = \frac{\pi}{4} d_b^2 \cdot n = \frac{\pi}{4} \times 0.75^2 \times 6 = 2.650719\text{ in}^2
$$

*AISC Spec. §J3 — gross cross-sectional area of bolts*

### 5.3 Design Shear Strength

$$
\phi R_{nv} = \phi_v \cdot F_{nv} \cdot A_b = 0.75 \times 28.1500 \times 2.650719 = 55.9633\text{ k}
$$

*AISC Spec. Eq. J3-1 — design shear strength*

**Result:** $\phi R_{nv} = 55.9633$ k $\geq$ $V = 10$ k — **GOOD**

---

## 6. Anchor Rod Bending Strength

When shear is transferred through the anchor rods (rather than purely through friction), the rods experience bending between the base plate and the concrete. All rods are assumed to participate equally.

### 6.1 Cross-Section Properties of One Rod

$$
I_{rod} = \frac{\pi (d_b/2)^4}{4} = \frac{\pi \times (0.75/2)^4}{4} = 0.01553156\text{ in}^4
$$

*Standard formula — circular cross-section second moment of area*

$$
Z_{rod} = \frac{I_{rod}}{d_b/2} = \frac{0.01553156}{0.75/2} = 0.04141748\text{ in}^3
$$

*AISC DG1 §4.6 — elastic section modulus used for rod bending*

### 6.2 Design Bending Capacity (All Rods)

Using $\phi = 0.75$ per DG1 for anchor rod bending, and $F_{nt} = 90$ ksi:

$$
\phi M_n = F_{nt} \cdot Z_{rod} \cdot \phi_v \cdot n = 90 \times 0.04141748 \times 0.75 \times 6 = 16.7741\text{ k·in}
$$

*AISC Spec. Eq. F11-1, applied per AISC DG1 §4.6*

$$
M_u = M \times 12 = 1 \times 12 = 12.0\text{ k·in}
$$

*Unit conversion — applied moment to k·in*

**Result:** $\phi M_n = 16.7741$ k·in $\geq$ $M_u = 12.0$ k·in — **GOOD**

---

## 7. Column-to-Base-Plate Weld

The column web is welded to the base plate with fillet welds on both sides of the web. Shear is applied parallel to the weld axis (worst case — no directional strength increase). The weld length equals the column T distance.

### 7.1 Directional Strength Factor

$$
k_{ds} = 1.0 + 0.5 \sin^{1.5}(\theta) = 1.0 + 0.5 \times \sin^{1.5}(0°) = 1.0000
$$

*AISC Spec. Eq. J2-5 — directional strength increase factor*

### 7.2 Fillet Weld Shear Capacity (Both Sides of Web)

$$
\phi R_n = \phi_w \cdot 0.6 F_{exx} \cdot \frac{1}{\sqrt{2}} \cdot \frac{D}{16} \cdot l \cdot k_{ds} \cdot 2
$$

*AISC Spec. Eq. J2-4 / AISC Manual Table 8-1 — fillet weld unit strength*

$$
\phi R_n = 0.75 \times 0.6 \times 70 \times \frac{1}{\sqrt{2}} \times \frac{4}{16} \times 10.875 \times 1.0 \times 2 = 121.1141\text{ k}
$$

*AISC Manual Eq. 8-1*

$$
\text{Utilization} = \frac{V}{\phi R_n} = \frac{10}{121.1141} = 0.082567 \leq 1.0
$$

*Utilization ratio ≤ 1.0 required for LRFD compliance*

**Result:** Utilization = 0.0826 $\leq$ 1.0 — **GOOD**

---

## 8. Interaction Check — Axial and Moment

This section evaluates the load eccentricity and confirms the compression zone dimension $Y$ under combined axial force and moment. When the eccentricity is small relative to the plate length, the full base plate remains in compression.

### 8.1 Eccentricity

$$
e = \frac{M_r}{P_r} \times 12 = \frac{1}{200} \times 12 = 0.0600\text{ in}
$$

*AISC DG1 Eq. 4-39 — load eccentricity*

### 8.2 Maximum Bearing Pressure

$$
q_{max} = \min\!\left(\phi_c \cdot 1.7 f'_c,\;\; \phi_c \cdot 0.85 f'_c \sqrt{\frac{A_2}{A_1}}\right) \div 1000
$$

*AISC DG1 Eq. 4-2 — maximum concrete bearing pressure*

$$
q_{max} = \min\!\left(0.65 \times 1.7 \times 3000,\; 0.65 \times 0.85 \times 3000 \times \sqrt{\frac{14573}{273}}\right) \div 1000 = 3.3150\text{ k/in}^2
$$

*AISC DG1 Eq. 4-2*

### 8.3 Compression Zone Length

$$
Y = \frac{P_u}{q_{max}} = \frac{200}{3.3150} = 60.3318\text{ in}
$$

*AISC DG1 Eq. 4-42 — compression zone length*

Since $Y = 60.3318$ in $> N = 19.5$ in, the full plate length is in compression, confirming the base plate is in pure compression with small eccentricity. No anchor rod tension governs.

---

## 9. Friction and Bolt Shear (Combined Check)

Axial compression on the base plate generates friction at the steel-to-concrete interface. This friction is checked first; if insufficient, the anchor rods are engaged to carry excess shear. The friction coefficient for steel on concrete is $\mu = 0.4$.

### 9.1 Net Concrete Area (with 3-inch Cover)

$$
A_c = (l_f - 6)(w_f - 6) = (144 - 6)(144 - 6) = 19044\text{ in}^2
$$

*AISC DG1 §4.6 — net concrete area assuming 3-in cover on all sides*

### 9.2 Friction Shear Capacity

$$
\phi V_n = \min\!\left(\phi_f \mu P_u,\;\; \min\!\left(\phi_v \cdot 0.2 f'_c A_c,\;\; \phi_v \cdot 800 A_c\right)\right)
$$

*AISC DG1 Eq. 4-30 — friction shear capacity*

$$
\phi V_n = \min\!\left(0.65 \times 0.4 \times 200000,\;\; \min\!\left(0.75 \times 0.2 \times 3000 \times 19044,\;\; 0.75 \times 800 \times 19044\right)\right)
$$

$$
\phi V_n = 52000\text{ lb} = 52.000\text{ k}
$$

*AISC DG1 Eq. 4-30*

$$
\text{Friction utilization} = \frac{V}{\phi V_n} = \frac{10}{52.000} = 0.1923 \leq 1.0
$$

*Utilization ≤ 1.0 → all shear carried by friction*

Friction alone is sufficient. **All shear is resisted by friction.** — **GOOD**

Anchor bolt shear utilization = 0 (no bolt shear demand) — **GOOD**

---

## 10. Design Summary

| # | Check | Code Reference | Capacity | Demand | Units | Result |
|---|-------|----------------|---------|--------|-------|--------|
| 1 | Concrete Bearing | AISC Spec. J8-2 | 904.995 | 200.0 | k | **GOOD** |
| 2 | Base Plate Yielding | AISC DG1 Eq. 4-10/11 | 1054.69 | 267.45 | lb·ft | **GOOD** |
| 3 | Anchor Rod — Tension | AISC Spec. J3-1 | 75.2535 | 0.0000 | k | **GOOD** |
| 4 | Anchor Rod — Shear | AISC Spec. J3-1 | 55.9633 | 10.0 | k | **GOOD** |
| 5 | Anchor Rod — Bending | AISC Spec. F11-1 | 16.7741 | 12.0 | k·in | **GOOD** |
| 6 | Column-to-BP Weld | AISC Spec. J2-5 | 121.1141 | 10.0 | k | **GOOD** |
| 7 | Friction (shear) | AISC DG1 Eq. 4-30 | 52.000 | 10.0 | k | **GOOD** |

> **All checks GOOD. The base plate connection is adequate for the specified loads.**

---

*Calculation prepared using AISC Steel Construction Manual, 15th Edition and AISC Design Guide 1, 3rd Edition — Base Plate and Anchor Rod Design.*
