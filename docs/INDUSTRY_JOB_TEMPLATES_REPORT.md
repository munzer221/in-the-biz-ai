# Industry & Job Templates - Comprehensive Report
**Generated:** December 31, 2025  
**Status:** Planning Phase

---

## 📊 CURRENT SYSTEM STATE

### Industries Currently Supported: **9**
1. Restaurant/Bar/Nightclub
2. Construction/Trades
3. Freelancer/Consultant
4. Healthcare
5. Gig Worker
6. Retail/Sales
7. Salon/Spa
8. Hospitality
9. Fitness
+ Custom Industries (user-created)

### Current Job Templates Available: **6**
- `JobTemplate.restaurant()`
- `JobTemplate.construction()`
- `JobTemplate.freelancer()`
- `JobTemplate.healthcare()`
- `JobTemplate.gigWorker()`
- `JobTemplate.retail()`

**Gap:** 3 industries have NO pre-configured templates (Salon/Spa, Hospitality, Fitness)

---

## 📋 JOB BREAKDOWN BY INDUSTRY

### 1. Restaurant/Bar/Nightclub
**Pre-configured Template:** ✅ YES (`JobTemplate.restaurant()`)

**Job Types (13 total):**
1. Server/Waiter
2. Bartender
3. Food Runner
4. Busser
5. Manager
6. Hostess
7. Chef/Sushi Chef
8. Bar Back
9. Sommelier
10. Line Cook
11. Prep Cook
12. Expeditor
13. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Hourly
- ✅ `showTips`: true
- ✅ `showEventName`: true
- ✅ `showHostess`: true
- ✅ `showGuestCount`: true
- ❌ `showCommission`: false
- ❌ `showMileage`: false
- ❌ `showSales`: false

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Covers (guest count), tables served, bar vs. floor
- **Secondary Metrics:** Table turnover time, peak hours worked, section assignment
- **Tip Tracking:** Cash tips, card tips, tip-out (to house/bartender/busser), tip %
- **Payment Methods:** Cash, card, mobile pay breakdown
- **Financial:** Gross sales, net profit, comp drinks
- **Quality:** Customer satisfaction, repeat customers
- **Optional Expense:** Transport to venue, uniform cleaning, food cost if applicable

---

### 2. Construction/Trades
**Pre-configured Template:** ✅ YES (`JobTemplate.construction()`)

**Job Types (12 total):**
1. Carpenter
2. Electrician
3. Plumber
4. HVAC Technician
5. General Contractor
6. Painter
7. Roofer
8. Mason
9. Welder
10. Landscaper
11. Drywall Installer
12. Tile Setter
13. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Hourly
- ✅ `tracksOvertime`: true (1.5x)
- ✅ `showLocation`: true
- ✅ `showClientName`: true
- ✅ `showProjectName`: true
- ✅ `showTips`: false
- ❌ `showCommission`: false
- ❌ `showMileage`: true (missing!)
- ❌ `showSales`: false

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Hours worked, overtime hours, materials used
- **Secondary Metrics:** Square footage completed, units installed, quality inspections
- **Travel:** Mileage, travel time, job site location
- **Billing:** Hourly rate, per-unit rate, flat project rate, materials markup
- **Financial:** Tool depreciation, material costs, subcontractor payments, crew size
- **Quality:** Customer satisfaction, inspection passes, rework required
- **Optional:** Equipment rentals, permit costs, insurance on job

---

### 3. Freelancer/Consultant
**Pre-configured Template:** ✅ YES (`JobTemplate.freelancer()`)

**Job Types (10 total):**
1. Graphic Designer
2. Web Developer
3. Photographer
4. Writer/Copywriter
5. Marketing Consultant
6. Business Consultant
7. Video Editor
8. Social Media Manager
9. Virtual Assistant
10. Translator
11. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Flat Rate
- ✅ `showClientName`: true
- ✅ `showProjectName`: true
- ✅ `showTips`: false
- ❌ `showLocation`: false
- ❌ `showCommission`: false (needed for some!)
- ❌ `showMileage`: false

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Projects completed, billable hours, hourly rate (overrides flat rate)
- **Secondary Metrics:** Deliverables count, revision count, client type (startup/enterprise/individual)
- **Billing:** Hourly, flat rate, per-project, retainer
- **Financial:** Software costs, subscription tools, subcontractor payments, taxes estimate
- **Quality:** Client satisfaction, project complexity, repeat client %
- **Optional:** Travel time, consultation hours, meetings hours

