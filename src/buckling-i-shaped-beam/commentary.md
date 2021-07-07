# Commentary

The models in this collection depict different buckling modes for a doubly
symmetric I-shaped plate girder. The girder in these models is constructed with
a flange width and thickness of $b_f = 14~\rm{in.}$ and $t_f = 2~\rm{in.}$,
respectively; and a web depth and thickness of $h = 56~\rm{in.}$ and
$t_w=0.5~\rm{in.}$, respectively. The overall depth of the girder is
$d=60~\rm{in.}$

## Lateral-Torsional Buckling Models

This girder is simply supported and subjected to uniform transverse loads. The
girder is not subjected to axial compression, but the bending moment caused by
the transverse loads generates longitudinal compressive stress in the top half
of the girder. These stresses make the girder susceptible to lateral-torsional
buckling, flange local buckling, and web local buckling.

Lateral-torsional buckling is a type of buckling for a flexural member (e.g.,
beam or girder) involving deflection out of the plane of bending occurring
simultaneously with twist about the shear center of the cross section.

The critical load for flexural buckling of a basic column,
$$P=\frac{\pi^2EI}{L^2},$$ can be derived from differential equations. The
critical moment for lateral-torsional buckling of a basic beam that is simply
supported and has a constant moment diagram can also be derived from
differential equations:

$$M_{o,\text{cr}} = \frac{\pi}{L} \sqrt{EI_yGJ} \sqrt{1 + \frac{\pi^2EC_w}{GJL^2}}$$

It is hard to obtain analytical solutions for cases without a constant moment
diagram. The lateral-torsional buckling modification factor defined in AISC
*Specification* Section F1, $C_b$, is used to approximate the effect of
different loading conditions and extrapolate the results obtained analytically
for the case of uniform moment to a broader range of moment diagrams. Note that
the equation for $M_{o,\text{cr}}$ above is equal to AISC *Specification*
Equation F2-4 times $S_x$ when the unbraced length $L_b=L$ and $C_b=1.0$.

For the unbraced plate girder \([model](./#Lateral-torsional)\), $L_b$ is the
full span of the beam, and $C_b=1.14$ (see AISC *Manual* Table 3-1). Providing
lateral bracing at the midspan \([model](./#Lateral-torsional-(braced))\)
changes the buckled shape and increases the buckling load by both halving $L_b$
and increasing $C_b$ to 1.30 for each of the two unbraced lengths.

## Local Buckling Models

Web and flange local buckling can also affect the strength of an I-shaped beam.
In design, the web and compression flange are classified as either “compact,”
“noncompact,” or “slender” based on the limiting width-to-thickness ratios in
AISC *Specification* Table B4.1b. Elements classified as compact will not
locally buckle before the member reaches its plastic capacity. Therefore, local
buckling of these elements does not affect the available flexural strength.
Elements classified as noncompact or slender may affect the available flexural
strength.

The flange of this girder is quite stocky and would be classified as compact for
any practical yield strength. This means that the load at which the elastic
buckling mode shown in the [model](./#Flange) is much higher than
what it takes to yield the girder, and flange local buckling would not affect
the available strength. Notice how flange local buckling only occurs in the
compression flange (not the tension flange) and near midspan (where the moments
are greatest). Note that the web was restrained in the flange local buckling
model to illustrate the mode more clearly.

The web of this girder is rather thin and would be classified as noncompact for
most grades of steel. There is no calculated limit state for web local buckling
of I-shaped flexural members in the AISC *Specification*. Instead, the
slenderness of the web affects the calculations of the other limit states. The
classification of the web also helps determine which section of AISC
*Specification* Chapter F to use for computing the available strength. Notice
how web local buckling \([model](./#Web)\) only occurs in the top
half of the web where the stress is compressive. Also note the slight ripples in
the flange. Buckling of the web imparts a twisting force on the flange causing
these deformations.

## Shear Buckling Models

Shear forces also generate compressive stress (remember
[Mohr's circle](https://en.wikipedia.org/wiki/Mohr's_circle){target="_blank"
rel="noreferrer"}). One of the principal stresses in the web of the plate girder
is compressive. This stress, which acts at an angle with respect to the
longitudinal axis of the beam, can cause shear buckling.

Transverse stiffeners are used to restrain shear buckling and increase the
available shear strength of I-shaped members with thin webs. Stiffeners are also
used to help transfer large point loads or reactions into the member while
avoiding web local yielding or crippling. Stiffeners used for transferring large
loads are called bearing stiffeners. Notice the differences in the buckling mode
between the
[model with only bearing stiffeners](./#No-transverse-stiffeners) and the
[model with bearing stiffeners and transverse stiffeners](./#With-transverse-stiffeners)).

It is important to note that shear buckling of the web is not the end of the
story. The available strength computed per AISC *Specification* Section G2 is
often greater than the buckling load. This paragraph from the Commentary on
AISC *Specification* Section G2.2 describes it well (emphasis added):

> The panels of the web of a built-up member, bounded on the top and bottom by
> the flanges and on each side by transverse stiffeners, are capable of carrying
> loads far in excess of their web buckling load. Upon reaching the theoretical
> web buckling limit, slight lateral web displacements will have developed.
> These deformations **are of no structural significance**, because other means
> are still present to provide further strength.

Post-buckling capacity is a reality for several, but not all, types of buckling
for structural steel members.
