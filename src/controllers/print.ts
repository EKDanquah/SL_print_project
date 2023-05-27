import { UploadResult, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { where } from 'firebase/firestore';
import { PrintDB } from '../firebase/printDB';
import { PrintType } from '../schema/schema';
import { app, storage } from './firebase';
import { v4 } from 'uuid';

export class PrintClass extends PrintDB {
    constructor() {
        super(app, 'printJobs');
    }

    async addPrint(data: PrintType) {
        let docId = v4();
        data.objectId = docId;
        return await this.addToDocumentCollection({ docId, data });
    }

    async addPrintFilesToStorage(files: File[]) {
        const destinationFolder = 'files/toPrint/ministryId';

        return this.uploadFilesAsBatch(files, destinationFolder).then((task) => {
            let downloadRef = task.map(async (_tsk) => {
                return await getDownloadURL(_tsk.ref);
            });
            return Promise.all(downloadRef);
        });
    }

    async getAllPrintJobs(institutionId?: string) {
        return this.getDocumentDataByCondition({ conditions: institutionId ? [where('fromInstitutionId', '==', institutionId)] : [] }).then(
            (snap) => {
                if (!snap?.empty) {
                    return snap?.docs.map((doc) => {
                        return doc.data() as PrintType;
                    });
                } else {
                    return null;
                }
            }
        );
    }

    private async uploadFilesAsBatch(files: File[], destinationFolder: string): Promise<UploadResult[]> {
        const uploadPromises = files.map((file) => {
            const filePath = `${destinationFolder}/${file.name}`;
            const fileRef = ref(storage, filePath);
            return uploadBytes(fileRef, file);
        });
        return await Promise.all(uploadPromises);
    }
}
