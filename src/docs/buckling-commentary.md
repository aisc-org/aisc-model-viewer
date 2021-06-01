The models in the buckling modes collections are based on the results of elastic
buckling analyses performed using finite element analysis software. The process
of developing each model generally consisted of the following steps:

- Create a finite element model with desired geometry, material properties, and
  boundary conditions.
- Perform elastic buckling analysis.
- Review results and adjust finite element model as necessary to best illustrate
  the desired bucking mode.
- Export nodal coordinates and displacements as well as element connectivity
  data.
- Use exported data to generate graphics model.

The analyses were performed using Abaqus. Each component was meshed with
three-dimensional solid "brick" elements to streamline the conversion to a
graphics model. Custom scripts were developed to convert the finite element
results to a graphics model, using
[Blender's Python API](https://docs.blender.org/api/latest/).

The graphics model is defined by a list of vertices, with the original node
coordinates, the faces drawn between the vertices, and the displacement of each
vertex as computed by the Abaqus analysis. Each solid "brick" element was
converted to 6 quadrilateral faces, or "quads". Since only the exterior of the
member is visible, any quad that was shared between two finite elements---i.e.,
consisting of the same four nodes---was discarded. As part of the glTF export
process, each quad was then split into two triangular faces, or "tris". The
displacements were incorporated using
[shape keys](https://docs.blender.org/manual/en/latest/animation/shape_keys/introduction.html),
which are then morphed to arbitrary scales by the renderer.

Interested in contributing your own model? Here's some tips:

- Zero-width elements cause issues with edge rendering. Make sure all your
  elements have non-zero thickness.
- Before exporting to glTF, recalculate your model’s normals to all point
  outside the mesh.
- Watch for off-by-one errors in node numbering. For example, Abaqus numbers
  nodes starting from 1, but Blender numbers vertices starting from 0.
