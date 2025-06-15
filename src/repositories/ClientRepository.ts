
import { db } from '../database/connection';
import { Client, CreateClientInput, UpdateClientInput } from '../types/database';

export class ClientRepository {
  async findByPhoneNumber(phoneNumber: string): Promise<Client | null> {
    const query = 'SELECT * FROM clients WHERE phone_number = ?';
    const results = await db.query(query, [phoneNumber]);
    return results.length > 0 ? this.mapToClient(results[0]) : null;
  }

  async findById(id: number): Promise<Client | null> {
    const query = 'SELECT * FROM clients WHERE id = ?';
    const results = await db.query(query, [id]);
    return results.length > 0 ? this.mapToClient(results[0]) : null;
  }

  async create(clientData: CreateClientInput): Promise<Client> {
    const query = `
      INSERT INTO clients (phone_number, name, address, national_id, is_registered)
      VALUES (?, ?, ?, ?, ?)
    `;
    const isRegistered = !!(clientData.name && clientData.address && clientData.national_id);
    
    const result = await db.query(query, [
      clientData.phone_number,
      clientData.name || null,
      clientData.address || null,
      clientData.national_id || null,
      isRegistered
    ]);

    const createdClient = await this.findById(result.insertId);
    if (!createdClient) {
      throw new Error('Failed to create client');
    }

    return createdClient;
  }

  async update(id: number, updates: UpdateClientInput): Promise<Client | null> {
    const setParts: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        setParts.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (setParts.length === 0) {
      return this.findById(id);
    }

    // Check if client is now fully registered
    if (updates.name || updates.address || updates.national_id) {
      const existingClient = await this.findById(id);
      if (existingClient) {
        const name = updates.name ?? existingClient.name;
        const address = updates.address ?? existingClient.address;
        const nationalId = updates.national_id ?? existingClient.national_id;
        
        if (name && address && nationalId) {
          setParts.push('is_registered = ?');
          values.push(true);
        }
      }
    }

    values.push(id);
    const query = `UPDATE clients SET ${setParts.join(', ')} WHERE id = ?`;
    
    await db.query(query, values);
    return this.findById(id);
  }

  async findAll(limit = 100, offset = 0): Promise<Client[]> {
    const query = 'SELECT * FROM clients ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const results = await db.query(query, [limit, offset]);
    return results.map((row: any) => this.mapToClient(row));
  }

  async getRegisteredClientsCount(): Promise<number> {
    const query = 'SELECT COUNT(*) as count FROM clients WHERE is_registered = true';
    const results = await db.query(query);
    return results[0].count;
  }

  private mapToClient(row: any): Client {
    return {
      id: row.id,
      phone_number: row.phone_number,
      name: row.name,
      address: row.address,
      national_id: row.national_id,
      is_registered: Boolean(row.is_registered),
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }
}

export const clientRepository = new ClientRepository();
