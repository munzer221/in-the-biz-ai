-- ================================================
-- Add Industry-Specific Fields to Shifts Table
-- Migration: 20251231_add_industry_fields.sql
-- ================================================

-- This migration adds columns for all industry-specific fields that the AI chat
-- assistant can use when logging shifts for different industries.

-- ============================================
-- RIDESHARE & DELIVERY FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS rides_count INTEGER,
  ADD COLUMN IF NOT EXISTS deliveries_count INTEGER,
  ADD COLUMN IF NOT EXISTS dead_miles DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS fuel_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS tolls_parking DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS surge_multiplier DECIMAL(4, 2),
  ADD COLUMN IF NOT EXISTS acceptance_rate DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS base_fare DECIMAL(10, 2);

-- ============================================
-- MUSIC & ENTERTAINMENT FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS gig_type TEXT,
  ADD COLUMN IF NOT EXISTS setup_hours DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS performance_hours DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS breakdown_hours DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS equipment_used TEXT,
  ADD COLUMN IF NOT EXISTS equipment_rental_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS crew_payment DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS merch_sales DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS audience_size INTEGER;

-- ============================================
-- ARTIST & CRAFTS FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS pieces_created INTEGER,
  ADD COLUMN IF NOT EXISTS pieces_sold INTEGER,
  ADD COLUMN IF NOT EXISTS materials_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS sale_price DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS venue_commission_percent DECIMAL(5, 2);

-- ============================================
-- RETAIL/SALES FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS items_sold INTEGER,
  ADD COLUMN IF NOT EXISTS transactions_count INTEGER,
  ADD COLUMN IF NOT EXISTS upsells_count INTEGER,
  ADD COLUMN IF NOT EXISTS upsells_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS returns_count INTEGER,
  ADD COLUMN IF NOT EXISTS returns_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS shrink_amount DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS department TEXT;

-- ============================================
-- SALON/SPA FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS service_type TEXT,
  ADD COLUMN IF NOT EXISTS services_count INTEGER,
  ADD COLUMN IF NOT EXISTS product_sales DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS repeat_client_percent DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS chair_rental DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS new_clients_count INTEGER,
  ADD COLUMN IF NOT EXISTS returning_clients_count INTEGER,
  ADD COLUMN IF NOT EXISTS walkin_count INTEGER,
  ADD COLUMN IF NOT EXISTS appointment_count INTEGER;

-- ============================================
-- HOSPITALITY FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS room_type TEXT,
  ADD COLUMN IF NOT EXISTS rooms_cleaned INTEGER,
  ADD COLUMN IF NOT EXISTS quality_score DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS shift_type TEXT,
  ADD COLUMN IF NOT EXISTS room_upgrades INTEGER,
  ADD COLUMN IF NOT EXISTS guests_checked_in INTEGER,
  ADD COLUMN IF NOT EXISTS cars_parked INTEGER;

-- ============================================
-- HEALTHCARE FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS patient_count INTEGER,
  ADD COLUMN IF NOT EXISTS shift_differential DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS on_call_hours DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS procedures_count INTEGER,
  ADD COLUMN IF NOT EXISTS specialization TEXT;

-- ============================================
-- FITNESS FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS sessions_count INTEGER,
  ADD COLUMN IF NOT EXISTS session_type TEXT,
  ADD COLUMN IF NOT EXISTS class_size INTEGER,
  ADD COLUMN IF NOT EXISTS retention_rate DECIMAL(5, 2),
  ADD COLUMN IF NOT EXISTS cancellations_count INTEGER,
  ADD COLUMN IF NOT EXISTS package_sales DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS supplement_sales DECIMAL(10, 2);

-- ============================================
-- CONSTRUCTION/TRADES FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS labor_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS subcontractor_cost DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS square_footage DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS weather_delay_hours DECIMAL(5, 2);

-- ============================================
-- FREELANCER FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS revisions_count INTEGER,
  ADD COLUMN IF NOT EXISTS client_type TEXT,
  ADD COLUMN IF NOT EXISTS expenses DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS billable_hours DECIMAL(5, 2);

-- ============================================
-- RESTAURANT ADDITIONAL FIELDS
-- ============================================
ALTER TABLE public.shifts 
  ADD COLUMN IF NOT EXISTS table_section TEXT,
  ADD COLUMN IF NOT EXISTS cash_sales DECIMAL(10, 2),
  ADD COLUMN IF NOT EXISTS card_sales DECIMAL(10, 2);

-- ============================================
-- Add comments for documentation
-- ============================================
COMMENT ON COLUMN public.shifts.rides_count IS 'Number of rides completed (rideshare)';
COMMENT ON COLUMN public.shifts.deliveries_count IS 'Number of deliveries completed (delivery)';
COMMENT ON COLUMN public.shifts.dead_miles IS 'Miles driven without a passenger/delivery';
COMMENT ON COLUMN public.shifts.fuel_cost IS 'Fuel expenses for the shift';
COMMENT ON COLUMN public.shifts.tolls_parking IS 'Tolls and parking fees';
COMMENT ON COLUMN public.shifts.surge_multiplier IS 'Average surge/boost multiplier';
COMMENT ON COLUMN public.shifts.acceptance_rate IS 'Percentage of ride requests accepted';
COMMENT ON COLUMN public.shifts.base_fare IS 'Total base fares before tips';

