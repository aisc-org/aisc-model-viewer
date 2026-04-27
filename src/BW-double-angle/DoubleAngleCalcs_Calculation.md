# Bolted/Welded Double Angle Connection Calculation

> AISC Steel Construction Manual, 16th Edition  |  LRFD Design Method

## Sample Structure
There is a 6.4klf load on a W18x50 roof joist. The connection from the roof joist to the W18x50 girder is designed as pin-pin, so there is no moment demand. The reaction is 80 kips of vertical shear at the connection. A **double angle** can be used to handle this shear.

## Member Information

| Parameter | Value | Unit |
|-----------|-------|------|
| Connection type | Double angle, bolted to web, welded to beam web | — |
| Angle size | L4X3-1/2X1/2 | — |
| In-plane beam | W18×50 | — |
| Out-of-plane beam | W18×50 | — |
| Bolt type | A325-N, 7/8 in. diameter | — |
| Bolt configuration | 2 rows × 1 bolt(s)/row | — |
| Weld type | SMAW, E70 electrode | — |

## Input Parameters

### Loads
| Parameter | Symbol | Value | Unit | Source |
|-----------|--------|-------|------|--------|
| Factored axial force | $P$ | 0 | k | 3D Model |
| Factored shear | $V$ | 80 | k | 3D Model |

### Material Properties
| Parameter | Symbol | Value | Unit | Reference |
|-----------|--------|-------|------|-----------|
| Ultimate strength – angle | $F_{u,a}$ | 65 | ksi | A572 |
| Ultimate strength – beam | $F_{u,b}$ | 65 | ksi | A992 |
| Yield strength – angle | $F_{y,a}$ | 50 | ksi | A572 |
| Yield strength – beam | $F_{y,b}$ | 50 | ksi | A992 |
| Bolt $\phi F_{nv}$ | $\phi F_{nv}$ | 40.5 | ksi | AISC Table 7-1 |
| Bolt $\phi F_{nt}$ | $\phi F_{nt}$ | 67.5 | ksi | AISC Table 7-2 |
| Nominal bolt tensile stress | $F_{nt}$ | 90 | ksi | AISC Table J3.2 |
| Nominal bolt shear stress | $F_{nv}$ | 54 | ksi | AISC Table J3.2 |
| Weld filler metal | $F_{EXX}$ | 70 | ksi | E70 electrode |

### LRFD Phi Factors
| Factor | Symbol | Value | Applies To |
|--------|--------|-------|------------|
| Yielding | $\phi_y$ | 0.9 | Gross section yielding |
| Fracture | $\phi_f$ | 0.75 | Net section fracture |
| Bolts/Block shear | $\phi_b$ | 0.75 | Bolt shear, bearing, block shear |
| Welds | $\phi_w$ | 0.75 | Fillet weld shear |

### Geometry – Angle (L4X3-1/2X1/2, AISC Table 1-7)
| Parameter | Symbol | Value | Unit |
|-----------|--------|-------|------|
| Angle thickness | $t_a$ | 0.5 | in |
| Long leg | $L_1$ | 3.5 | in |
| Short leg | $L_2$ | 4.0 | in |
| Gross area (one angle) | $A_{g,a}$ | 3.5 | in² |
| Bolt diameter | $d_b$ | 0.875 | in |
| Edge distance – x | $L_{ex}$ | 1.25 | in |
| Edge distance – y | $L_{ey}$ | 1.25 | in |
| Bolt spacing | $s$ | 3.0 | in |
| Gage | $g$ | 5.5 | in |
| Number of rows | $n_{rows}$ | 2 | — |
| Bolts per row | $n_{bolts}$ | 1 | — |

### Geometry – Beam (W18×50, AISC Table 1-1)
| Parameter | Symbol | Value | Unit |
|-----------|--------|-------|------|
| Web thickness | $t_w$ | 0.355 | in |
| $k$-distance | $k$ | 0.972 | in |
| Depth | $d$ | 18.0 | in |
| Gross area | $A_g$ | 14.7 | in² |
| Centroid offset ($k_1$) | $\bar{x}$ | 0.8125 | in |

---

## 1  Derived Quantities

$$R_u = \sqrt{P^2 + V^2} = \sqrt{0^2 + 80^2} = 80.000 \text{ k}$$