---

### 4. Healthcare
**Pre-configured Template:** ✅ YES (`JobTemplate.healthcare()`)

**Job Types (9 total):**
1. Nurse (RN/LPN)
2. CNA (Certified Nursing Assistant)
3. Medical Assistant
4. Phlebotomist
5. Home Health Aide
6. Physical Therapist
7. Dental Hygienist
8. Paramedic/EMT
9. Pharmacy Technician
10. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Hourly
- ✅ `showMileage`: true
- ✅ `showLocation`: true
- ✅ `showClientName`: true
- ✅ `showTips`: false
- ❌ `showCommission`: false
- ❌ `showSales`: false

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Patients/clients served, home visits, procedures performed, shift differentials
- **Secondary Metrics:** Overtime hours, on-call time, certification status, specialization
- **Travel:** Mileage (home visits), travel time, rural vs. urban locations
- **Billing:** Base hourly, specialty rate, overtime rate, hazard pay, shift differential (night/weekend)
- **Financial:** Continuing education, certification costs, mileage reimbursement
- **Quality:** Patient satisfaction, incident reports, infection control, safety record
- **Optional:** Supplies/PPE cost, meal stipends, medical expenses

---

### 5. Gig Worker
**Pre-configured Template:** ✅ YES (`JobTemplate.gigWorker()`)

**Job Types (11 total):**
1. Musician
2. Band Member
3. DJ
4. Photographer
5. Photo Booth Operator
6. Event Performer
7. Artist
8. Rideshare Driver
9. Delivery Driver
10. Street Performer
11. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Hourly
- ✅ `showTips`: true
- ✅ `showMileage`: true
- ✅ `showLocation`: false
- ❌ `showCommission`: false (needed for some!)
- ❌ `showEventName`: false (needed for musicians/performers!)
- ❌ `showSales`: false (needed for merchandise!)

**NOTE:** This is a MIXED category - very different sub-types need different fields!

**Sub-Categories:**
**A. RIDESHARE/DELIVERY (Uber/Lyft/DoorDash/Instacart)**
- Primary Metrics: Rides/deliveries completed, distance driven, hours active
- Secondary Metrics: Acceptance rate, cancellation rate, customer rating, surge pricing
- Billing: Base fare, per-mile, per-minute, tips
- Financial: Fuel cost, vehicle maintenance, insurance, tolls, vehicle depreciation
- Quality: Customer ratings, on-time %, completion rate
- Optional: Vehicle inspection costs, dashcam footage

**B. MUSIC/ENTERTAINMENT (Musician/DJ/Photographer/Performer)**
- Primary Metrics: Gigs performed, hours worked, attendees/audience, deliverables
- Secondary Metrics: Event type (wedding/corporate/street), equipment used, crew size
- Billing: Per-gig rate, hourly, per-person, retainer
- Financial: Equipment depreciation, travel, software/licenses, crew payments
- Quality: Client satisfaction, repeat bookings, social media engagement
- Optional: Travel distance, equipment rental, setup/breakdown time

**C. ARTIST/CRAFTSPERSON (Artist/Street Performer)**
- Primary Metrics: Pieces sold, hours worked, event/location
- Secondary Metrics: Piece type, price point, audience size
- Billing: Per-piece, hourly, commission on sales
- Financial: Materials cost, booth rental, travel
- Quality: Engagement, sales conversion, foot traffic
- Optional: Photography of work, social media shares

**DECISION:** Should Gig Worker be split into 2-3 separate industries, or stay as one with heavily customizable template?

---

### 6. Retail/Sales
**Pre-configured Template:** ✅ YES (`JobTemplate.retail()`)

**Job Types (8 total):**
1. Sales Associate
2. Cashier
3. Store Manager
4. Visual Merchandiser
5. Stock Associate
6. Department Manager
7. Loss Prevention
8. Sales Representative
9. + Add Custom Job Title

