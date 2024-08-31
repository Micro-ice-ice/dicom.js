import { Age } from './utils/Age';
import { CustomDate } from './utils/CustomDate';
import { CustomTime } from './utils/CustomTime';

interface Attributes {
    patientName?: string;
    patientId?: string;
    patientBirthDate?: CustomDate;
    patientBirthTime?: CustomTime;
    patientSex?: string;

    studyDate?: CustomDate;

    patientAge?: Age;

    sliceThickness?: number;
    spacingBetweenSlices?: number;
    pixelSpacing?: [number, number];

    rows?: number;
    columns?: number;
    bitsAllocated?: number;
    // bitsStored?: number;
    pixelData?: Uint8Array | Uint16Array;

    distanceSourceToDetector?: number;
    distanceSourceToPatient?: number;
    // positionerPrimaryAngle?: number;
    // positionerSecondaryAngle?: number;

    rescaleIntercept?: number;
    rescaleSlope?: number;
    rescaleType?: number;

    windowCenter?: number;
    windowWidth?: number;
    VOILUTFunction?: 'LINEAR' | 'LINEAR_EXACT' | 'SIGMOID';
}

export default Attributes;
