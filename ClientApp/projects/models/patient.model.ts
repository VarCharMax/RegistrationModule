import { Clinician } from "./clinician.model";
import { Project } from "./project.model";
import { Sex } from "./sex.model";
import { TreatmentLocation } from "./treatmentlocation.model";

export class Patient {
    constructor(
        public patientId?: number,
        public patientUIN?: string,
        public hospitalUR?: string,
        public hospital?: string,
        public firstName?: string,
        public lastName?: string,
        public middle?: string,
        public dob?: Date,
        public estDOB?: string,
        public patientSex?: Sex,
        public medicareNo?: string,
        public postCode?: string,
        public location?: TreatmentLocation,
        public doctor?: Clinician,
        public institution?: string,
        public studyCoordinator?: string,
        public studyCoordinatorPhone?: string,
        public comments?: string,
        public isActive?: boolean,
        public deleteComment?: string,
        public restoreComment?: string,
        public project?: Project,
        public subStudyParticipation?: string,
        public hasConsented?: boolean,
        public consentDate?: Date,
        ) { }
}
