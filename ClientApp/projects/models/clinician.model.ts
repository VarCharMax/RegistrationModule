import {TreatmentLocation} from './treatmentlocation.model'

export class Clinician {
    constructor(
        public clinicianId?: number,
        public firstName?: string,
        public lastName?: string,
        public treatmentLocations?: TreatmentLocation[] 
        ) { }
}