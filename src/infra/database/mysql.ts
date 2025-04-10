import { Connection, createConnection } from "mysql2/promise";

interface ConnectionConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

export default class Mysql {
    private static instance: Mysql | null = null;
    private static connection: Connection | null = null;

    private constructor() { }

    public static async getInstance(config: ConnectionConfig): Promise<Mysql> {
        if (!this.instance) {
            this.instance = new Mysql();
            if (!this.connection) {
                this.connection = await createConnection(config)
            }
        }
        return this.instance;
    }

    public static getConnection(): Connection {
        if (!Mysql.connection) {
            throw new Error("❌ Connection not initialized");
        }
        return Mysql.connection;
    }

    public async connect() {
        try {
            await Mysql.connection?.connect();
            console.log(`✅ Database connection sucsessfully established: ${Mysql.connection?.config.database}`);
        } catch (error) {
            console.error(error);
        }
    }
}