import { UploadResult, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { where } from 'firebase/firestore';
import { PrintDB } from '../firebase/printDB';
import { InstitutionType, PrintType } from '../schema/schema';
import { app, storage } from './firebase';
import { v4 } from 'uuid';

export class MiniatryClass extends PrintDB {
    constructor() {
        super(app, 'ministries');
    }

    async addMinistry(data: InstitutionType) {
        let docId = v4();
        data.objectId=docId;
        return await this.addToDocumentCollection({ docId, data });
    }

    async addUserToMinistry(data: InstitutionType) {
        let docId = v4();
        data.objectId=docId;
        return await this.addToDocumentCollection({ docId, data });
    }

    async addPrintFilesToStorage(files: File[]) {
        const destinationFolder = 'files/res/ministryId';

        return this.uploadFilesAsBatch(files, destinationFolder).then((task) => {
            let downloadRef = task.map(async (_tsk) => {
                return await getDownloadURL(_tsk.ref);
            });
            return Promise.all(downloadRef);
        });
    }

    async getAllMinistries() {
        return this.getDocumentDataByCondition({ conditions: [] }).then((snap) => {
            if (!snap?.empty) {
                return snap?.docs.map((doc) => {
                    return doc.data() as InstitutionType;
                });
            } else {
                return null;
            }
        });
    }

    async getMinistriesById(institutionId?: string) {
        return this.getDocumentDataByCondition({ conditions: institutionId ? [where('objectId', '==', institutionId)] : [] }).then(
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
