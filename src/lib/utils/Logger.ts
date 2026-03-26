export enum LogCategory {
    ABILITY_DAMAGE = 'ABILITY_DAMAGE',
    ROTATION = 'ROTATION',
    GEAR = 'GEAR',
    BUFFS = 'BUFFS',
    SETTINGS = 'SETTINGS'
}

type LoggerConfig = Record<LogCategory, boolean>;

export interface TraceEntry {
    label: string;
    value: number | string;
    explanation: string;
}

export class Logger {
    private static instance: Logger;
    private config: LoggerConfig;
    private tracing: boolean = false;
    private traceEntries: TraceEntry[] = [];

    private constructor() {
        // Initialize all categories as disabled by default
        this.config = Object.values(LogCategory).reduce((acc, category) => {
            acc[category] = false;
            return acc;
        }, {} as LoggerConfig);
        // this.enable(LogCategory.ABILITY_DAMAGE);
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * Enable logging for specific categories
     * @param categories Array of categories to enable
     */
    public enable(...categories: LogCategory[]): void {
        categories.forEach(category => {
            this.config[category] = true;
        });
    }

    /**
     * Disable logging for specific categories
     * @param categories Array of categories to disable
     */
    public disable(...categories: LogCategory[]): void {
        categories.forEach(category => {
            this.config[category] = false;
        });
    }

    /**
     * Enable all logging categories
     */
    public enableAll(): void {
        Object.keys(this.config).forEach(category => {
            this.config[category as LogCategory] = true;
        });
    }

    /**
     * Disable all logging categories
     */
    public disableAll(): void {
        Object.keys(this.config).forEach(category => {
            this.config[category as LogCategory] = false;
        });
    }

    /**
     * Log a message if the category is enabled
     * @param category The logging category
     * @param message The message or object to log
     * @param additionalData Optional additional data to log
     */
    public log(category: LogCategory, message: any, ...additionalData: any[]): void {
        if (this.config[category]) {
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] [${category}]:`, message, ...additionalData);
        }
    }

    /**
     * Start capturing trace entries. Clears any previous trace.
     */
    public startTrace(): void {
        this.traceEntries = [];
        this.tracing = true;
    }

    /**
     * Stop capturing and return the collected trace entries.
     */
    public endTrace(): TraceEntry[] {
        this.tracing = false;
        const entries = this.traceEntries;
        this.traceEntries = [];
        return entries;
    }

    /**
     * Record a structured trace entry (no-op when not tracing).
     */
    public trace(label: string, value: number | string, explanation: string = ''): void {
        if (this.tracing) {
            this.traceEntries.push({ label, value, explanation });
        }
    }

    /**
     * Get the current logger configuration
     */
    public getConfig(): LoggerConfig {
        return { ...this.config };
    }
}

