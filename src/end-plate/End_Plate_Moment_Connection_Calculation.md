# End Plate Moment Connection — Structural Calculation

**Project:** Steel Connections Calculator
**Connection Type:** 4-Bolt Unstiffened End-Plate Moment Connection
**Code Reference:** AISC Steel Construction Manual, 15th Edition (unless noted)

## Sample Structure

A 5ft W16x40 beam is cantilevered off a W12x53 column. There is a 1kip point load at the end of the cantilevered beam. The connection is a moment connection, so shear and moment reactions are design considerations. 

## 1. Design Inputs

### 1.1 Applied Loads

| Parameter | Value | Units | Description |
|-----------|------:|-------|-------------|
| V | 1 | kips | Shear reaction (per structural analysis) |
| M | 5 | kip-ft | Moment reaction (per structural analysis) |

### 1.2 Member Sizes

| Member | Size | Source |
|--------|------|--------|
| Beam | W16X40 | Selected section |
| Column | W12X53 | Selected section |

### 1.3 Material Properties

| Parameter | Symbol | Value | Units | Material |
|-----------|--------|------:|-------|----------|
| Ultimate strength (beam/column) | Fu | 65 | ksi | A992 |
| Ultimate strength (end plate) | Fu | 58 | ksi | A36 |
| Yield strength (beam/column) | Fy | 50 | ksi | A992 |
| Yield strength (end plate) | Fy | 36 | ksi | A36 |
| Bolt tensile strength | Fnt | 90 | ksi | A325 |
| Bolt shear strength | Fnv | 54 | ksi | A325 |
| Modulus of elasticity | E | 29000 | ksi | Steel |

### 1.4 LRFD Resistance Factors

| Symbol | Value | Limit State | Reference |
|--------|------:|-------------|-----------|
| phi_y | 0.9 | Yielding | AISC Sect. J4 |
| phi_f | 0.75 | Fracture | AISC Sect. J4 |
| phi_bs | 0.75 | Block shear | AISC Sect. J4-5 |
| phi_w | 0.75 | Welds | AISC Sect. J2 |
| phi_bolt | 0.75 | Bolts | AISC Sect. J3 |

### 1.5 End Plate Geometry

| Parameter | Symbol | Value | Units | Description |
|-----------|--------|------:|-------|-------------|
| Height | h | 26 | in | End plate height (y-direction) |
| Width | w | 16 | in | End plate width (x-direction) |
| Thickness | t | 0.5625 | in | End plate thickness (9/16 in) |

### 1.6 Weld Parameters

| Parameter | Symbol | Value | Units | Description |
|-----------|--------|------:|-------|-------------|
| Weld classification strength | Fexx | 70 | ksi | Filler metal strength |
| Weld size | D | 8 | 1/16-in | Flange and web weld size |
| Flange weld length | l_f | 6.98 | in | Length of flange weld |
| Web weld length | l_w | 15.47 | in | Length of web weld |

### 1.7 Bolt Geometry

| Parameter | Symbol | Value | Units | Description |
|-----------|--------|------:|-------|-------------|
| Bolt diameter | db | 0.75 | in | A325 bolt diameter |
| Gage (x-direction spacing) | g | 3 | in | Horizontal bolt spacing |
| Outer bolt distance | h0 | 24 | in | Compression flange to outer bolt row |
| Inner bolt distance | h1 | 21 | in | Compression flange to inner bolt row |
| Outer bolt pitch | pfo | 2 | in | Vertical pitch, outer bolts |
| Inner bolt pitch | pfi | 2 | in | Vertical pitch, inner bolts |
| Bolts per flange | n | 4 | — | 4-bolt unstiffened connection |
| Edge distance (y) | Ley | 3.77 | in | Edge distance, y-direction |
| Edge distance (x) | Lex | 3.77 | in | Edge distance, x-direction |

### 1.8 Section Properties (AISC Table 1-1)

**Beam — W16X40**

| Property | Value | Units |
|----------|------:|-------|
| Web thickness tw | 0.305 | in |
| Depth d | 16.0 | in |
| Flange thickness tf | 0.505 | in |
| Flange width bf | 7.0 | in |
| k-design | 0.907 | in |

**Column — W12X53**

| Property | Value | Units |
|----------|------:|-------|
| Web thickness tw | 0.345 | in |
| Depth d | 12.1 | in |
| Flange thickness tf | 0.575 | in |
| Flange width bf | 10.0 | in |
| k-design | 1.18 | in |

## 2. Derived Quantities

The moment is resolved into a tension-compression couple acting at the beam flanges:

