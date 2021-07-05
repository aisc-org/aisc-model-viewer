Commentary
==========

The models in this collection depict different buckling modes for a square
hollow structural section (HSS) column.

There are fewer distinct buckling modes for this shape as compared to a wide
flange column. One reason is that the square HSS is rotationally symmetric, so
there is no difference between flexural buckling about the different axes or
between local buckling of the different walls. Another reason is that the square
HSS is a closed cross section with high torsional stiffness, so torsional
buckling is not a relevant mode.

For a square HSS column, the relevant buckling modes are flexural buckling
\([model](./#Flexural-buckling)\) and local buckling
\([model](./#Local-buckling)\). Local buckling need not be considered if the
walls are classified as “nonslender” per Table B4.1a of the AISC
*Specification*. However, local buckling might not affect the strength of the
column even if the walls are classified as “slender.”

The strength of columns with slender elements is governed by Section E7 of the
AISC *Specification*. Local buckling is accounted for using a reduced
cross-sectional area, $A_e$. The reduction in area depends on the slenderness of
the elements (in this case, the walls of the HSS) as well as the critical
stress, $F_{cr}$, computed in accordance with Section E3 or E4. If the column is
long and $F_{cr}$ is low, there may be no reduction at all since the other
buckling mode (in this case, flexural buckling) will occur well before local
buckling. Local buckling is more likely to affect the strength of shorter
columns with higher $F_{cr}$. This is why the column in the
[model depicting local buckling](./#Local-buckling) is shorter than the
[model depicting flexural buckling](./#Flexural-buckling).
