### Usage

```typescript
import { Dicom } from 'dicom';

const dicom = await Dicom.FromFile(files);

if (dicom.attributes.pixelSpacing) {
    const [hx, hy] = dicom.attributes.pixelSpacing;
}
```