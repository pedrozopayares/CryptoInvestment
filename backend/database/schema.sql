-- CryptoInvestment Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS cryptoinvestment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cryptoinvestment;

-- Table: cryptocurrencies
CREATE TABLE IF NOT EXISTS cryptocurrencies (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    cmc_rank INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_symbol (symbol),
    INDEX idx_cmc_rank (cmc_rank)
);

-- Table: prices
CREATE TABLE IF NOT EXISTS prices (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    cryptocurrency_id INT NOT NULL,
    price DECIMAL(20, 8) NOT NULL,
    market_cap BIGINT,
    volume_24h BIGINT,
    percent_change_1h DECIMAL(10, 4),
    percent_change_24h DECIMAL(10, 4),
    percent_change_7d DECIMAL(10, 4),
    last_updated TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_prices_cryptocurrency (cryptocurrency_id) REFERENCES cryptocurrencies(id) ON DELETE CASCADE,
    INDEX idx_crypto_updated (cryptocurrency_id, last_updated),
    INDEX idx_last_updated (last_updated)
);

-- Table: users (optional for authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Table: user_favorites (optional)
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    cryptocurrency_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY fk_favorites_user (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY fk_favorites_cryptocurrency (cryptocurrency_id) REFERENCES cryptocurrencies(id) ON DELETE CASCADE,
    INDEX idx_unique_user_crypto (user_id, cryptocurrency_id)
);

-- Insert some sample cryptocurrencies (for testing)
INSERT IGNORE INTO cryptocurrencies (id, name, symbol, slug, cmc_rank) VALUES
(1, 'Bitcoin', 'BTC', 'bitcoin', 1),
(1027, 'Ethereum', 'ETH', 'ethereum', 2),
(825, 'Tether USDt', 'USDT', 'tether', 3),
(1839, 'BNB', 'BNB', 'bnb', 4),
(5426, 'Solana', 'SOL', 'solana', 5);

-- Show tables
SHOW TABLES;
