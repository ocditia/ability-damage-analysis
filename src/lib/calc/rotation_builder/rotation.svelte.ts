export class GameTick {
    ability: string | null = null;  // Keeps track of the last time the game was updated
    private extraActions: Array<string | null>;
    private stalledAbility: string | null = null;
    
    
    constructor(extraBarLength: number) {
        // Initialize the extraActions array
        this.extraActions = Array(extraBarLength).fill(null);
    }

    private tick() {
    }

    public setAbility(key: string) {
        // Only update if the value is actually changing
        if (this.ability !== key) {
            this.ability = key;
            return true; // Indicate that the state changed
        }
        return false; // No change
    }

    public setExtraAction(key: string, index: number) {
        // Make sure the extraActions array is initialized
        if (!this.extraActions) {
            this.extraActions = [];
        }
        
        // Make sure the index is valid
        if (index >= this.extraActions.length) {
            // Expand the array if needed
            const newLength = index + 1;
            this.extraActions = [...this.extraActions, ...Array(newLength - this.extraActions.length).fill(null)];
        }
        
        if (this.extraActions[index] !== key) {
            this.extraActions[index] = key;
            return true;
        }
        return false;
    }

    public setStalledAbility(key: string) {
        if (this.stalledAbility !== key) {
            this.stalledAbility = key;
            return true;
        }
        return false;
    }

    public getAbil() {
        return this.ability;
    }

    public getExtraAction(actionIndex: number) {
        // Make sure the extraActions array is initialized
        if (!this.extraActions) {
            return null;
        }
        
        // Make sure the index is valid
        if (actionIndex < 0 || actionIndex >= this.extraActions.length) {
            return null;
        }
        
        return this.extraActions[actionIndex];
    }

    public getStalledAbility() {
        return this.stalledAbility;
    }

    public removeAbility() {
        if (this.ability !== null) {
            this.ability = null;
            return true;
        }
        return false;
    }

    public removeExtraAction(actionIndex: number) {
        // Make sure the extraActions array is initialized
        if (!this.extraActions) {
            return false;
        }
        
        // Make sure the index is valid
        if (actionIndex < 0 || actionIndex >= this.extraActions.length) {
            return false;
        }
        
        if (this.extraActions[actionIndex] !== null) {
            this.extraActions[actionIndex] = null;
            return true;
        }
        return false;
    }
}


export class Rotation {
    private extraBarLength = 12;
    ticks: GameTick[] = [];
    private length: number;
    private version = 0; // Add a version counter to force reactivity

    constructor(durationInTicks: number) {
        this.length = durationInTicks;
        this.ticks = Array(durationInTicks).fill(null).map(() => new GameTick(this.extraBarLength));
    }

    /**
     * Clears the rotation completely
     */
    public clear() {
        this.ticks = Array(this.length).fill(null).map(() => new GameTick(this.extraBarLength));
        this.version++; // Increment version to force reactivity
    }

    public addAbility(key: string, index: number) {
        if (index < this.length) {
            const stateChanged = this.ticks[index].setAbility(key);
            if (stateChanged) {
                // Force reactivity by creating a new array reference
                this.ticks = [...this.ticks];
                this.version++; // Increment version to force reactivity
            }
        }
    }

    public getAbility(tick: number) {
        if (tick >= this.length) {
            return null;
        }
       return this.ticks[tick].getAbil();
    }

    public removeAbility(tick: number) {
        const stateChanged = this.ticks[tick].removeAbility();
        if (stateChanged) {
            // Force reactivity by creating a new array reference
            this.ticks = [...this.ticks];
            this.version++; // Increment version to force reactivity
        }
    }

    public addExtraAction(key: string, index: number, subIndex: number) {
        const stateChanged = this.ticks[index].setExtraAction(key, subIndex);
        if (stateChanged) {
            // Force reactivity by creating a new array reference
            this.ticks = [...this.ticks];
            this.version++; // Increment version to force reactivity
        }
    }

    public getExtraAction(tick: number, subIndex: number) {
        if (tick >= this.length) {
            return null;
        }
       return this.ticks[tick].getExtraAction(subIndex);
    }

    public removeExtraAction(tick: number, subIndex: number) {
        const stateChanged = this.ticks[tick].removeExtraAction(subIndex);
        if (stateChanged) {
            // Force reactivity by creating a new array reference
            this.ticks = [...this.ticks];
            this.version++; // Increment version to force reactivity
        }
    }

    public addStalledAbility(key: string, index: number) {
        const stateChanged = this.ticks[index].setStalledAbility(key);
        if (stateChanged) {
            // Force reactivity by creating a new array reference
            this.ticks = [...this.ticks];
            this.version++; // Increment version to force reactivity
        }
    }

    public getTicks() {
        return this.ticks;
    }
    
    // Add a method to get the version for reactivity tracking
    public getVersion() {
        return this.version;
    }
}

