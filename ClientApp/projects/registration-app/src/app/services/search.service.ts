import { Subject } from "rxjs";

export class SearchService {
    private isActivated: boolean = false;
    hasSearched: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.hasSearched.subscribe(s => {
            this.isActivated = s;
        });
    }

    canActivate(): boolean {
        return this.isActivated;
    }
}