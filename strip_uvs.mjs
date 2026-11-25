import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import fs from 'fs';
await MeshoptDecoder.ready; await MeshoptEncoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
const doc = await io.read(process.argv[2]);
let removed = 0, kept = 0;
for (const mesh of doc.getRoot().listMeshes()) for (const prim of mesh.listPrimitives()) {
  const uv = prim.getAttribute('TEXCOORD_0'); if (!uv) continue;
  if (mesh.getName() === 'Ribbon') { kept++; continue; }   // growth reveal reads these UVs
  prim.setAttribute('TEXCOORD_0', null); removed++;
}
await doc.transform(prune({ keepAttributes: true, keepLeaves: true }));
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await io.write(process.argv[3], doc);
console.log({ removed, kept });