**Space required for bolt layout (y-direction):**

$$s_{req} = 2L_{ey} + (n_{rows}-1)\,s = 2(1.25) + (2-1)(3.0) = 5.500 \text{ in}$$

*AISC J3.4*

$$A_b = \frac{\pi}{4}\,d_b^2 = \frac{\pi}{4}(0.875)^2 = 0.601320 \text{ in}^2$$

## 2  Available Space Check

This check confirms there is sufficient clear web height between fillets to accommodate the specified bolt pattern.

$$s_{req} = 5.500 \text{ in}$$

$$s_{avail} = d - 2k = 18.0 - 2(0.972) = 16.0560 \text{ in}$$

*AISC J3.4*

$s_{req} = 5.500$ in $<$ $s_{avail} = 16.0560$ in  →  **GOOD**

## 3  Yielding

Gross section yielding limits the load the connection can transfer before the material begins to deform plastically.

### 3.1  Main Member – Axial/Shear Yielding

$$\phi R_n = \phi_y F_{y,b} A_{g,b} = 0.9(50)(14.7) = 661.50 \text{ k}$$

*AISC Eq. J4-1*

Demand: $R_u = 80.000$ k  →  **GOOD**

### 3.2  Side Member – Shear Yielding

$$\phi R_n = \phi_y F_{y,a} A_{g,a} \times 2 = 0.9(50)(3.5) \times 2 = 315.00 \text{ k}$$

*AISC Eq. J4-2*

Demand: $V = 80$ k  →  **GOOD**

### 3.3  Beam Web – Shear Yield (Informational)

$$A_{gwv} = d \cdot t_w = 18.0(0.355) = 6.3900 \text{ in}^2$$

$$V_n = 0.60\,F_{y,b}\,A_{gwv} = 0.60(50)(6.3900) = 191.70 \text{ k}$$

*AISC Eq. J4-3*

## 4  Fracture

Net section fracture occurs when the applied load exceeds the capacity of the reduced (net) cross-section at the bolt holes.

### 4.1  Side Member Fracture

Net area of angle at bolt hole:

$$A_e = A_g - n_{bolts}(d_b + \tfrac{1}{8})t_a = 3.5 - 1(0.875+0.125)(0.5) = 3.0000 \text{ in}^2$$

*AISC B4.3 / Eq. D3-1*

$$\phi R_n = \phi_f F_{u,a} A_e = 0.75(65)(3.0000) = 146.2500 \text{ k}$$

*AISC Eq. D2-2*

Demand: $\max(P, V) = 80$ k  →  **GOOD**

### 4.2  Main Member Fracture

Net area of W-shape:

$$A_n = A_g - n_{bolts}(d_b + \tfrac{1}{8})t_w = 14.7 - 1(0.875+0.125)(0.355) = 14.3450 \text{ in}^2$$

*AISC B4.3*

Shear lag factor (W-shape, two or more bolts per line):

$$L_{conn} = (n_{rows}-1)\,s = (2-1)(3.0) = 3.000 \text{ in}$$

$$U = 1 - \frac{\bar{x}}{L_{conn}} = 1 - \frac{0.8125}{3.000} = 0.729167$$

*AISC Table D3.1, Case 2*

$$A_e = A_n \cdot U = 14.3450(0.729167) = 10.459896 \text{ in}^2$$

*AISC Eq. D3-1*

$$\phi R_n = \phi_f F_{u,b} A_e = 0.75(65)(10.459896) = 509.9199 \text{ k}$$

*AISC Eq. D2-2*

Demand: $\max(P, V) = 80$ k  →  **GOOD**

## 5  Angle Shear

The outstanding leg of each angle must carry the full shear through both yielding and rupture limit states.

### 5.1  Shear Yielding

$$A_{gv} = s_{req} \cdot t_a \cdot 2 = (5.5)(0.5)(2) = 5.5000 \text{ in}^2$$

$$\phi R_n = 0.60\,F_{y,a}\,A_{gv} = 0.60(50)(5.5000) = 165.000 \text{ k}$$

*AISC Eq. J4-3*

Utilization: $V / \phi R_n = 80/165.000 = 0.4848$  →  **GOOD**

### 5.2  Shear Rupture

