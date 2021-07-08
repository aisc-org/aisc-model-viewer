What would be the controlling limit state if the tension member was a WT6x25?

--------------------------------------------------------------------------------

WTs are made by cutting a wide-flange section lengthwise, either in a dedicated shop
or at the jobsite itself.
They are rarely, if ever, hot-rolled as separate sections.
The cut can be achieved in a variety of ways.
Due to residual stresses in the W section, the two pieces will actually bend
and may need to be straightened:

![Bending of tee as the source W section is cut. \[[Source](https://www.youtube.com/watch?v=x3qNUgCmbDY)\]](./bending-of-tee-when-cut.gif)

--------------------------------------------------------------------------------

The block shear pattern with [tension in the flange and shear in the stem](#Block-shear-1)
is a bit out of the ordinary. The AISC *Engineering Journal* published papers that discuss
this sort of failure in [1996](https://www.aisc.org/Block-Shear-of-Structural-Tees-in-Tension-Alternate-Paths)
and [2002](https://www.aisc.org/Block-Shear-Net-Section-Capacities-of-Struct-Tees-in-Tension-Test-Results-Code-Implications).

--------------------------------------------------------------------------------

There are a lot of limit states even for this one connection.
If you are unsure which controls, or if you are writing a design spreadsheet, it is a good idea to check them all.
With experience, you will gain a feel for which limit states control a given connection and simplify your calculations.

--------------------------------------------------------------------------------

What is the strength of the bolt group in this connection?
Remember to consider bearing and tearout in the connected material as well as bolt shear rupture.

--------------------------------------------------------------------------------

This connection has eccentricity -- the centroid of the tension member is offset
from the centroid of the gusset plate. As a result, moments are generated which
may need to be considered in design. Historically, eccentricity has been ignored
for tension members. It cannot be ignored for compression members.

--------------------------------------------------------------------------------

Do you have a fun idea to add to this page? Learn how to contribute it in [the documentation](../docs/#Adding-a-more-fun-item).