$$
T = \frac{M}{d_{beam}/12} = \frac{5}{16.0/12} = 3.7500 \text{ k}
$$

*AISC Design Guide 4 — moment resolved to flange force*

Bolt cross-sectional area:

$$
A_b = \frac{\pi}{4} d_b^2 = \frac{\pi}{4}(0.75)^2 = 0.441786\text{ in}^2
$$

*AISC Eq. J3-1*

## 3. Checks

### 3.1 Flange Weld — Tension

This check confirms that the flange-to-end-plate fillet weld can develop the
tensile flange force from the applied moment. The load is perpendicular to the weld,
which increases the weld's nominal strength through the direction-of-loading factor k_ds.

**Angle of loading (perpendicular to flange weld):**

$$
\theta = 90° \rightarrow k_{ds} = 1 + 0.5\sin^{1.5}(90°) = 1 + 0.5(1)^{1.5} = 1.5000
$$

*AISC Spec. Eq. J2-5*

**Nominal weld strength (single weld at top tension flange):**

$$
\phi R_n = \phi_w \cdot 0.6 F_{EXX} \cdot \frac{1}{\sqrt{2}} \cdot \frac{D}{16} \cdot \ell \cdot k_{ds}
$$

$$
\phi R_n = 0.75 \times 0.6 \times 70 \times \frac{1}{\sqrt{2}} \times \frac{8}{16} \times 6.98 \times 1.5 = 116.6037\text{ k}
$$

*AISC Eq. 8-1 (Manual Part 8)*

**Utilization:**

$$
\frac{T}{\phi R_n} = \frac{3.7500}{116.6037} = 0.0322
$$

**Result: GOOD**

### 3.2 Web Weld and Compression Flange Weld — Shear

The applied shear V is resisted by the web weld (load parallel to weld axis)
and the compression flange weld (load perpendicular to weld). Both contributions
are summed for total shear weld capacity.

**Web weld — parallel loading (kds = 1.0):**

$$
k_{ds,web} = 1 + 0.5\sin^{1.5}(0°) = 1.0
$$

*AISC Spec. Eq. J2-5*

$$
\phi R_{n,web} = \phi_w \cdot 0.6 F_{EXX} \cdot \frac{1}{\sqrt{2}} \cdot \frac{D}{16} \cdot \ell_w \cdot k_{ds,web} \cdot 2
$$

$$
\phi R_{n,web} = 0.75(0.6)(70)(\frac{1}{\sqrt{2}})(\frac{8}{16})(15.47)(1.0)(2) = 344.5767\text{ k}
$$

*AISC Eq. 8-1 (factor of 2 for welds on both sides of web)*

**Compression flange weld — perpendicular loading (kds = 1.5):**

$$
\phi R_{n,flg} = 0.75(0.6)(70)(\frac{1}{\sqrt{2}})(\frac{8}{16})(6.98)(1.5)(2) = 233.2074\text{ k}
$$

*AISC Eq. 8-1 (factor of 2 for two sides of compression flange)*

**Total shear capacity and utilization:**

$$
\phi R_{n,total} = 344.5767 + 233.2074 = 577.7840\text{ k}
$$

$$
\frac{V}{\phi R_{n,total}} = \frac{1.0}{577.7840} = 0.0017
$$

**Result: GOOD**

### 3.3 Beam Web Shear

The beam web is checked for the applied shear force. For most compact W-shapes,
the web shear coefficient Cv1 = 1.0 and phi = 1.0 per AISC Section G2.1(a).

**Web shear area:**

$$
A_w = d \cdot t_w = 16.0 \times 0.305 = 4.8800\text{ in}^2
$$

*AISC Sect. G2.1*

**Nominal shear strength (phi = 1.0 for Section G2.1a):**

$$
\phi V_n = 1.0 \cdot 0.6 F_y A_w C_{v1} = 1.0(0.6)(50)(4.8800)(1.0) = 146.4000\text{ k}
$$

*AISC Eq. G2-1*

$$
\frac{V}{\phi V_n} = \frac{1.0}{146.4000} = 0.0068
$$

**Result: GOOD**

### 3.4 End Plate Bolt Yielding — Tension

The bolt group capacity in tension is computed using the moment lever-arm approach.
Each bolt row contributes a force couple proportional to its distance from the
compression flange. The four bolts are arranged in two rows (outer h0, inner h1).

**Bolt cross-sectional area and tensile capacity per bolt:**

$$
R_n = F_{nt} \cdot A_b = 90 \times 0.441786 = 39.760782\text{ k/bolt}
$$

*AISC Eq. J3-1*

**Moment capacity of bolt group (two outer bolts at h0, two inner bolts at h1):**

