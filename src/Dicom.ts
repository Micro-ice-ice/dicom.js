import Attributes from './Attributes';
import { parseDicom } from 'dicom-parser';
import { parseDate } from './utils/CustomDate';
import { parseAge } from './utils/Age';

class Dicom {
    attributes: Attributes;

    private constructor() {
        this.attributes = {};
    }

    private static async ReadDicomFile(file: File): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result as ArrayBuffer);
                } else {
                    reject(new Error('Error reading file'));
                }
            };

            reader.onerror = () => reject(new Error('Error reading file'));

            reader.readAsArrayBuffer(file);
        });
    }

    private parseAttributes(arrayBuffer: ArrayBuffer) {
        try {
            const byteArray = new Uint8Array(arrayBuffer);
            const dataSet = parseDicom(byteArray);

            this.attributes.patientName = dataSet.string('x00100010');
            this.attributes.patientId = dataSet.string('x00100020');
            this.attributes.patientBirthDate = parseDate(dataSet.string('x00100030'));
            this.attributes.patientSex = dataSet.string('x00100040');

            this.attributes.studyDate = parseDate(dataSet.string('x00080020'));

            this.attributes.patientAge = parseAge(dataSet.string('x00101010'));

            this.attributes.sliceThickness = dataSet.string('x00180050')
                ? parseFloat(dataSet.string('x00181110')!)
                : undefined;
            this.attributes.spacingBetweenSlices = dataSet.string('x00181110')
                ? parseFloat(dataSet.string('x00181110')!)
                : undefined;
            this.attributes.pixelSpacing = dataSet.string('x00280030')
                ? (dataSet.string('x00280030')!.split('\\').map(parseFloat) as [number, number])
                : undefined;

            this.attributes.rows = dataSet.uint16('x00280010');
            this.attributes.columns = dataSet.uint16('x00280011');
            this.attributes.bitsAllocated = dataSet.uint16('x00280100');

            switch (this.attributes.bitsAllocated) {
                case 1:
                case 8:
                    this.attributes.pixelData = new Uint8Array(
                        dataSet.byteArray.buffer,
                        dataSet.elements.x7fe00010.dataOffset,
                        dataSet.elements.x7fe00010.length
                    );
                    break;
                case 16:
                    this.attributes.pixelData = new Uint16Array(
                        dataSet.byteArray.buffer,
                        dataSet.elements.x7fe00010.dataOffset,
                        dataSet.elements.x7fe00010.length / 2
                    );
                    break;
                default: {
                    this.attributes.pixelData = undefined;
                    console.warn('Unsupported BitsAllocated:', this.attributes.bitsAllocated);
                }
            }

            // this.attributes.distanceSourceToDetector = dataSet.string('x00181110')
            //     ? parseFloat(dataSet.string('x00181110')!)
            //     : undefined;
            // this.attributes.distanceSourceToPatient = dataSet.string('x00181111')
            //     ? parseFloat(dataSet.string('x00181111')!)
            //     : undefined;
            this.attributes.windowCenter = dataSet.string('x00281050')
                ? parseFloat(dataSet.string('x00281050')!)
                : undefined;
            this.attributes.windowWidth = dataSet.string('x00281051')
                ? parseFloat(dataSet.string('x00281051')!)
                : undefined;
            // this.attributes.VOILUTFunction = dataSet.string('x00280030')
        } catch (error) {
            console.error('Error parsing DICOM file:', error);
        }
    }

    public static async FromFile(file: File) {
        const dicom = new Dicom();

        const arr = await this.ReadDicomFile(file);
        dicom.parseAttributes(arr);

        return dicom;
    }
}

export default Dicom;
