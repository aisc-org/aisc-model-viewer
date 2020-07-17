This page demonstrates calculations to determine the design strength of the WT
tension member, considering the limit states of:

- Tensile yielding
- Tensile rupture
- Block shear rupture

The calculations are based on the 2016 AISC *Specification* and the 15th edition
AISC *Manual*.


Material and Geometric Properties
---------------------------------

The connection consists of a WT8x25 (A992) with the flange connected by six (6)
1" diameter A490 bolts (threads excluded) to a 1" plate (A572 grade 50). $F_y$
and $F_u$ are 50 ksi and 65 ksi respectively for both the WT and the plate.

<figure>
    <img src="./bolted-wt-side.svg">
    <img src="./bolted-wt-top.svg">
    <figcaption>Structural drawing</figcaption>
</figure>

Tensile yielding
----------------

Calculate the nominal strength using AISC *Specification* Equation D2-1.

$$ \begin{align}
    P_n &= F_y A_g \\
        &= (50 \text{ ksi})(7.37 \text{ in.}^2) \\
        &= 368 \text{ kips}
\end{align} $$

Calculate the design strength by applying the resistance factor.

$$
    \phi P_n = 0.9 (368 \text { kips}) \boxed{= 332 \text{ kips}}
$$


Tensile rupture
---------------

Steps:

- Calculate net area $A_n$
- Calculate shear lag factor $U$ and effective net area $A_e$
- Calculate tensile rupture strength