**Current Template Fields:**
- ✅ `payStructure`: Hourly
- ✅ `showCommission`: true
- ✅ `showTips`: false
- ❌ `showSales`: false (MISSING - critical!)
- ❌ `showClientName`: false
- ❌ `showLocation`: false

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Transactions count, items sold, units of each product, customer count
- **Secondary Metrics:** Department/section, store location, shift type (opening/closing/mid)
- **Billing:** Base hourly, commission %, bonus structure, hazard pay
- **Financial:** Commission breakdown by product, refunds/returns, employee discount used
- **Quality:** Customer satisfaction, complaint count, selling skills, upsells %, accuracy
- **Optional:** Inventory accuracy, shrink/loss, product knowledge tests, mystery shopper scores

---

### 7. Salon/Spa
**Pre-configured Template:** ❌ NO - NEEDS CREATION

**Job Types (8 total):**
1. Hair Stylist
2. Nail Technician
3. Massage Therapist
4. Esthetician
5. Barber
6. Makeup Artist
7. Spa Manager
8. Waxing Specialist
9. + Add Custom Job Title

**Template Requirements:**
- `payStructure`: Hourly or Commission (varies by role and salon model)
- Key fields:
  - ✅ `showTips`: true (critical!)
  - ✅ `showCommission`: true (many salons are commission-based)
  - ✅ `showSales`: true (product sales crucial for salon revenue)
  - ❌ `showClientName`: true (track repeat clients)
  - ❌ `showGuestCount`: false → RENAME to `showClientCount`

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Clients served, types of services (cut/color/wash/massage/etc.), service time
- **Secondary Metrics:** Repeat vs. new clients, client satisfaction, appointment duration
- **Billing:** Hourly base, commission %, product commission, upsell rate
- **Financial:** Product sales breakdown, supplies cost, chair/station rental (if freelancer), product commission
- **Quality:** Client satisfaction, 5-star reviews, rebook rate, referrals
- **Optional:** Product recommendations, training hours, certifications maintained

**Sub-Categories:**
**A. HAIR (Stylist/Barber)**
- Services: Cut, color, highlights, extension, treatment, wash
- Metrics: Cut count, color treatments, product sales (shampoo/conditioner/styling)

**B. NAILS (Nail Technician)**
- Services: Manicure, pedicure, gel, acrylics, nail art
- Metrics: Nail service count, enhancement types, product sales

**C. MASSAGE/SPA (Massage Therapist/Esthetician/Waxing)**
- Services: Swedish/deep tissue/hot stone massage, facial, waxing, body treatment
- Metrics: Session count, session length, product sales (oils/waxes/lotions)

---

### 8. Hospitality
**Pre-configured Template:** ❌ NO - NEEDS CREATION

**Job Types (8 total):**
1. Hotel Front Desk
2. Concierge
3. Housekeeper
4. Bellhop/Porter
5. Event Coordinator
6. Catering Server
7. Valet Attendant
8. Hotel Manager
9. + Add Custom Job Title

**Template Requirements:**
- `payStructure`: Hourly (some positions have tips)
- Key fields:
  - ✅ `showTips`: true (for bellhop, valet, catering)
  - ❌ `showEventName`: true (for event coordinator, catering)
  - ❌ `showGuestCount`: true (for catering, events)
  - ❌ `showClientName`: true (for concierge, event coordinator)
  - ✅ `showCommission`: false (generally not commission-based)

**Industry-Specific Fields Needed:**

**A. FRONT DESK / CONCIERGE**
- Primary Metrics: Guests checked in/out, concierge requests handled, upsells (room upgrades)
- Secondary Metrics: Complaint resolution, languages spoken, special requests fulfilled
- Billing: Hourly base, tips (sometimes), bonus for upgrades
- Quality: Guest satisfaction, NPS score, complaint rate

**B. HOUSEKEEPING**
- Primary Metrics: Rooms cleaned, turnaround time, rooms inspected/passed
- Secondary Metrics: Occupancy %, deep clean vs. quick turn, special requests
- Billing: Hourly, sometimes per-room rate
- Quality: Quality inspection pass %, guest satisfaction

