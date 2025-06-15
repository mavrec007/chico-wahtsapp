
import mysql from 'mysql2/promise';
import { config } from '../config/environment';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<mysql.Connection> {
    if (this.connection) {
      return this.connection;
    }

    try {
      this.connection = await mysql.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.username,
        password: config.database.password,
        database: config.database.database,
        charset: 'utf8mb4',
        timezone: '+00:00',
        dateStrings: false,
      });

      console.log('✅ Database connected successfully');
      return this.connection;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      console.log('📴 Database disconnected');
    }
  }

  public async query(sql: string, params?: any[]): Promise<any> {
    const connection = await this.connect();
    try {
      const [results] = await connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('❌ Database query error:', error);
      throw error;
    }
  }

  public async transaction<T>(callback: (connection: mysql.Connection) => Promise<T>): Promise<T> {
    const connection = await this.connect();
    await connection.beginTransaction();
    
    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  }

  public isConnected(): boolean {
    return this.connection !== null;
  }
}

export const db = DatabaseConnection.getInstance();
