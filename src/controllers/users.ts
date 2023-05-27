import { UploadResult, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { where } from 'firebase/firestore';
import { PrintDB } from '../firebase/printDB';
import { InstitutionType, InstitutionUsersType, PrintType } from '../schema/schema';
import { app, storage } from './firebase';
import { v4 } from 'uuid';

export class InstitutionUsersClass extends PrintDB {
    constructor() {
        super(app, 'institution-users');
    }

    async addInstitutionUsers(data: InstitutionUsersType) {
        let docId = v4();
        data.objectId=docId;
        return await this.addToDocumentCollection({ docId, data });
    }
     
 
    async getAllUsersByInstitutionId(institutionId?: string) {
        return this.getDocumentDataByCondition({ conditions: institutionId ? [where('institutionId', '==', institutionId)] : [] }).then(
            (snap) => {
                if (!snap?.empty) {
                    return snap?.docs.map((doc) => {
                        return doc.data() as InstitutionUsersType;
                    });
                } else {
                    return null;
                }
            }
        );
    }

    async getAllUsersByDepartmentId(departmentId?: string) {
        return this.getDocumentDataByCondition({ conditions: departmentId ? [where('departmentID', '==', departmentId)] : [] }).then(
            (snap) => {
                if (!snap?.empty) {
                    return snap?.docs.map((doc) => {
                        return doc.data() as InstitutionUsersType;
                    });
                } else {
                    return null;
                }
            }
        );
    }

}