A depiction of tensile rupture failure for this connection is shown in
[this three-dimensional view](#Tensile-rupture).

The net area, $A_n$, is shown in red. It is equal to the gross area minus the
material removed for two bolt holes as defined in Section B4.3b of the AISC
*Specification*.

$$ \begin{align}
    A_n &= A_g - 2(d_h + \tfrac{1}{16}\text{ in.}) t_f \\
        &= 7.37 \text{ in.}^2 - 2 (1 \tfrac{1}{8} \text{ in.}
           + \tfrac{1}{16}\text{ in.}) (0.630 \text{ in.}) \\
        &= 5.87 \text{ in.}^2
\end{align} $$

From the description of the element in AISC *Specification* Table D3.1 Case 2,
calculate the shear lag factor $U$ as the larger of the values from Case 2 and
Case 7.

Case 2, where:

- $\bar{x}$ for WT shapes is $\bar{y}$.
- $l$ is the length of the connection from the centerline of the first row of
  bolts to the centerline of the last row of bolts

<figure>
</figure>

$$ \begin{align}
    U &= 1 - \frac{\bar{x}}{l} \\
      &= 1 - \frac{1.89 \text{ in.}}{6 \text{ in.}} \\
      &= 0.685
\end{align}$$

Case 7; flange has three fasteners per line in the direction of loading:

$$ \begin{align}
    b_f &= 7.07\text{ in.} \\
    \tfrac23 d &= \tfrac23 (8.13\text{ in.}) = 5.42\text{ in.} \\
    b_f &\ge \tfrac23 d \Rightarrow \boxed{U = 0.90}
\end{align} $$

Use the larger $U = 0.90$.

Calculate the effective net area using AISC *Specification* Equation D3-1:

$$ A_e = A_n U = (5.87 \text{ in.}^2) (0.90) = 5.29 \text{ in.}^2 $$

Calculate the nominal strength using AISC *Specification* Equation D2-2:

$$ \begin{align}
    P_n &= F_u A_e \\
        &= (65 \text{ ksi})(5.29 \text{ in.}^2) \\
        &= 344 \text{ kips}
\end{align} $$

Calculate the design strength by applying the resistance factor.

$$\phi P_n = 0.75 (344 \text{ kips}) \boxed{= 258 \text{ kips}}$$


Block shear
-----------

There are three plausible block shear paths for this connection. All plausible
paths have uniform tension stress, so $U_{bs} = 1.0$ for all.

- [Tension in the flange and shear in the web](#Block-shear-1)
- [Tension in the flange and shear along the bolt lines](#Block-shear-2)
- [Tension in the web and flange and shear along the bolt lines](#Block-shear-3)

### Block shear 1

This fundamentally three-dimensional failure does not involve shear in line with
the bolts. Instead, the shear plane is in the web at the toe of the fillet.
Since there are no bolts here, the gross and net shear areas $A_{gv}$ and
$A_{nv}$ are the same:

$$ \begin{align}
    A_{gv} = A_{nv} &= t_w l \\
                    &= (0.380 \text{ in.})(8 \text{ in.}) \\
                    &= 3.04 \text{ in.}^2
\end{align} $$

The gross area subject to tension is most easily calculated by removing the
unaffected web area from the known area of the WT:

$$ \begin{align}
    A_{gt} &= A - t_w (d - k_{des}) \\
           &= 7.37 \text{ in.}^2 - (0.380 \text{ in.})(
               8.13 \text{ in.} - 1.03 \text{ in.}) \\
           &= 4.67 \text{ in.}^2
\end{align} $$

The same area of tensile material is removed in this case as for tensile
rupture.

$$ \begin{align}
    A_{nt} &= A_{gt} - 2(d_h + \tfrac{1}{16}\text{ in.}) t_f \\
           &= 4.67 \text{ in.}^2 - 2 (1 \tfrac{1}{8} \text{ in.}
              + \tfrac{1}{16}\text{ in.}) (0.630 \text{ in.}) \\
           &= 3.18 \text{ in.}^2
\end{align} $$

Calculate the nominal strength using AISC Specification Equation J4-5. Since
$A_{gv} = A_{nv}$, shear yield will control over shear rupture.

$$ \begin{align}
    R_n &= 0.60 F_y A_{gv} + U_{bs} F_u A_{nt} \\
        &= 0.60 (50\text{ ksi})(3.04\text{ in.}^2) + 1.0 (65\text{ ksi})
           (3.18 \text{ in.}^2)\\
        &\boxed{= 298 \text{ kips}}
\end{align} $$

### Block shear 2

Calculate the gross area subject to shear.

$$ \begin{align}
    A_{gv} &= 2 t_f l \\
           &= 2 (0.630 \text{ in.}) (8 \text{ in.}) \\
           &= 10.1 \text{ in.}^2
\end{align} $$

Calculate the net area by removing the material from 4 bolt holes + 2 half bolt
holes.

$$ \begin{align}
    A_{nv} &= A_{gv} - 5 (d_h + \tfrac{1}{16}\text{ in.}) t_f \\
           &= 10.1 \text{ in.}^2 - 5 (1 \tfrac18 \text{ in.}
              + \tfrac{1}{16}\text{ in.}) (0.630 \text{ in.}) \\
           &= 6.34 \text{ in.}^2
\end{align} $$

Calculate the gross area subject to tension.

$$ \begin{align}
    A_{gt} &= (b_f - WG_i) t_f \\
           &= (7.07\text{ in.} - 3.5\text{ in.}) (0.630 \text{ in.}) \\
           &= 2.25 \text{ in.}^2
\end{align} $$

Calculate the net area subject to tension.

$$ \begin{align}
    A_{nt} &= A_{gt} - (d_h + \tfrac{1}{16}\text{ in.}) t_f \\
           &= 2.25 \text{ in.}^2 - (1 \tfrac18 \text{ in.}
              + \tfrac{1}{16}\text{ in.}) (0.630 \text{ in.}) \\
           &= 1.50 \text{ in.}^2
\end{align} $$

Calculate the nominal block shear strength.

$$ \begin{align}
    R_n &= 0.60 F_u A_{nv} + U_{bs} F_u A_{nt} \le
           0.60 F_y A_{gv} + U_{bs} F_u A_{nt} \\
        &= 0.60 (65\text{ ksi}) (6.34 \text{ in.}^2) 
           + 1.0 (65\text{ ksi}) (1.50 \text{ in.}^2) \\
           &\quad\le
           0.60 (50\text{ ksi}) (10.1 \text{ in.}^2)
           + 1.0 (65\text{ ksi}) (1.50 \text{ in.}^2) \\
        &= 247\text{ kips} + 97.5\text{ kips} \le 303\text{ kips} + 97.5\text{ kips} \\
        &\boxed{= 345\text{ kips}}
\end{align} $$


### Block shear 3

The gross and net areas subject to shear are the same as for block shear 2.

$$ \begin{align}
    A_{gv} &= 10.1 \text{ in.}^2\\
    A_{nv} &= 6.34 \text{ in.}^2
\end{align} $$

Calculate the gross area subject to tension.

$$ \begin{align}
    A_{gt} &= A - (b_f - WG_i) t_f \\
           &= 7.37 \text{ in.}^2 - (7.07\text{ in.}
              - 3.5\text{ in.}) (0.630 \text{ in.}) \\
           &= 5.12 \text{ in.}^2
\end{align} $$

Calculate the net area subject to tension.

$$ \begin{align}
    A_{nt} &= A_{gt} - (d_h + \tfrac{1}{16}\text{ in.}) t_f \\
           &= 5.12 \text{ in.}^2 - (1 \tfrac18 \text{ in.}
              + \tfrac{1}{16}\text{ in.}) (0.630 \text{ in.}) \\
           &= 4.37 \text{ in.}^2
\end{align} $$

Calculate the nominal block shear strength.

$$ \begin{align}
    R_n &= 0.60 F_u A_{nv} + U_{bs} F_u A_{nt} \le
           0.60 F_y A_{gv} + U_{bs} F_u A_{nt} \\
        &= 0.60 (65\text{ ksi}) (6.34 \text{ in.}^2) 
           + 1.0 (65\text{ ksi}) (5.12 \text{ in.}^2) \\
           &\quad\le
           0.60 (50\text{ ksi}) (10.1 \text{ in.}^2)
           + 1.0 (65\text{ ksi}) (5.12 \text{ in.}^2) \\
        &= 247\text{ kips} + 333\text{ kips} \le 303\text{ kips} + 333\text{ kips} \\
        &\boxed{= 531\text{ kips}}
\end{align} $$

### Block shear summary

The controlling nominal strength is from block shear 1, with
$R_n = 298\text{ kips}$. Calculate the design strength by applying the
resistance factor.

$$ \begin{align}
    \phi R_n &= 0.75 (298\text{ kips}) \\
             &\boxed{= 223\text{ kips}}
\end{align} $$


Limit state summary
-------------------

The design tensile strength of the WT member is summarized in the following
table.

: Tensile limit state summary

| Limit state         | Design strength |
|:--------------------|----------------:|
| Tensile yielding    |        332 kips |
| Tensile rupture     |        258 kips |
| Block shear rupture |        223 kips |

**Block shear rupture controls with a design strength of 223 kips.**