COMMENT ON COLUMN public.shifts.gig_type IS 'Type of performance: wedding, corporate, club, etc.';
COMMENT ON COLUMN public.shifts.setup_hours IS 'Hours spent setting up';
COMMENT ON COLUMN public.shifts.performance_hours IS 'Hours performing';
COMMENT ON COLUMN public.shifts.breakdown_hours IS 'Hours breaking down equipment';
COMMENT ON COLUMN public.shifts.equipment_used IS 'Equipment used for the gig';
COMMENT ON COLUMN public.shifts.equipment_rental_cost IS 'Cost of rented equipment';
COMMENT ON COLUMN public.shifts.crew_payment IS 'Payment to crew members';
COMMENT ON COLUMN public.shifts.merch_sales IS 'Merchandise sales revenue';
COMMENT ON COLUMN public.shifts.audience_size IS 'Estimated audience size';

COMMENT ON COLUMN public.shifts.pieces_created IS 'Number of pieces created (artist)';
COMMENT ON COLUMN public.shifts.pieces_sold IS 'Number of pieces sold';
COMMENT ON COLUMN public.shifts.materials_cost IS 'Cost of materials used';
COMMENT ON COLUMN public.shifts.sale_price IS 'Total sale price of items';
COMMENT ON COLUMN public.shifts.venue_commission_percent IS 'Commission percentage taken by venue';

COMMENT ON COLUMN public.shifts.items_sold IS 'Number of items sold (retail)';
COMMENT ON COLUMN public.shifts.transactions_count IS 'Number of transactions processed';
COMMENT ON COLUMN public.shifts.upsells_count IS 'Number of successful upsells';
COMMENT ON COLUMN public.shifts.upsells_amount IS 'Revenue from upsells';
COMMENT ON COLUMN public.shifts.returns_count IS 'Number of returns processed';
COMMENT ON COLUMN public.shifts.returns_amount IS 'Value of returned items';
COMMENT ON COLUMN public.shifts.shrink_amount IS 'Shrink/loss amount';
COMMENT ON COLUMN public.shifts.department IS 'Department worked in';

COMMENT ON COLUMN public.shifts.service_type IS 'Type of service provided (salon)';
COMMENT ON COLUMN public.shifts.services_count IS 'Number of services performed';
COMMENT ON COLUMN public.shifts.product_sales IS 'Product sales revenue';
COMMENT ON COLUMN public.shifts.repeat_client_percent IS 'Percentage of repeat clients';
COMMENT ON COLUMN public.shifts.chair_rental IS 'Chair rental fee paid';
COMMENT ON COLUMN public.shifts.new_clients_count IS 'Number of new clients';
COMMENT ON COLUMN public.shifts.returning_clients_count IS 'Number of returning clients';
COMMENT ON COLUMN public.shifts.walkin_count IS 'Number of walk-in clients';
COMMENT ON COLUMN public.shifts.appointment_count IS 'Number of scheduled appointments';

COMMENT ON COLUMN public.shifts.room_type IS 'Type of room (hospitality)';
COMMENT ON COLUMN public.shifts.rooms_cleaned IS 'Number of rooms cleaned';
COMMENT ON COLUMN public.shifts.quality_score IS 'Quality inspection score';
COMMENT ON COLUMN public.shifts.shift_type IS 'Shift type: day, swing, night';
COMMENT ON COLUMN public.shifts.room_upgrades IS 'Number of room upgrades sold';
COMMENT ON COLUMN public.shifts.guests_checked_in IS 'Number of guests checked in';
COMMENT ON COLUMN public.shifts.cars_parked IS 'Number of cars parked (valet)';

COMMENT ON COLUMN public.shifts.patient_count IS 'Number of patients seen';
COMMENT ON COLUMN public.shifts.shift_differential IS 'Shift differential pay';
COMMENT ON COLUMN public.shifts.on_call_hours IS 'Hours on call';
COMMENT ON COLUMN public.shifts.procedures_count IS 'Number of procedures performed';
COMMENT ON COLUMN public.shifts.specialization IS 'Medical specialization';

COMMENT ON COLUMN public.shifts.sessions_count IS 'Number of training sessions';
COMMENT ON COLUMN public.shifts.session_type IS 'Type of session: personal, group, class';
COMMENT ON COLUMN public.shifts.class_size IS 'Average class size';
COMMENT ON COLUMN public.shifts.retention_rate IS 'Client retention percentage';
COMMENT ON COLUMN public.shifts.cancellations_count IS 'Number of cancellations';
COMMENT ON COLUMN public.shifts.package_sales IS 'Package sales revenue';
COMMENT ON COLUMN public.shifts.supplement_sales IS 'Supplement/product sales';

COMMENT ON COLUMN public.shifts.labor_cost IS 'Labor costs (construction)';
COMMENT ON COLUMN public.shifts.subcontractor_cost IS 'Subcontractor costs';
COMMENT ON COLUMN public.shifts.square_footage IS 'Square footage worked';
COMMENT ON COLUMN public.shifts.weather_delay_hours IS 'Hours delayed due to weather';

COMMENT ON COLUMN public.shifts.revisions_count IS 'Number of revisions (freelancer)';
COMMENT ON COLUMN public.shifts.client_type IS 'Client type: new, returning, referral';
COMMENT ON COLUMN public.shifts.expenses IS 'Business expenses for the shift';
COMMENT ON COLUMN public.shifts.billable_hours IS 'Billable hours worked';

COMMENT ON COLUMN public.shifts.table_section IS 'Table section worked (restaurant)';
COMMENT ON COLUMN public.shifts.cash_sales IS 'Cash sales amount';
COMMENT ON COLUMN public.shifts.card_sales IS 'Card sales amount';
