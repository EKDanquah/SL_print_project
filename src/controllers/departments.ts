import { UploadResult, getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { where } from 'firebase/firestore';
import { PrintDB } from '../firebase/printDB';
import { InstitutionDepartmentType, InstitutionType, PrintType } from '../schema/schema';
import { app, storage } from './firebase';
import { v4 } from 'uuid';

export class DepartmentClass extends PrintDB {
    constructor() {
        super(app, 'departments');
    }

    async addDepartments(data: InstitutionDepartmentType) {
        let docId = v4();
        data.objectId = docId;
        return await this.addToDocumentCollection({ docId, data });
    }

    async addUserToMinistryDepartment(data: InstitutionType) {
        let docId = v4();
        data.objectId = docId;
        return await this.addToDocumentCollection({ docId, data });
    }

    async getAllDepartments() {
        return this.getDocumentDataByCondition({ conditions: [] }).then((snap) => {
            if (!snap?.empty) {
                return snap?.docs.map((doc) => {
                    return doc.data() as InstitutionDepartmentType;
                });
            } else {
                return null;
            }
        });
    }

    async getAllDepartmentsByMinistry(ministryId: string) {

        return this.getDocumentDataByCondition({ conditions: [where('institutionID', '==', ministryId)] }).then((snap) => {
            if (!snap?.empty) {
                return snap?.docs.map((doc) => {
                    return doc.data() as InstitutionDepartmentType;
                });
            } else {
                return null;
            }
        });
    }

    async getDepartmentsById(institutionId?: string) {
        return this.getDocumentDataByCondition({ conditions: institutionId ? [where('objectId', '==', institutionId)] : [] }).then(
            (snap) => {
                if (!snap?.empty) {
                    return snap?.docs.map((doc) => {
                        return doc.data() as InstitutionDepartmentType;
                    });
                } else {
                    return null;
                }
            }
        );
    }

  
}
