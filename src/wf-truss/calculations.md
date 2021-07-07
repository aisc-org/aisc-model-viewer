Calculations
============

This page demonstrates calculations to determine the design strength of the
diagonal wide-flange members and their connection to the gusset plates.
$\newcommand{\inch}{~{\rm{in.}}}
 \newcommand{\kips}{~{\rm{kips}}}
 \newcommand{\ksi}{~{\rm{ksi}}}
 \newcommand{\sixt}{{\tfrac{1}{16}\inch}}$


Material and Geometric Properties
---------------------------------

The geometry of the connection is shown below.

<figure>
    <img src="./wf-truss-full.svg">
    <img src="./wf-truss-detail.svg">
    <figcaption>2D structural drawing of the connection.</figcaption>
</figure>

The W12x72 conforms to ASTM A992, while the gusset plates conform to ASTM A572
Gr. 50.

From AISC *Manual* Table 2-4, the material properties are as follows:

::: properties :::
|                |
|----------------|
| ASTM A992      |
| $F_y = 50\ksi$ |
| $F_u = 65\ksi$ |
::::::::::::::::::

From AISC *Manual* Table 1-1, the geometric properties are as follows:

::: properties ::::::::::::::::::::::::::::::::::::::::::::::::::
|                     |                    |                    |
|---------------------|--------------------|--------------------|
| W12x72              |                    |                    |
| $A_g = 21.1\inch^2$ | $t_f = 0.670\inch$ | $t_w = 0.430\inch$ |
| $d = 12.3\inch$     | $b_f = 12.0\inch$  |                    |
:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


Tensile Yield
-------------

Calculate the nominal strength using AISC *Specification* Equation D2-1.

$$ \begin{align}
    P_n &= F_y A_g \\
        &= (50 \ksi) (21.1 \inch^2) \\
        &= 1060 \kips \\
\end{align} $$

Calculate the design strength by applying the resistance factor.

$$ \phi P_n = 0.9 (1060 \kips) \boxed{= 950 \kips} $$


