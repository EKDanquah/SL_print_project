import { User, UserCredential } from 'firebase/auth';
import { PrintAuth } from '../firebase/printAuth';
import { PrintDB } from '../firebase/printDB';
import { InstitutionType } from '../schema/schema';
import { app } from './firebase';

export class AuthClass extends PrintDB {
    private printAuth = new PrintAuth(app);

    constructor() {
        super(app, 'Institution');
    }

    async addUser(userType: InstitutionType, password: string) {
        let user = (await this.printAuth.emailPasswordSignup(userType.email, password)) as UserCredential;
        return await this.addToDocumentCollection({ docId: user.user.uid, data: userType });
    }

    // async login(userType: InstitutionType, password: string) {
    //     return (await this.printAuth.emailPasswordLogin(userType.email, password)) as User;
    // }
    
}