$$A_{nv} = s_{req} - n_{rows}(d_b+\tfrac{1}{8})t_a \cdot 2 = 5.5 - 2(1.0)(0.5)(2) = 3.5000 \text{ in}^2$$

$$\phi R_n = \phi_f \cdot 0.60\,F_{u,a}\,A_{nv} = 0.75(0.60)(65)(3.5000) = 102.3750 \text{ k}$$

*AISC Eq. J4-4*

Utilization: $80/102.3750 = 0.7814$  →  **GOOD**

### 5.3  Tension Yielding of Angle Gross Section

$$\phi R_n = \phi_y F_{y,a} A_{g} = 0.9(50)(5.5000) = 247.500 \text{ k}$$

*AISC Eq. J4-1*

Utilization: $80/247.500 = 0.3232$  →  **GOOD**

## 6  Block Shear – Side Member

Block shear is a combined failure mode where a block of material tears out along a shear plane parallel to the bolt line and a tension plane perpendicular to it.

**Gross and net shear areas:**

$$A_{gv} = t_a [L_{ex} + (n_{rows}-1)s] \times 2 = 0.5[1.25+(2-1)(3.0)] \times 2 = 4.2500 \text{ in}^2$$

$$A_{nv} = A_{gv} - 2(n_{rows}-0.5)(d_b+\tfrac{1}{8})t_a = 4.2500 - 2(2-0.5)(1.0)(0.5) = 2.7500 \text{ in}^2$$

*AISC B4.3*

**Gross and net tension areas:**

$$A_{gt} = t_a \cdot L_{ex} = (0.5)(1.25) = 0.6250 \text{ in}^2$$

$$A_{nt} = A_{gt} - \frac{d_b+\tfrac{1}{8}}{2}\,t_a = 0.6250 - \frac{1.0}{2}(0.5) = 0.3750 \text{ in}^2$$

*AISC B4.3*

**Yielding path** (shear yields, tension fractures):

$$\phi R_n = \phi_b[0.60 F_{y,a} A_{gv} + A_{nt} F_{u,a}] = 0.75[0.60(50)(4.2500) + (0.3750)(65)] = 113.90625 \text{ k}$$

*AISC Eq. J4-5*

**Fracture path** (both shear and tension fracture):

$$\phi R_n = \phi_b[0.60 F_{u,a} A_{nv} + A_{nt} F_{u,a}] = 0.75[0.60(65)(2.7500) + (0.3750)(65)] = 98.71875 \text{ k}$$

*AISC Eq. J4-5*

Controlling mechanism: **Fracture** path governs.  $\phi R_n = 98.71875$ k

Demand: $V = 80$ k  →  **GOOD**

## 7  Bolt Shear, Bearing, and Tearout

Bolts are checked for shear rupture, bearing deformation, and tearout through the edge of the connected material. The governing (minimum) capacity at each row position is combined to find the total connection capacity.

**Clear distances:**

$$L_{c1} = L_{ey} - \frac{d_b + \tfrac{1}{16}}{2} = 1.25 - \frac{0.875+0.0625}{2} = 0.78125 \text{ in (edge)}$$

$$L_{c2} = s - (d_b + 0.0675) = 3.0 - (0.875+0.0625) = 2.06250 \text{ in (interior)}$$

*AISC J3.6c — 

### 7.1  Angle Bearing/Tearout

$$\phi r_{n,shear} = \phi F_{nv} A_b \times 2\,\text{planes} \times n_{bolts} = (40.5)(0.601320)(2)(1) = 48.7070 \text{ k}$$

*AISC Eq. J3-1*

$$\phi r_{n,bear} = \phi_b (2.4\,F_{u,a})\,d_b\,t_a \times n_{bolts} \times 2\,\text{angles} = 0.75(2.4)(65)(0.875)(0.5)(1)(2) = 102.3750 \text{ k}$$

*AISC Eq. J3-6a*

$$\phi r_{n,tearout,edge} = \phi_b (1.2\,F_{u,a})\,L_{c1}\,t_a \times n_{bolts} \times 2 = 0.75(1.2)(65)(0.78125)(0.5)(1)(2) = 45.7031 \text{ k}$$

*AISC Eq. J3-6c*