**C. BELLHOP / VALET**
- Primary Metrics: Guests served, cars parked, luggage trips
- Secondary Metrics: Peak hours, special services (door handling, info provision)
- Billing: Hourly + tips, sometimes per-vehicle
- Quality: Guest satisfaction, vehicle handling quality, service time

**D. EVENT COORDINATOR / CATERING SERVER**
- Primary Metrics: Events handled, guests served, hours worked
- Secondary Metrics: Event type, client type, event size
- Billing: Hourly, per-event bonus, tips (catering)
- Quality: Client satisfaction, event execution quality, on-time delivery

**E. VALET ATTENDANT**
- Primary Metrics: Vehicles parked, turnaround time, tips
- Secondary Metrics: Peak hours (events, restaurants, hotels)
- Billing: Hourly + tips
- Quality: Vehicle safety, damage rate, service time

---

### 9. Fitness
**Pre-configured Template:** ❌ NO - NEEDS CREATION

**Job Types (8 total):**
1. Personal Trainer
2. Yoga Instructor
3. Gym Manager
4. Group Fitness Instructor
5. Spin Instructor
6. Pilates Instructor
7. Nutritionist/Dietitian
8. Fitness Coach
9. + Add Custom Job Title

**Template Requirements:**
- `payStructure`: Hourly, Per-Session, or Commission (varies widely!)
- Key fields:
  - ❌ `showClientName`: true (personal training is client-focused)
  - ❌ `showEventName`: false → RENAME to `showClassName` or `showSessionType`
  - ❌ `showSales`: true (sell packages, supplements, nutrition plans)
  - ✅ `showTips`: false (rarely tipped, but some facilities allow)
  - ✅ `showCommission`: true (commission on packages, supplements)

**Industry-Specific Fields Needed:**
- **Primary Metrics:** Sessions taught, clients trained, class size, hours worked
- **Secondary Metrics:** Client type (personal vs. group), session type (one-on-one vs. class), retention rate
- **Billing:** Per-session rate, hourly rate, commission on package sales, commission on referrals
- **Financial:** Package sales, supplement sales, nutrition plan sales, client packages sold
- **Quality:** Client satisfaction, client retention rate, NPS, body transformation results
- **Optional:** Certifications maintained, CE credits, social media followers, referral count

**Sub-Categories:**
**A. PERSONAL TRAINER**
- Primary: One-on-one sessions, client count, retention
- Metrics: Session duration, session type, package sold

**B. GROUP FITNESS (Yoga/Spin/Pilates/Group Fitness)**
- Primary: Classes taught, class size, attendance rate
- Metrics: Class type, recurring students, capacity %, cancellations

**C. NUTRITIONIST/DIETITIAN**
- Primary: Consultations, nutrition plans sold, client count
- Metrics: Plan type, follow-up sessions, compliance

---

## 🎯 SUMMARY: TEMPLATES NEEDED

### Templates to CREATE (3):
1. **Salon/Spa Template** - Hair, Nails, Massage, Waxing specialties
2. **Hospitality Template** - Front Desk, Bellhop, Valet, Event/Catering specialties
3. **Fitness Template** - Personal Trainer, Group Classes, Nutrition specialties

### Templates to UPDATE/ENHANCE (6):
1. **Restaurant/Bar** - Add missing fields (mileage tracking, sales)
2. **Construction** - Add missing mileage field (should already be there)
3. **Freelancer** - Add optional commission, mileage
4. **Healthcare** - Already good, maybe add specialization field
5. **Gig Worker** - SPLIT or heavily customize (too many different sub-types)
6. **Retail/Sales** - Add missing `showSales` field (critical!)

### Custom Industries:
- User can create unlimited custom industries with fully customizable templates

---

## 📊 TEMPLATE FIELD ANALYSIS

### All Possible Fields Across All Templates:

**Pay Structure:**
- [ ] Hourly
- [ ] Flat Rate
- [ ] Commission-Based
- [ ] Hybrid (hourly + commission)
- [ ] Per-Unit (per-delivery, per-client, per-service)
- [ ] Per-Project
- [ ] Retainer

**Financial Tracking:**
- [ ] Hourly Rate
- [ ] Flat Rate Amount
- [ ] Commission %
- [ ] Tips (cash, card, total)
- [ ] Sales Amount
- [ ] Mileage
- [ ] Expense Tracking
- [ ] Material Costs
- [ ] Product Commission