$$
\phi M_n = \phi_{bolt} \frac{2 R_n h_0 + 2 R_n h_1}{12}
$$

$$
\phi M_n = 0.75\frac{2(39.7608)(24) + 2(39.7608)(21)}{12} = 223.654399\text{ k-ft}
$$

*Segui Eq. 8-10 (lever-arm bolt group method)*

$$
\frac{M}{\phi M_n} = \frac{5.0}{223.6544} = 0.022356
$$

**Result: GOOD**

### 3.5 End Plate Bolt Shear

All shear is assumed conservatively to be transferred through the compression-side
bolt group (n = 4 bolts).

$$
\phi R_n = \phi_{bolt} \cdot F_{nv} \cdot A_b \cdot n = 0.75(54)(0.441786)(4) = 71.569408\text{ k}
$$

*AISC Eq. J3-1*

$$
\frac{V}{\phi R_n} = \frac{1.0}{71.5694} = 0.013972
$$

**Result: GOOD**

### 3.6 Bolt Bearing and Tearout — End Plate

Bolt bearing and tearout govern the maximum shear force that can be transferred
through the bolt holes in the end plate. Two bolt positions are checked: the edge
bolt and interior bolts. The lesser of bearing and tearout controls at each position.

**Clear lengths:**

$$
L_{c1} = L_{ey} - \frac{d_b + 1/8}{2} = 3.77 - \frac{0.75 + 0.125}{2} = 3.3325\text{ in}
$$

*AISC Eq. J3-6c (edge bolt clear distance)*

$$
L_{c2} = p_{fo} + p_{fi} + t_f - (d_b + 1/8) = 2 + 2 + 0.505 - (0.75 + 0.125) = 3.6300\text{ in}
$$

*AISC Eq. J3-6c (interior bolt clear distance)*

**Edge bolt — bearing vs. tearout:**

$$
\phi R_{n,bearing1} = \phi_{bolt}(1.2 F_u)(L_{c1})(t) = 0.75(1.2)(58)(3.3325)(0.5625) = 97.8505\text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi R_{n,tearout1} = \phi_{bolt}(2.4 F_u)(d_b)(t) = 0.75(2.4)(58)(0.75)(0.5625) = 44.0437\text{ k}
$$

*AISC Eq. J3-6a*

Controlling at edge bolt: **TEAROUT** (lesser value governs)

**Interior bolt — bearing vs. tearout:**

$$
\phi R_{n,bearing2} = \phi_{bolt}(1.2 F_u)(L_{c2})(t) = 0.75(1.2)(58)(3.6300)(0.5625) = 106.5859\text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi R_{n,tearout2} = \phi_{bolt}(2.4 F_u)(d_b)(t) = 0.75(2.4)(58)(0.75)(0.5625) = 44.0437\text{ k}
$$

*AISC Eq. J3-6a*

Controlling at interior bolt: **TEAROUT**

**Total plate bearing/tearout capacity (2 edge + (n-1) interior positions):**

$$
V_u = 2 \cdot \min(R_{n,edge}) + (n-1)\cdot\min(R_{n,int})
$$

$$
V_u = 2(44.0437) + (2-1)(44.0437) = 132.1312\text{ k}
$$

*AISC Sect. J3.10*

$$
\frac{V}{V_u} = \frac{1.0}{132.1312} = 0.007568
$$

**Result: GOOD**

### 3.7 Bolt Bearing — Column Flange

The column flange is checked for bearing stress at the bolt holes.
The interior bolt clear distance is used with column flange properties.

$$
L_{c2,col} = p_{fo} + p_{fi} + t_{f,beam} - (d_b + 1/8) = 2 + 2 + 0.505 - (0.75 + 0.125) = 3.6300\text{ in}
$$

*AISC Eq. J3-6c*

$$
\phi R_{n,bearing} = \phi_{bolt}(1.2 F_{u,col})(L_{c2})(t_{f,col}) = 0.75(1.2)(65)(3.6300)(0.575) = 122.1041\text{ k}
$$

*AISC Eq. J3-6c*

$$
\phi R_{n,crushing} = 2.4 t_{f,col} d_b F_{u,col} \phi_{bolt} = 2.4(0.575)(0.75)(65)(0.75) = 50.4562\text{ k}
$$

*AISC Eq. J3-6a*

$$
V_u = n \cdot \min(\phi R_{n,bearing},\, \phi R_{n,crushing}) = 2 \times 50.4562 = 100.9125\text{ k}
$$

*AISC Sect. J3.10*



$$
\text{Utilization} = \frac{V}{V_u} = \frac{1}{100.9125} = 0.00743218
$$

