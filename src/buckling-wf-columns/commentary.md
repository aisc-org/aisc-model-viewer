Commentary 
==========

The models in this collection depict different buckling modes for a W8x31 
column.
$\newcommand{\inch}{~{\rm{in.}}}
 \newcommand{\kips}{~{\rm{kips}}}
 \newcommand{\ksi}{~{\rm{ksi}}}
 \newcommand{\sixt}{{\tfrac{1}{16}\inch}}$

From AISC *Manual* Table 1-1, the geometric properties are as follows:

::: properties :::::::::::::::::::::::::::::::::::::::::::::::::::
|                     |                     |                    |
|---------------------|---------------------|--------------------|
| W8x31               |                     |                    |
| $I_x = 110\inch^4$  | $I_y = 37.1\inch^4$ | $J = 0.536\inch^4$ |
| $r_x = 3.47\inch$   | $r_y = 2.02\inch$   | $C_w = 530\inch^6$ |
| $A = 9.13\inch^2$   | $b_f/2t_f = 9.19$   | $h/t_w = 22.3$     |
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


Minor-axis Flexural Buckling Models
-----------------------------------

Boundary conditions have a significant effect on the flexural buckling strength
of columns. AISC *Specification* [Table C-A-7.1](#Table-C-A-7.1) shows six
different cases with different combinations of basic boundary conditions (i.e.,
rotation and translation either fixed or free at either end of the column).

The table also presents effective length factors, also known as *K* factors.
Notice how the *K* factors vary with the boundary conditions. More restrained
columns have lower *K* factors. Or, more fundamentally, columns with more
restraint have greater buckling loads.

The elastic buckling load for each case is presented below for each column,
with unbraced length, $L = 144\inch$

$$ L_c = KL $$
$$ P_e = \frac{\pi^2 E I}{L_c^2} $$

Case A ([model](#Case-A)):
$$ L_c = (0.5)(144\inch) = 72\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(72\inch)^2} = 2048\kips $$

Case B ([model](#Case-B)):
$$ L_c = (0.7)(144\inch) = 100.8\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(100.8\inch)^2} = 1045\kips $$

Case C ([model](#Case-C)):
$$ L_c = (1.0)(144\inch) = 144\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(144\inch)^2} = 512\kips $$

Case D ([model](#Case-D)):
$$ L_c = (1.0)(144\inch) = 144\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(144\inch)^2} = 512\kips $$

Case E ([model](#Case-E)):
$$ L_c = (2.0)(144\inch) = 288\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(288\inch)^2} = 128\kips $$

Case F ([model](#Case-F)):
$$ L_c = (2.0)(144\inch) = 288\inch $$
$$ P_e = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(288\inch)^2} = 128\kips $$


Braced Column Models
--------------------

Minor-axis flexural buckling often controls the strength of wide-flange columns.
However, if the effective length for buckling about the major axis is greater
than that for minor-axis buckling (i.e., $L_{cx} \geq L_{cy}$), then major-axis
flexural buckling could control and needs to be checked.

Such a condition could occur if a beam frames into the web of the column as
depicted in these models. The axial stiffness of the beam prevents movement of
the column perpendicular to the web and forces an “S” shaped mode for minor-axis
flexural buckling ($L_{cy} = 72\inch$). The beam does not restrain the movement
of the column in the plane of the web, so major-axis flexural buckling occurs as
if the beam was not there at all ($L_{cx} = 144\inch$).

Computing the buckling load for these two modes shows that major-axis flexural 
buckling controls for this case. 

Major-axis flexural buckling ([model](#Major-axis-flexural)):
$$ P_e = \frac{\pi^2 E I_x}{L_{cx}^2} = \frac{\pi^2(29000\ksi)(110\inch^4)}{(144\inch)^2} = 1518\kips $$

Minor-axis flexural buckling ([model](#Minor-axis-flexural)):
$$ P_e = \frac{\pi^2 E I_y}{L_{cy}^2} = \frac{\pi^2(29000\ksi)(37.1\inch^4)}{(72\inch)^2} = 2048\kips $$

Similarly, if the effective length for buckling about the longitudinal axis is
greater than the effective length for minor-axis flexural buckling (i.e.,
$L_{cz} \geq L_{cy}$) then torsional buckling could control. Torsional buckling
is covered in AISC *Specification* Section E4 and applies to wide-flange columns
“when the torsional unbraced length exceeds the lateral unbraced length.”

Depending on the beam stiffness and the beam-to-column connection details, the
beam may not prevent twist of the column. If that is the case, then
$L_{cz} = 144\inch$ and the elastic buckling load can be computed as follows.

Torsional buckling ([model](#Torsional)), using *Specification* equations E4-2
and E4-1:
$$ \begin{aligned}
    F_e &= \left(\frac{\pi^2 E C_w}{L_{cz}^2} + GJ\right) \frac{1}{I_x+I_y} \\
        &= \left(\frac{\pi^2 (29000\ksi) (530\inch^6)}{(144\inch)^2} + (11200\ksi)(0.536\inch^4)\right) \frac{1}{(110\inch^4)+(37.1\inch^4)} \\
        &= 90.5\ksi
\end{aligned} $$

$$ P_e = F_e A_g = (90.5\ksi)(9.13\inch^2) = 826\kips $$


Local Buckling Models
---------------------

Local buckling can affect the strength of wide-flange columns if the flange or
web is classified as slender. AISC *Specification* Table B4.1a specifies
limiting width-to-thickness ratios which are used to classify each element of a
column cross section. If the width-to-thickness ratio of an element is greater
than the limiting ratio, then that element is classified as “slender,” and it is
possible for that element to experience local buckling before yielding. If the
cross section has any slender elements, AISC *Specification* Section E7 should
be used to determine the compressive strength.

Both the web and flange of a W8x31 are nonslender for ASTM A992 (the preferred
material specification for wide-flange shapes). This is the case for most
available wide-flange shapes used as columns.

Note that the web was restrained in the model depicting
[flange local buckling](./#Flange). Similarly, the flange was
restrained in the model depicting [web local buckling](./#Web).
This was done to illustrate each individual buckling mode more clearly.