**Work Metrics (Industry-Specific Counts):**
- [ ] Guest/Client Count
- [ ] Covers (restaurant)
- [ ] Rides (rideshare)
- [ ] Deliveries
- [ ] Units Produced/Sold
- [ ] Rooms (housekeeping)
- [ ] Sessions/Classes Taught
- [ ] Services Performed
- [ ] Transactions
- [ ] Projects Completed

**Event/Work Details:**
- [ ] Event Name
- [ ] Client Name
- [ ] Project Name
- [ ] Location
- [ ] Class Type / Session Type
- [ ] Service Type
- [ ] Shift Type (opening, closing, mid)

**Hospitality-Specific:**
- [ ] Hostess Name
- [ ] Table Assignment
- [ ] Bar vs. Floor Section

**Quality/Performance:**
- [ ] Customer Rating
- [ ] Satisfaction Notes
- [ ] Photos/Documentation
- [ ] Notes/Comments
- [ ] Overtime Hours
- [ ] Shift Differential

---

## 🔧 TECHNICAL IMPLEMENTATION

### Option A: Extend JobTemplate Model
```dart
// Add new boolean fields for each specific metric
class JobTemplate {
  // Existing fields...
  
  // NEW: Industry-specific metrics
  bool showClientCount;      // For services (salon, fitness, healthcare)
  bool showSessionType;      // For classes/group fitness
  bool showServiceType;      // For salon/spa, healthcare
  bool showRideCount;        // For rideshare
  bool showDeliveryCount;    // For delivery
  bool showTransactions;     // For retail
  bool showProductSales;     // For retail, salon, fitness
  // etc...
}
```

**Pros:** Simple, backward compatible
**Cons:** JobTemplate becomes bloated with 40+ fields

### Option B: Generic Field System
```dart
class JobTemplate {
  // Existing fields...
  
  // NEW: Generic field definitions
  List<FieldDefinition> customFields;
}

class FieldDefinition {
  String id;
  String label;
  String customLabel; // "Clients" for salon, "Guests" for restaurant
  FieldType type;     // number, currency, time, text
  bool isVisible;
  bool isRequired;
  int displayOrder;   // 1 = top
}
```

**Pros:** Highly flexible, scalable, clean UI layer
**Cons:** More complex to implement, requires refactoring form generation

### Option C: Hybrid Approach (RECOMMENDED)
- Keep existing boolean fields for MVP backwards compatibility
- Add a `List<FieldDefinition>` for custom/industry-specific fields
- Over time, migrate existing fields into the custom field system

---

## 🚀 NEXT STEPS

1. **Phase 6 (Polish):** Update existing 6 templates with missing fields
2. **Phase 7 (Expansion):** Create 3 new templates (Salon/Spa, Hospitality, Fitness)
3. **Phase 8 (Customization):** Implement generic field system for full flexibility
4. **Phase 9 (Analytics):** Update dashboards to show industry-specific metrics

---

## 📝 DECISION POINTS FOR USER

1. **Should "Gig Worker" industry split into multiple industries** (Rideshare, Music/Entertainment, Artist)?
   - Current: 1 industry, 11 job types, very mixed fields
   - Proposed: 3 industries, better templates, clearer UX

2. **Should "Hospitality" include "Catering"** or create separate "Events" industry?
   - Current: Hospitality includes catering
   - Alternative: Separate "Event Services" industry with cater servers, planners, etc.

3. **Field naming conventions:**
   - "Guest Count" → Should salon use "Client Count" as custom label?
   - "Event Name" → Should group fitness use "Class Name" as custom label?
   - Answer: YES - support custom field labels per job type

4. **Required vs. Optional fields:**
   - Should "Client Count" for salon be required in shift entry?
   - Answer: Recommend at top (required default), but user can make optional in settings

---

## 📈 FINAL TALLY

| Category | Count |
|----------|-------|
| Industries | 9 (+ custom) |
| Total Job Types | 87 |
| Existing Templates | 6 |
| New Templates Needed | 3 |
| Templates to Update | 6 |
| Total Work Items | 9 templates |

