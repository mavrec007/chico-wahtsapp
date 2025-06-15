
-- Sports Activity Booking Platform Database Schema

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS confirmed_bookings;
DROP TABLE IF EXISTS pending_bookings;
DROP TABLE IF EXISTS field_activities;
DROP TABLE IF EXISTS swimming_activities;
DROP TABLE IF EXISTS clients;

-- Clients table: store client details
CREATE TABLE clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100),
    address TEXT,
    national_id VARCHAR(20),
    is_registered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_phone (phone_number),
    INDEX idx_national_id (national_id)
);

-- Swimming Activities table: store swimming pool activity types and schedules
CREATE TABLE swimming_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    activity_type ENUM('open_session', 'private_session') NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    available_hours JSON NOT NULL, -- Store available time slots as JSON array
    duration_minutes INT DEFAULT 60,
    max_participants INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Field Activities table: store sports fields and their rental details
CREATE TABLE field_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_type ENUM('football', 'basketball', 'tennis', 'volleyball') NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    available_hours JSON NOT NULL, -- Store available time slots as JSON array
    duration_minutes INT DEFAULT 60,
    max_participants INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Pending Bookings table: store bookings awaiting payment confirmation
CREATE TABLE pending_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    client_id INT NOT NULL,
    activity_type ENUM('field', 'swimming') NOT NULL,
    activity_id INT NOT NULL, -- References either field_activities.id or swimming_activities.id
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending_payment', 'payment_submitted', 'expired') DEFAULT 'pending_payment',
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_client (client_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status),
    INDEX idx_reference (booking_reference)
);

-- Confirmed Bookings table: store confirmed bookings
CREATE TABLE confirmed_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    client_id INT NOT NULL,
    activity_type ENUM('field', 'swimming') NOT NULL,
    activity_id INT NOT NULL, -- References either field_activities.id or swimming_activities.id
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    payment_id INT,
    confirmed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_client (client_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_reference (booking_reference)
);

-- Payments table: store client payment transfers with transaction details
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pending_booking_id INT NOT NULL,
    client_id INT NOT NULL,
    transaction_reference VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('bank_transfer', 'card', 'cash', 'other') DEFAULT 'bank_transfer',
    status ENUM('submitted', 'verified', 'confirmed', 'rejected') DEFAULT 'submitted',
    bank_name VARCHAR(100),
    account_number VARCHAR(50),
    payment_date TIMESTAMP,
    verified_by_admin INT, -- Admin user ID who verified the payment
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pending_booking_id) REFERENCES pending_bookings(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    INDEX idx_pending_booking (pending_booking_id),
    INDEX idx_client (client_id),
    INDEX idx_status (status),
    INDEX idx_transaction_ref (transaction_reference)
);

-- Insert sample swimming activities
INSERT INTO swimming_activities (activity_type, name, description, price_per_hour, available_hours, max_participants) VALUES
('open_session', 'فترة حرة', 'فترة سباحة حرة للجميع', 50.00, '["10:00", "12:00", "14:00", "16:00", "18:00"]', 20),
('private_session', 'جلسة خاصة', 'جلسة سباحة خاصة', 150.00, '["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"]', 5);

-- Insert sample field activities
INSERT INTO field_activities (field_type, name, description, price_per_hour, available_hours, max_participants) VALUES
('football', 'ملعب كرة قدم', 'ملعب كرة قدم بحجم قانوني', 200.00, '["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]', 22),
('basketball', 'ملعب كرة سلة', 'ملعب كرة سلة داخلي', 150.00, '["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"]', 10),
('tennis', 'ملعب تنس', 'ملعب تنس مع إضاءة', 100.00, '["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"]', 4);
