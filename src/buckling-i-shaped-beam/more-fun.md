The tables in Part 1 of the AISC *Steel Construction Manual* provide the section
properties you need to run calculations for rolled shapes. Can you calculate the
necessary section properties for this built-up shape?

--------------------------------------------------------------------------------

The lateral-torsional buckling modification factor, $C_b$, is approximate. You
can test for yourself just how approximate it is in a virtual experiment using
analysis software (see MASTAN2's
[Learning Module 5](http://www.mastan2.com/stabilityfun.html){target="_blank" rel="noreferrer"}).

--------------------------------------------------------------------------------

The equations for lateral-torsional buckling in the AISC *Specification* assume
that load is applied at the centroid of the cross section. It is more
destabilizing for load to be applied higher, for example at the compression
flange. Researchers have
[proposed different versions](https://www.aisc.org/A-Unified-Approach-to-the-Elastic-Lateral-Buckling-of-Beams){target="_blank" rel="noreferrer"}
of the lateral-torsional buckling modification factor, $C_b$, that account for
this and other effects.

--------------------------------------------------------------------------------

A brace for lateral-torsional buckling needs to be stiff and strong enough to
prevent lateral displacement of the compression flange or twist of the cross
section. Specific requirements can be found in AISC *Specification* Appendix 6.

--------------------------------------------------------------------------------

What is the range of yield strengths for which the web of this plate girder is
noncompact?

--------------------------------------------------------------------------------

Physically testing beams in a lab can be a challenge. Unless you are careful,
the applied loads and lateral bracing can restrain the beam in unwanted ways.
Experimentalists use special mechanisms such as a
[gravity load simulator and Watt's linkage](https://dx.doi.org/10.1007/BF02326237){target="_blank" rel="noreferrer"}
to achieve the intended behavior.

--------------------------------------------------------------------------------

Do you have a fun idea to add to this page? Learn how to contribute it in
[the documentation](../docs/#Adding-a-more-fun-item).