$$\phi r_{n,tearout,intr} = \phi_b (1.2\,F_{u,a})\,L_{c2}\,t_a \times n_{bolts} \times 2 = 0.75(1.2)(65)(2.06250)(0.5)(1)(2) = 120.65625 \text{ k}$$

*AISC Eq. J3-6c*

**Total angle bolt capacity** (edge row + 1 interior rows):

$$\phi R_n = \min(shear,bear,to_{edge}) + \min(shear,bear,to_{intr}) \times (n_{rows}-1)$$
$$= 45.7031 + 48.7070 \times 1 = 94.4101 \text{ k}$$

Utilization: $80/94.4101 = 0.8474$  →  **GOOD**

### 7.2  Beam Web Bearing/Tearout

$$\phi r_{n,bear,bm} = \phi_b (2.4\,F_{u,b})\,d_b\,t_w \times n_{bolts} \times 2 = 0.75(2.4)(65)(0.875)(0.355)(1)(2) = 72.6862 \text{ k}$$

*AISC Eq. J3-6a*

$$\phi r_{n,tearout,edge,bm} = \phi_b (1.2\,F_{u,b})\,L_{c1}\,t_w \times n_{bolts} \times 2 = 0.75(1.2)(65)(0.78125)(0.355)(1)(2) = 32.4492 \text{ k}$$

*AISC Eq. J3-6c*

$$\phi r_{n,tearout,intr,bm} = \phi_b (1.2\,F_{u,b})\,L_{c2}\,t_w \times n_{bolts} \times 2 = 0.75(1.2)(65)(2.06250)(0.355)(1)(2) = 85.6659 \text{ k}$$

*AISC Eq. J3-6c*

$$\phi R_n = 32.4492 + 48.7070 \times 1 = 81.1562 \text{ k}$$

Utilization: $80/81.1562 = 0.9858$  →  **GOOD**

## 8  Shear-Tension Interaction in Bolts

When bolts are loaded in combined shear and tension, the nominal tensile strength must be reduced using the modified tensile stress $F'_{nt}$.

$$f_{rv} = \frac{V}{A_b \cdot n} = \frac{80}{0.601320 \times 4} = 33.2601 \text{ ksi}$$

*AISC J3.7*

$$F'_{nt} = \min\!\left(1.3F_{nt} - \frac{F_{nt}}{\phi_b F_{nv}}\,f_{rv},\; F_{nt}\right) = \min\!\left(1.3(90) - \frac{90}{0.75(54)}(33.2601),\; 90\right) = 43.0886 \text{ ksi}$$

*AISC Eq. J3-2*

$$r_n = F'_{nt}\,A_b = 43.0886(0.601320) = 25.910050 \text{ k/bolt}$$

$$T_n = \phi_f \cdot r_n \cdot n = 0.75(25.910050)(4) = 77.7302 \text{ k}$$

Demand: $P = 0$ k  →  Utilization $= 0/77.7302 = 0.0000$  →  **GOOD**

## 9  Bolt Prying Action

Prying action amplifies the tensile force in bolts when the connected angle leg flexes under axial load, pressing the toe of the angle against the beam web and inducing additional bolt tension.

**Geometric prying parameters:**

$$b = \frac{g - t_w - t_a}{2} = \frac{5.5 - 0.355 - 0.5}{2} = 2.3225 \text{ in}$$

$$a = \min\!\left(\frac{2L_2 + t_w - g}{2},\; 1.25b\right) = \min(1.4275,\; 2.9031) = 1.4275 \text{ in}$$

$$a' = a + \frac{d_b}{2} = 1.4275 + \frac{0.875}{2} = 1.8650 \text{ in}$$

*AISC Eq. 9-23*

$$b' = b - \frac{d_b}{2} = 2.3225 - \frac{0.875}{2} = 1.8850 \text{ in}$$

*AISC Eq. 9-24*

$$\rho = \frac{b'}{a'} = \frac{1.8850}{1.8650} = 1.010724$$

*AISC Eq. 9-29*

$$p = \frac{s_{req}}{n_{rows} \cdot n_{bolts}} = \frac{5.5}{2 \times 1} = 2.7500 \text{ in}$$

$$d' = d_b + \tfrac{1}{16} = 0.875 + 0.0625 = 0.9375 \text{ in}$$

