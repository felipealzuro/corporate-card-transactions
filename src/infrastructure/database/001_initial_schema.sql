-- Create Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    card_last_four_digits VARCHAR(4) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    category_id UUID NOT NULL REFERENCES categories(id),
    transaction_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category_id for faster lookups
CREATE INDEX idx_transactions_category_id ON transactions(category_id);

-- Create index on transaction_date for faster date range queries
CREATE INDEX idx_transactions_date ON transactions(transaction_date);

-- Create index on status for faster status filtering
CREATE INDEX idx_transactions_status ON transactions(status);