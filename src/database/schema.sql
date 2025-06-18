
-- Sports Hub Database Schema
-- MySQL/MariaDB Database Schema for Sports Booking Platform

CREATE DATABASE IF NOT EXISTS sports_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sports_hub;

-- Users table for authentication
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    phone VARCHAR(20),
    avatar_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clients table for customer management
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female'),
    address TEXT,
    emergency_contact VARCHAR(20),
    notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Activities table for sports activities
CREATE TABLE activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    type ENUM('swimming', 'field') NOT NULL,
    category VARCHAR(50), -- e.g., 'private', 'group', 'school'
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 60,
    capacity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    requirements TEXT,
    location VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bookings table for reservation management
CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    activity_id INT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_hours DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    status ENUM('pending', 'confirmed', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_status ENUM('unpaid', 'partial', 'paid', 'refunded') DEFAULT 'unpaid',
    notes TEXT,
    booking_reference VARCHAR(20) UNIQUE,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Payments table for financial transactions
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    client_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_type ENUM('cash', 'card', 'bank_transfer', 'online') NOT NULL,
    payment_method VARCHAR(50), -- e.g., 'visa', 'mastercard', 'stc_pay'
    transaction_id VARCHAR(100),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    processed_by INT,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Notifications table for tracking sent messages
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('telegram', 'whatsapp', 'email', 'sms') NOT NULL,
    recipient VARCHAR(100) NOT NULL, -- phone number, email, or chat_id
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('pending', 'sent', 'failed', 'delivered') DEFAULT 'pending',
    booking_id INT NULL,
    client_id INT NULL,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- Settings table for application configuration
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value_text TEXT,
    value_number DECIMAL(15,4),
    value_boolean BOOLEAN,
    description TEXT,
    category VARCHAR(50) DEFAULT 'general',
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for better performance
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_client ON bookings(client_id);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_status ON notifications(status);

-- Insert default admin user
INSERT INTO users (name, email, password_hash, role) VALUES 
('مدير النظام', 'admin@sportshub.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample activities
INSERT INTO activities (name, type, category, description, duration_minutes, capacity, price) VALUES 
('سباحة خاصة', 'swimming', 'private', 'حصة سباحة خاصة مع مدرب', 60, 1, 100.00),
('سباحة حرة', 'swimming', 'free', 'سباحة حرة في الحوض العام', 60, 20, 30.00),
('مدرسة سباحة', 'swimming', 'school', 'دروس سباحة للمبتدئين', 45, 8, 80.00),
('ملعب كرة قدم', 'field', 'football', 'ملعب كرة قدم عشبي', 90, 22, 200.00),
('ملعب كرة سلة', 'field', 'basketball', 'ملعب كرة سلة مغطى', 60, 10, 120.00),
('ملعب تنس', 'field', 'tennis', 'ملعب تنس احترافي', 60, 4, 150.00);

-- Insert sample settings
INSERT INTO settings (key_name, value_text, description, category) VALUES 
('site_name', 'Sports Hub', 'اسم الموقع', 'general'),
('contact_phone', '+966501234567', 'رقم التواصل الرئيسي', 'contact'),
('contact_email', 'info@sportshub.com', 'البريد الإلكتروني للتواصل', 'contact'),
('working_hours', '06:00-23:00', 'ساعات العمل', 'general'),
('advance_payment_percentage', NULL, 50.0, 'نسبة الدفع المقدم', 'payment'),
('cancellation_hours', NULL, 24.0, 'عدد الساعات المسموحة للإلغاء', 'booking');

-- Sample client data
INSERT INTO clients (name, email, phone, gender) VALUES 
('أحمد محمد علي', 'ahmed@example.com', '+966501111111', 'male'),
('فاطمة سالم', 'fatima@example.com', '+966502222222', 'female'),
('خالد عبدالله', 'khaled@example.com', '+966503333333', 'male'),
('نورا أحمد', 'nora@example.com', '+966504444444', 'female');

-- Grant privileges (adjust as needed)
-- GRANT ALL PRIVILEGES ON sports_hub.* TO 'sports_user'@'localhost' IDENTIFIED BY 'sports_password';
-- FLUSH PRIVILEGES;