$$\delta = 1 - \frac{d'}{p} = 1 - \frac{0.9375}{2.7500} = 0.659091$$

*AISC Eq. 9-28*

**Required angle thickness to develop full bolt tension without prying:**

$$T_c = \frac{T_n}{n} = \frac{77.7302}{4} = 19.432538 \text{ k/bolt}$$

$$t_c = \sqrt{\frac{4\,T_c\,b'}{\phi_y\,p\,F_{u,a}}} = \sqrt{\frac{4(19.432538)(1.8850)}{0.9(2.7500)(65)}} = 0.954347 \text{ in}$$

*AISC Eq. 9-30*

**Prying severity ratio and reduction factor:**

$$\alpha' = \frac{1}{\delta(1+\rho)}\left[\left(\frac{t_c}{t_a}\right)^2-1\right] = \frac{1}{0.659091(1+1.010724)}\left[\left(\frac{0.954347}{0.5}\right)^2-1\right] = 1.9944$$

*AISC Eq. 9-38*

$\alpha' = 1.9944$ $> 1$, prying action reduces bolt capacity

$$Q = \left(\frac{t_a}{t_c}\right)^2(1+\delta) = \left(\frac{0.5}{0.954347}\right)^2(1+0.659091) = 0.455405$$

*AISC Eq. 9-39c*

$$T_{n,pry} = n \cdot Q \cdot T_c = 4(0.455405)(19.432538) = 35.3987 \text{ k}$$

*AISC Part 9*

Demand: $P = 0$ k  →  Utilization $= 0/35.3987 = 0.0000$  →  **GOOD**

## 10  Weld Sizing – Angle to Beam Web

The fillet welds connecting the angle to the beam web are sized to carry the resultant load $R_u$. The weld is loaded in shear at 45° (combined shear and tension).

$$L_w = 2 \times s_{req} = 2(5.5) = 11.000 \text{ in (total weld length, both angles)}$$

$$D_{min} = 3/16 \text{ in}$$

*AISC Table J2.4*

$$D_{req} = \frac{R_u}{\frac{1}{\sqrt{2}}\,\phi_w (0.6\,F_{EXX})\,L_w} = \frac{80.0000}{\frac{1}{\sqrt{2}}(0.75)(0.6)(70)(11.000)} = 0.326514 \text{ in}$$

*AISC Eq. J2-3*

$$D_w = \max(D_{min},\, \text{ROUNDUP}(D_{req}, \tfrac{1}{16})) = 0.3750 \text{ in} = 6/16\text{"}$$

$D_w = 0.3750$ in $\geq D_{req} = 0.3265$ in  →  **GOOD**

## 11  Summary of All Checks

| Check | Capacity | Demand | Ratio | Result |
|-------|----------|--------|-------|--------|
| Available Space | 16.056 | 5.500 | 0.343 | GOOD |
| MM Yielding | 661.500 | 80.000 | 0.121 | GOOD |
| SM Yielding | 315.000 | 80.000 | 0.254 | GOOD |
| SM Fracture | 146.250 | 80.000 | 0.547 | GOOD |
| MM Fracture | 509.920 | 80.000 | 0.157 | GOOD |
| Angle Shear Yielding | 165.000 | 80.000 | 0.485 | GOOD |
| Angle Shear Rupture | 102.375 | 80.000 | 0.781 | GOOD |
| Angle Tension Yielding | 247.500 | 80.000 | 0.323 | GOOD |
| Block Shear (SM) | 98.719 | 80.000 | 0.810 | GOOD |
| Angle Bolt/Bear./Tearout | 94.410 | 80.000 | 0.847 | GOOD |
| Beam Web Bolt/Bear./Tearout | 81.156 | 80.000 | 0.986 | GOOD |
| Bolt T-V Interaction | 77.730 | 0.000 | 0.000 | GOOD |
| Bolt Prying | 35.399 | 0.000 | 0.000 | GOOD |
| Weld Sizing | 0.375 | 0.327 | 0.871 | GOOD |

**Overall Status: ALL CHECKS PASS**

---

*This calculation was generated by `DoubleAngleCalcs_report.py`. All equations reference AISC Steel Construction Manual, 16th Edition.*