Tensile Rupture ([model](#./Tensile-rupture))
---------------

The net area $A_n$ is shown in red. It is equal to the gross area minus the
material removed for four bolt holes as defined in Section B4.3b of the AISC
*Specification*.

$$ \begin{align}
    A_n &= A_g - 4(d_h + \sixt) t_f \\
        &= 21.1\inch^2 - 4 (1\tfrac18\inch + \tfrac18\inch + \sixt) (0.670\inch) \\
        &= 17.6 \inch^2
\end{align} $$

From the description of the element in AISC *Specification* Table D3.1 Case 7,
calculate the shear lag factor, U, as the larger of the values from Case 2 and
Case 7. Note that *Manual*s printed before June 2019 have an error in the figure
for Case 2. [See the errata (PDF)](https://www.aisc.org/globalassets/aisc/publications/standards/errata_15th-ed-manual_june-2019.pdf)

Calculate the shear lag according to Case 2. For wide-flange shapes with the
flanges attached to plates, the eccentricity of the connection $\bar{x}$ is
calculated by considering the W section as two WT sections.

The WT made from a W12x72 is a WT6x36 (divide both the nominal depth
and nominal weight by 2). From AISC *Manual* Table 1-8, $\bar{y} = 1.02\inch$
for a WT6x36.

![Connection length for shear lag.](./wf-truss-lag.svg)

$$ \begin{align}
    U &= 1 - \frac{\bar{x}}{l} \\
      &= 1 - \frac{1.02\inch}{12\inch} \\
      &= 0.915
\end{align} $$

Calculate the shear lag according to Case 7.

$$ (b_f = 12.0\inch) \ge (\tfrac23 d = 4.1\inch) \implies U = 0.90 $$

The larger value is permitted to be used, so use U = 0.915.

Calculate the effective net area using *Specification* Equation D3-1:

$$ A_e = A_n U = (17.6\inch^2) (0.915) = 16.1\inch^2 $$

Calculate the nominal strength using *Specification* Equation D2-2:

$$ \begin{align}
    P_n &= F_u A_e \\
        &= (65 \ksi)(16.1 \inch^2) \\
        &= 1050 \kips
\end{align} $$

Calculate the design strength by applying the resistance factor.

$$ \phi P_n = 0.75(1050 \kips) \boxed{= 784 \kips} $$


Block Shear Rupture ([model](#./Block-shear-rupture))
-------------------

There is only one plausible block shear path for this connection, consisting of
four (4) pieces of the wide-flange shape breaking off.

<!-- ![Highlighting a single "piece".](../assets/placeholder.png) -->

Calculate the gross area subject to shear.

$$ \begin{align}
    A_{gv} &= (4\text{ pieces}) (t_f) (14\inch) \\
           &= (4\text{ pieces}) (0.670\inch) (14\inch) \\
           &= 37.5\inch^2
\end{align} $$

Calculate the net area subject to shear.

$$ \begin{align}
    A_{nv} &= A_{gv} - (4\text{ pieces}) (3\tfrac12\text{ holes}) (0.670\inch) (d_h + \sixt) \\
           &= 37.5\inch^2 - (4) (3\tfrac12) (0.670\inch) (1\tfrac18\inch + \tfrac18\inch + \sixt) \\
           &= 25.2\inch^2
\end{align} $$

Calculate the gross area subject to tension.

$$ \begin{align}
    A_{gt} &= 4 (t_f) (\tfrac{b_f}{2} - 2.75\inch) \\
           &= 4 (0.670\inch) (6.0\inch - 2.75\inch) \\
           &= 8.71 \inch^2
\end{align} $$

Calculate the net area subject to tension.

$$ \begin{align}
    A_{nt} &= A_{gt} - 4\,t_f \cdot \tfrac12(d_h + \sixt) \\
           &= 8.71\inch^2 - 4 (0.670\inch) \cdot \tfrac12 (1\tfrac18\inch + \tfrac18\inch + \sixt) \\
           &= 6.95\inch^2
\end{align} $$

Calculate the nominal block shear strength using *Specification* Equation J4-5.
The tensile stress is uniformly distributed, so use $U_{bs} = 1.0$.

$$ \begin{align}
    R_n &= 0.60 F_u A_{nv} + U_{bs} F_u A_{nt} \le 0.60 F_y A_{gv} + U_{bs} F_u A_{nt} \\
        &= 0.60 (65\ksi) (25.2\inch^2) + (1.0) (65\ksi) (6.95\inch^2) \\
            &\quad\le
            0.60 (50\ksi) (37.5\inch^2) + (1.0) (65\ksi) (6.95\inch^2) \\
        &= 1430\kips \le 1580\kips
        &= 1430\kips
\end{align} $$

Calculate the design strength by applying the resistance factor.

$$ \phi R_n = (0.75) (1430\kips) \boxed{= 1080\kips} $$


Bolt Group Strength
-------------------
The limit states of bolt shear rupture, bearing, and tearout are evaluated 
together to determine the design strength of the bolt group.

For each bolt, an effective strength is calculated as the lowest strength 
from the limit states of bolt shear rupture, bearing, and tearout.

![Bolt numbering scheme used and clear distances for tearout in the plate.](./wf-truss-bolts.svg)

From Table J3.2, the nominal shear strength $F_{nv}$ of single Group B (A490) 
bolt when threads are not excluded from the shear planes is $F_{nv} = 68\ksi$.

### Bolts in Row #1

Calculate the nominal strength for the limit state of bolt shear rupture using 
*Specification* Equation J3-1.

$$ \begin{align}
    r_n &= F_{nv} A_b \\
        &= (68\ksi) \frac{\pi (1\tfrac18\inch)^2}{4} \\
        &= 67.6\kips
\end{align} $$

Calculate the nominal strength for the limit state of bearing on the wide flange
using AISC *Specification* Equation J3-6a.

$$ \begin{align}
    r_n &= 2.4 d t_f F_u \\
        &= (2.4) (1\tfrac18\inch) (0.670\inch) (65\ksi) \\
        &= 117.6\kips
\end{align} $$

Calculate the nominal strength for the limit state of bearing on the gusset plate
using AISC *Specification* Equation J3-6a.

$$ \begin{align}
    r_n &= 2.4 d t F_u \\
        &= (2.4) (1\tfrac18\inch) (1\inch) (65\ksi) \\
        &= 175.5\kips
\end{align} $$

Calculate the nominal strength for the limit state of tearout in the wide flange
using AISC *Specification* Equation J3-6c.

$$ \begin{align}
    l_c &= 2\inch - \tfrac12 d_h\\
        &= 2\inch - \tfrac12 (1\tfrac18\inch + \tfrac18\inch)\\
        &= 1.375\inch
\end{align} $$

$$ \begin{align}
    r_n &= 1.2 l_c t_f F_u \\
        &= (1.2) (1.375\inch) (0.670\inch) (65\ksi) \\
        &= 71.9\kips
\end{align} $$

Calculate the nominal strength for the limit state of tearout in the plate
using AISC *Specification* Equation J3-6c.

$$ \begin{align}
    l_c &= 4\inch - d_h\\
        &= 4\inch - (1\tfrac18\inch + \tfrac18\inch)\\
        &= 2.75\inch
\end{align} $$

$$ \begin{align}
    r_n &= 1.2 l_c t F_u \\
        &= (1.2) (2.75\inch) (1\inch) (65\ksi) \\
        &= 214.5\kips
\end{align} $$

Bolt shear rupture controls. The nominal effective strength of the bolts in row #1 is 67.6 kips.

### Bolts in Rows #2, #3, and #4

The effective strength of bolts in the remaining rows is calculated in the same manner, 
except with different clear distances. Bolt shear rupture controls. 
The nominal effective strength of the bolts in rows #2, #3, and #4 is 67.6 kips.

### Bolt Group

Calculate the nominal effective strength of the bolt group by summing the 
nominal effective strength of each bolt.

$$ R_n = (16~\rm{bolts}) \times (67.6~\rm{kips/bolt}) = 1082\kips $$

Calculate the design strength by applying the resistance factor.

$$ \phi R_n = 0.75 (1082\kips) \boxed{= 811 \kips} $$


Summary
-------

The design strength of the connection is summarized in the following table.

: Tensile limit state summary

| Limit state                               | Design strength |
|:------------------------------------------|----------------:|
| Tensile yielding                          |        950 kips |
| Tensile rupture                           |        784 kips |
| Block shear rupture                       |       1080 kips |
| Bolt shear rupture, bearing, and tearout  |        811 kips |

**Tensile rupture controls with a design strength of 784 kips.**