**Result: GOOD**

### 3.8 End Plate Yielding

The end plate is checked for flexural yielding using the yield-line mechanism.
The yield-line parameter Yp characterizes the plate's plastic collapse geometry.

**Yield-line geometry parameter s:**

$$
s = \max\!\left(p_{fi},\; \frac{1}{2}\sqrt{w \cdot g}\right) = \max\!\left(2,\; \frac{1}{2}\sqrt{16\times3}\right) = 3.464102\text{ in}
$$

*AISC Design Guide 4*

**Yield-line parameter:**

$$
Y_p = \frac{w}{2} = \frac{16}{2} = 8.0000\text{ in}^3
$$

*AISC Design Guide 4, Eq. 3.4 (simplified )*

**End plate moment capacity:**

$$
\phi M_n = \frac{\phi_y F_y Y_p t^2}{12} = \frac{0.9(36)(8.0000)(0.5625)^2}{12} = 6.834375\text{ k-ft}
$$

*AISC Design Guide 4 / Segui Eq. 8.14*

$$
\frac{M}{\phi M_n} = \frac{5.0}{6.834375} = 0.731596
$$

**Result: GOOD** — Plate thickness t = 9/16 in is insufficient for the yield-line mechanism.
Increase plate thickness or revise bolt layout. (This flag is partly due to the simplified Yp = w/2.)

### 3.9 Column Stiffener Plate Check

The column is checked for three concentrated-load limit states at the location
of the beam flange force. If all three capacities exceed the flange tension force,
no stiffener plate is required.

**Flange bending capacity:**

$$
\phi R_n = 0.9 \times 6.25 F_{yf} t_f^2 = 0.9(6.25)(50)(0.575)^2 = 92.988281\text{ k}
$$

*AISC Eq. J10-1*

**Web yielding capacity (conservative: load at distance d from end):**

$$
\phi R_n = 1.0 \cdot F_{yw} t_w (2.5k + \ell_b) = 1.0(50)(0.345)(2.5(1.18)+16) = 326.887500\text{ k}
$$

*AISC Eq. J10-3*

**Web crippling capacity (lb/d > 0.2, force at d from end):**

$$
\phi R_n = 0.75(0.4)t_w^2\!\left[1+\left(\frac{4\ell_b}{d}-0.2\right)\!\left(\frac{t_w}{t_f}\right)^{1.5}\right]\!\sqrt{\frac{EF_{yw}t_f}{t_w}}\,Q_f
$$

$$
\phi R_n = 0.75(0.4)(0.345)^2[1+(5.0893)(0.4648)](1554.5632)(1.0) = 186.804813\text{ k}
$$

*AISC Eq. J10-5b*

**Governing capacity and utilization:**

$$
\phi R_{n,\min} = \min(92.9883, 326.8875, 186.8048) = 92.988281\text{ k}
$$

$$
\frac{T}{\phi R_{n,\min}} = \frac{3.7500}{92.988281} = 0.04032766
$$

*AISC Sect. J10*

**Result: NO STIFFENER REQUIRED**

## 4. Summary of All Checks

| Sect. | Check | Capacity | Demand | Utilization | Result |
|-------|-------|----------|--------|-------------|--------|
| 3.1 | Flange Weld (Tension) | 116.604 k | 3.750 k | 0.0322 | **GOOD** |
| 3.2 | Web+Flange Weld (Shear) | 577.784 k | 1.000 k | 0.0017 | **GOOD** |
| 3.3 | Beam Web Shear | 146.400 k | 1.000 k | 0.0068 | **GOOD** |
| 3.4 | Bolt Yielding (Tension) | 223.654 k-ft | 5.000 k-ft | 0.0224 | **GOOD** |
| 3.5 | Bolt Shear | 71.569 k | 1.000 k | 0.0140 | **GOOD** |
| 3.6 | Bolt Bearing/Tearout (Plate) | 132.131 k | 1.000 k | 0.0076 | **GOOD** |
| 3.7 | Bolt Bearing (Column) | 100.912 k | 1.000 k | 0.0099 | **GOOD** |
| 3.8 | End Plate Yielding | 6.834 k-ft | 5.000 k-ft | 0.7316 | **GOOD** |
| 3.9 | Column Stiffener | 92.988 k | 3.750 k | 0.0403 | **NO STIFFENER REQUIRED** |


---

*All calculations per AISC Steel Construction Manual, 15th Edition.*
*Beam: W16X40 (A992, Fy=50 ksi, Fu=65 ksi) | Column: W12X53 (A992)*
*End Plate: A36 (Fy=36 ksi, Fu=58 ksi) | Bolts: A325-N*