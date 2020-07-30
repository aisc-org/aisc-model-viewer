
The HSS in this connection conforms to the [new ASTM A1085 standard](https://www.aisc.org/publications/steel-construction-manual-resources/#37587). 
The A1085 specification has tighter material tolerances and as a result, the full 
nominal wall thickness can be used for design. Tables 1-11, 1-12, and 1-13 in the 
AISC *Manual* are based on a design wall thickness that is 93% of the nominal wall thickness.
Dimensions and properties tables for A1085 can be found on the AISC website
[(PDF)](https://www.aisc.org/globalassets/product-files-not-searched/manuals/a1085-dimension-and-properties_square_7-10-2018.pdf).

--------------------------------------------------------------------------------

What would be the design strength if the HSS conformed to ASTM A500 Gr. C? 

--------------------------------------------------------------------------------

For this particular connection, tensile rupture of the net section of the HSS controls the strength. But
in some applications, such as seismic design, you specifically want *yielding*
to control. This is because yielding of the structural tension member is more ductile and can
dissipate the energy of the earthquake. In order to prevent net-section rupture from
controlling the strength of the connection, reinforcing plates can be welded to the HSS
to increase the cross-sectional area at the point of the connection where the
slot has been cut for the plate:

![Cross-sectional view of reinforced HSS](./reinforced-hss.svg)

![Side view of reinforced HSS](./reinforced-hss-side.svg)

--------------------------------------------------------------------------------

Equation 8-2 in the AISC *Manual* is handy to make quick work of available strength 
calculations for fillet welds. 

--------------------------------------------------------------------------------

Do you have a fun idea to add to this page? Learn how to contribute it in [the documentation](../docs/#Adding-a-more-fun-item).

