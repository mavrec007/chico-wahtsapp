
import { db } from '../database/connection';
import { SwimmingActivity, FieldActivity } from '../types/database';

export class ActivityRepository {
  async getSwimmingActivities(): Promise<SwimmingActivity[]> {
    const query = 'SELECT * FROM swimming_activities WHERE is_active = true ORDER BY activity_type, name';
    const results = await db.query(query);
    return results.map((row: any) => this.mapToSwimmingActivity(row));
  }

  async getFieldActivities(): Promise<FieldActivity[]> {
    const query = 'SELECT * FROM field_activities WHERE is_active = true ORDER BY field_type, name';
    const results = await db.query(query);
    return results.map((row: any) => this.mapToFieldActivity(row));
  }

  async getSwimmingActivityById(id: number): Promise<SwimmingActivity | null> {
    const query = 'SELECT * FROM swimming_activities WHERE id = ? AND is_active = true';
    const results = await db.query(query, [id]);
    return results.length > 0 ? this.mapToSwimmingActivity(results[0]) : null;
  }

  async getFieldActivityById(id: number): Promise<FieldActivity | null> {
    const query = 'SELECT * FROM field_activities WHERE id = ? AND is_active = true';
    const results = await db.query(query, [id]);
    return results.length > 0 ? this.mapToFieldActivity(results[0]) : null;
  }

  async getSwimmingActivitiesByType(activityType: 'open_session' | 'private_session'): Promise<SwimmingActivity[]> {
    const query = 'SELECT * FROM swimming_activities WHERE activity_type = ? AND is_active = true';
    const results = await db.query(query, [activityType]);
    return results.map((row: any) => this.mapToSwimmingActivity(row));
  }

  async getFieldActivitiesByType(fieldType: 'football' | 'basketball' | 'tennis' | 'volleyball'): Promise<FieldActivity[]> {
    const query = 'SELECT * FROM field_activities WHERE field_type = ? AND is_active = true';
    const results = await db.query(query, [fieldType]);
    return results.map((row: any) => this.mapToFieldActivity(row));
  }

  private mapToSwimmingActivity(row: any): SwimmingActivity {
    return {
      id: row.id,
      activity_type: row.activity_type,
      name: row.name,
      description: row.description,
      price_per_hour: parseFloat(row.price_per_hour),
      available_hours: JSON.parse(row.available_hours),
      duration_minutes: row.duration_minutes,
      max_participants: row.max_participants,
      is_active: Boolean(row.is_active),
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }

  private mapToFieldActivity(row: any): FieldActivity {
    return {
      id: row.id,
      field_type: row.field_type,
      name: row.name,
      description: row.description,
      price_per_hour: parseFloat(row.price_per_hour),
      available_hours: JSON.parse(row.available_hours),
      duration_minutes: row.duration_minutes,
      max_participants: row.max_participants,
      is_active: Boolean(row.is_active),
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at)
    };
  }
}

export const activityRepository = new ActivityRepository();
