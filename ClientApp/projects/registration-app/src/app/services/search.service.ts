import { Subject } from "rxjs";

export class SearchService {
    private isActivated: boolean = false;
    hasSearched: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.hasSearched.subscribe(s => {
            this.isActivated = s;
            console.log('Patient tab activated!');
        });
    }

    canActivate(): boolean {
        return this.isActivated;
    }
}