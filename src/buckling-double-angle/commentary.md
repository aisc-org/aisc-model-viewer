# Commentary

The models in this collection depict different buckling modes for a 2L4x4x1/4
double-angle compression member. The angles are separated by 3/8 in.

A double angle is a singly symmetric shape. It is symmetric about the y-axis,
but not the x-axis. This means that a double angle is susceptible to
[flexural buckling about the x-axis](./#Flexural-buckling) and
[flexural-torsional buckling](./#Flexural-torsional-buckling).
Flexural-torsional buckling is a mode of buckling in which a compression member
bends and twists simultaneously without change in cross-sectional shape. The
reason for the twist is that the centroid and shear center are not aligned.
Buckling "pushes" the member through the centroid, but the member resists that
push through the shear center. The resulting force couple causes twist.

![Shear center of double angle, offset from centroid.](./double-angle-shear-center.svg)

A double angle is also a built-up shape. Connectors are necessary to make the
two shapes behave as one member. Typically, the two angles of a double-angle
compression member are connected at the ends of the member and a few points
along the length. A single angle acting alone would buckle around its minor
axis, the z-axis. For an L4x4x1/4, the radius of gyration about the minor axis
is $r_z=0.783~\rm{in.}$ and the radii of gyration about the geometric axis are
$r_x=r_y=1.25~\rm{in.}$ For a 2L4x4x1/4, the radius of gyration about the x-axis
is $r_x=1.25~\rm{in.}$, no different than for the single angle. For flexural
buckling, the connectors force buckling about the x-axis, but the strength of
the double angle is otherwise not greater than twice the strength of the single
angle.

For a 2L4x4x1/4 with 3/8 in. separation, the radius of gyration about the y-axis
is $r_y=1.78~\rm{in.}$, greater than that for a single angle. The increased
radius of gyration increases the flexural-torsional buckling strength and is an
indicator that shear forces will develop in the connectors. For modes of
buckling like this, the slenderness of the built-up shape needs to be modified
to account for the imperfect connection between the two shapes if the connector
spacing is large or if the connectors allow slip (e.g., if the connectors are
bolted snug-tight). This modification is described in AISC *Specification*
Section E6.1.

In an extreme case, if the distance between the connectors becomes very large,
it is possible for one of the single angles to buckle on its own between the
connectors before the double angle buckles as a whole
\([model](./#Single-angle-buckling)\).

[Local buckling of the legs](./#Local-buckling) can also occur in double-angle
compression members with slender elements. In the model, out-of-plane moment of
the back-to-back legs was restrained to better distinguish local buckling from
torsional buckling.
