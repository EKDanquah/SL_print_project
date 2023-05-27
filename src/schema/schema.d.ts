
export type entityType = {
    created_at?: Date;
    deleted_at?: Date;
    objectId?: string;
};

export type PrintOption = {
    isColored: boolean;
};

export type PrintActivities = 'SEEN' | 'PRINTED' | 'DENSED'|'SEND';
 
export type PrintType = entityType & {
    title: string;
    instruction?: string;
    printFileURL: string[];
    printFileSizes: string[];
    quantity: string;
    printFileType: PrintFileType[];
    printActivities: PrintActivities;
    printColor:PrintColor;
    fromInstitutionId?: string;
    fromInstitutionDepartmentId?: string;
    deadLine?: Date;
};

export type PrintFileType = 'png' | 'pdf' | 'jpg' | 'jpeg' | 'others' | 'docx' | 'slsx';
export type PrintColor = 'black and white' | 'coloured';

export type InstitutionType = entityType & {
    photoUrl: string;
    email: string;
    name: string;
    phoneNumber: string;
    isApproved: boolean;
    // users?: string[];
};

export type InstitutionUsersType = entityType & {
    email: string;
    fname: string;
    lname: string;
    phoneNumber: string;
    isVerified: boolean;
    departmentID?:string
    institutionId?:string
};

export type InstitutionDepartmentType = entityType & {
    title:string,
    institutionID:string
}
  

export type NotificationType=entityType & {
  title:string,
  info:string,
  isSeen:boolean,
   
}
