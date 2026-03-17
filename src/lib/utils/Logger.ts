export enum LogCategory {
    ABILITY_DAMAGE = 'ABILITY_DAMAGE',
    ROTATION = 'ROTATION',
    GEAR = 'GEAR',
    BUFFS = 'BUFFS',
    SETTINGS = 'SETTINGS'
}

type LoggerConfig = Record<LogCategory, boolean>;

export class Logger {
    private static instance: Logger;
    private config: LoggerConfig;

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
     * Get the current logger configuration
     */
    public getConfig(): LoggerConfig {
        return { ...this.config };
    }
} 

