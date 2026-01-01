// Shift Executor - Handles all shift-related function calls
// Updated: Added industry-specific fields for rideshare, salon, hospitality, fitness, healthcare, construction, freelancer
import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

export class ShiftExecutor {
  constructor(private supabase: SupabaseClient, private userId: string) {}

  async execute(functionName: string, args: any): Promise<any> {
    switch (functionName) {
      case "add_shift":
        return await this.addShift(args);
      case "edit_shift":
        return await this.editShift(args);
      case "delete_shift":
        return await this.deleteShift(args);
      case "bulk_edit_shifts":
        return await this.bulkEditShifts(args);
      case "bulk_delete_shifts":
        return await this.bulkDeleteShifts(args);
      case "search_shifts":
        return await this.searchShifts(args);
      case "get_shift_details":
        return await this.getShiftDetails(args);
      case "attach_photo_to_shift":
        return await this.attachPhotoToShift(args);
      case "remove_photo_from_shift":
        return await this.removePhotoFromShift(args);
      case "get_shift_photos":
        return await this.getShiftPhotos(args);
      case "calculate_shift_total":
        return await this.calculateShiftTotal(args);
      case "duplicate_shift":
        return await this.duplicateShift(args);
      default:
        throw new Error(`Unknown shift function: ${functionName}`);
    }
  }

  private async addShift(args: any) {
    const {
      date,
      cashTips = 0,
      creditTips = 0,
      hourlyRate,  // Don't default to 0 - we'll get from job if not provided
      hoursWorked = 0,
      overtimeHours,
      eventName,
      guestCount,
      notes,
      jobId,
      startTime,
      endTime,
      jobType,
      location,
      clientName,
      projectName,
      hostess,
      salesAmount,
      tipoutPercent,
      additionalTipout,
      additionalTipoutNote,
      commission,
      mileage,
      flatRate,
      eventCost,
      // ============================================
      // RIDESHARE/DELIVERY FIELDS
      // ============================================
      tripCount,
      totalMiles,
      tipsInApp,
      surgePeakEarnings,
      waitTimeMinutes,
      deadheadMiles,
      platformName,
      bonusesIncentives,
      // ============================================
      // SALON/SPA FIELDS
      // ============================================
      servicesCount,
      retailSales,
      productCommissionPercent,
      productCommission,
      rebookingCount,
      // ============================================
      // HOSPITALITY FIELDS
      // ============================================
      roomServiceTips,
      valetParkingTips,
      minibarSales,
      conciergeTips,
      bellhopTips,
      housekeepingTips,
      banquetTips,
      spaTips,
      poolTips,
      frontDeskTips,
      hotelRoomNumber,
      // ============================================
      // FITNESS FIELDS
      // ============================================
      classCount,
      personalTrainingSessions,
      membershipSalesCommission,
      supplementSales,
      // ============================================
      // HEALTHCARE FIELDS
      // ============================================
      proceduresAssisted,
      overtimeHoursWorked,
      onCallHours,
      patientCount,
      // ============================================
      // CONSTRUCTION FIELDS
      // ============================================
      perDiemAmount,
      toolAllowance,
      hazardPay,
      piecesCompleted,
      pieceRate,
      // ============================================
      // FREELANCER FIELDS
      // ============================================
      invoiceNumber,
      retainerAmount,
      milestonePayment,
    } = args;

    // If no jobId provided, try to get the user's default or only job
    let finalJobId = jobId;
    let jobName = null;
    let jobHourlyRate = 0;
    
    // Fetch job info (for hourly rate and name)
    if (finalJobId) {
      // Job ID was provided - fetch its details
      const { data: job } = await this.supabase
        .from("jobs")
        .select("id, name, hourly_rate")
        .eq("id", finalJobId)
        .single();
      
      if (job) {
        jobName = job.name;
        jobHourlyRate = job.hourly_rate || 0;
      }
    } else {
      // No job ID - try to get user's default or only job
      const { data: jobs } = await this.supabase
        .from("jobs")
        .select("id, name, is_default, hourly_rate")
        .eq("user_id", this.userId)
        .eq("is_active", true)
        .is("deleted_at", null)
        .order("is_default", { ascending: false });

      if (jobs && jobs.length === 1) {
        // Only one job - use it automatically
        finalJobId = jobs[0].id;
        jobName = jobs[0].name;
        jobHourlyRate = jobs[0].hourly_rate || 0;
      } else if (jobs && jobs.length > 1) {
        // Multiple jobs - use default if exists
        const defaultJob = jobs.find((j: any) => j.is_default);
        if (defaultJob) {
          finalJobId = defaultJob.id;
          jobName = defaultJob.name;
          jobHourlyRate = defaultJob.hourly_rate || 0;
        }
      }
    }

    // Use provided hourly rate, or fall back to job's hourly rate
    const finalHourlyRate = hourlyRate !== undefined ? hourlyRate : jobHourlyRate;

    // Build insert object with ONLY columns that exist in the database
    const insertData: any = {
      user_id: this.userId,
      date: date,
      cash_tips: cashTips,
      credit_tips: creditTips,
      hourly_rate: finalHourlyRate,
      hours_worked: hoursWorked,
    };

    // Set job_id (either provided or auto-detected)
    if (finalJobId) insertData.job_id = finalJobId;
    
    // Optional fields - only include if provided
    if (eventName) insertData.event_name = eventName;
    if (guestCount) insertData.guest_count = guestCount;
    if (notes) insertData.notes = notes;
    if (startTime) insertData.start_time = startTime;
    if (endTime) insertData.end_time = endTime;
    if (jobType) insertData.job_type = jobType;
    if (location) insertData.location = location;
    if (clientName) insertData.client_name = clientName;
    if (projectName) insertData.project_name = projectName;
    if (hostess) insertData.hostess = hostess;
    if (salesAmount) insertData.sales_amount = salesAmount;
    if (tipoutPercent) insertData.tipout_percent = tipoutPercent;
    if (additionalTipout) insertData.additional_tipout = additionalTipout;
    if (additionalTipoutNote) insertData.additional_tipout_note = additionalTipoutNote;
    if (overtimeHours) insertData.overtime_hours = overtimeHours;
    if (commission) insertData.commission = commission;
    if (mileage) insertData.mileage = mileage;
    if (flatRate) insertData.flat_rate = flatRate;
    if (eventCost) insertData.event_cost = eventCost;

    // ============================================
    // RIDESHARE/DELIVERY FIELDS
    // ============================================
    if (tripCount !== undefined) insertData.trip_count = tripCount;
    if (totalMiles !== undefined) insertData.total_miles = totalMiles;
    if (tipsInApp !== undefined) insertData.tips_in_app = tipsInApp;
    if (surgePeakEarnings !== undefined) insertData.surge_peak_earnings = surgePeakEarnings;
    if (waitTimeMinutes !== undefined) insertData.wait_time_minutes = waitTimeMinutes;
    if (deadheadMiles !== undefined) insertData.deadhead_miles = deadheadMiles;
    if (platformName) insertData.platform_name = platformName;
    if (bonusesIncentives !== undefined) insertData.bonuses_incentives = bonusesIncentives;

    // ============================================
    // SALON/SPA FIELDS
    // ============================================
    if (servicesCount !== undefined) insertData.services_count = servicesCount;
    if (retailSales !== undefined) insertData.retail_sales = retailSales;
    if (productCommissionPercent !== undefined) insertData.product_commission_percent = productCommissionPercent;
    if (productCommission !== undefined) insertData.product_commission = productCommission;
    if (rebookingCount !== undefined) insertData.rebooking_count = rebookingCount;

    // ============================================
    // HOSPITALITY FIELDS
    // ============================================
    if (roomServiceTips !== undefined) insertData.room_service_tips = roomServiceTips;
    if (valetParkingTips !== undefined) insertData.valet_parking_tips = valetParkingTips;
    if (minibarSales !== undefined) insertData.minibar_sales = minibarSales;
    if (conciergeTips !== undefined) insertData.concierge_tips = conciergeTips;
    if (bellhopTips !== undefined) insertData.bellhop_tips = bellhopTips;
    if (housekeepingTips !== undefined) insertData.housekeeping_tips = housekeepingTips;
    if (banquetTips !== undefined) insertData.banquet_tips = banquetTips;
    if (spaTips !== undefined) insertData.spa_tips = spaTips;
    if (poolTips !== undefined) insertData.pool_tips = poolTips;
    if (frontDeskTips !== undefined) insertData.front_desk_tips = frontDeskTips;
    if (hotelRoomNumber) insertData.hotel_room_number = hotelRoomNumber;

    // ============================================
    // FITNESS FIELDS
    // ============================================
    if (classCount !== undefined) insertData.class_count = classCount;
    if (personalTrainingSessions !== undefined) insertData.personal_training_sessions = personalTrainingSessions;
    if (membershipSalesCommission !== undefined) insertData.membership_sales_commission = membershipSalesCommission;
    if (supplementSales !== undefined) insertData.supplement_sales = supplementSales;

    // ============================================
    // HEALTHCARE FIELDS
    // ============================================
    if (proceduresAssisted !== undefined) insertData.procedures_assisted = proceduresAssisted;
    if (overtimeHoursWorked !== undefined) insertData.overtime_hours_worked = overtimeHoursWorked;
    if (onCallHours !== undefined) insertData.on_call_hours = onCallHours;
    if (patientCount !== undefined) insertData.patient_count = patientCount;

    // ============================================
    // CONSTRUCTION FIELDS
    // ============================================
    if (perDiemAmount !== undefined) insertData.per_diem_amount = perDiemAmount;
    if (toolAllowance !== undefined) insertData.tool_allowance = toolAllowance;
    if (hazardPay !== undefined) insertData.hazard_pay = hazardPay;
    if (piecesCompleted !== undefined) insertData.pieces_completed = piecesCompleted;
    if (pieceRate !== undefined) insertData.piece_rate = pieceRate;

    // ============================================
    // FREELANCER FIELDS
    // ============================================
    if (projectName) insertData.project_name = projectName;
    if (invoiceNumber) insertData.invoice_number = invoiceNumber;
    if (retainerAmount !== undefined) insertData.retainer_amount = retainerAmount;
    if (milestonePayment !== undefined) insertData.milestone_payment = milestonePayment;

    const { data, error } = await this.supabase
      .from("shifts")
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    // Calculate totals for response (not stored in DB)
    const totalTips = cashTips + creditTips;
    const hourlyWages = finalHourlyRate * hoursWorked;
    const totalIncome = hourlyWages + totalTips;

    // Build response with job info
    const missingFields = [];
    if (!hoursWorked) missingFields.push("hours worked");
    if (!startTime && !endTime) missingFields.push("start/end time");

    return {
      success: true,
      shift: data,
      jobName: jobName,
      jobAutoSelected: !jobId && !!finalJobId,
      summary: {
        date: date,
        totalIncome: totalIncome,
        cashTips: cashTips,
        creditTips: creditTips,
        hours: hoursWorked,
        eventName: eventName,
        jobName: jobName,
      },
      missingFields: missingFields.length > 0 ? missingFields : null,
    };
  }

  private async editShift(args: any) {
    const { date, updates } = args;

    // Find shift by date (with job info)
    const { data: existingShift, error: findError } = await this.supabase
      .from("shifts")
      .select("*, jobs(hourly_rate)")
      .eq("user_id", this.userId)
      .eq("date", date)
      .single();

    if (findError || !existingShift) {
      throw new Error(`No shift found on ${date}`);
    }

    // Convert camelCase updates to snake_case for database
    // ONLY include columns that actually exist in the schema
    const dbUpdates: any = {};
    
    // Core fields
    if (updates.cashTips !== undefined) dbUpdates.cash_tips = updates.cashTips;
    if (updates.creditTips !== undefined) dbUpdates.credit_tips = updates.creditTips;
    if (updates.hourlyRate !== undefined) dbUpdates.hourly_rate = updates.hourlyRate;
    if (updates.hoursWorked !== undefined) dbUpdates.hours_worked = updates.hoursWorked;
    if (updates.overtimeHours !== undefined) dbUpdates.overtime_hours = updates.overtimeHours;
    if (updates.eventName !== undefined) dbUpdates.event_name = updates.eventName;
    if (updates.guestCount !== undefined) dbUpdates.guest_count = updates.guestCount;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.jobId !== undefined) dbUpdates.job_id = updates.jobId;
    if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
    if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
    if (updates.jobType !== undefined) dbUpdates.job_type = updates.jobType;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.clientName !== undefined) dbUpdates.client_name = updates.clientName;
    if (updates.projectName !== undefined) dbUpdates.project_name = updates.projectName;
    if (updates.hostess !== undefined) dbUpdates.hostess = updates.hostess;
    if (updates.salesAmount !== undefined) dbUpdates.sales_amount = updates.salesAmount;
    if (updates.tipoutPercent !== undefined) dbUpdates.tipout_percent = updates.tipoutPercent;
    if (updates.additionalTipout !== undefined) dbUpdates.additional_tipout = updates.additionalTipout;
    if (updates.additionalTipoutNote !== undefined) dbUpdates.additional_tipout_note = updates.additionalTipoutNote;
    if (updates.commission !== undefined) dbUpdates.commission = updates.commission;
    if (updates.mileage !== undefined) dbUpdates.mileage = updates.mileage;
    if (updates.flatRate !== undefined) dbUpdates.flat_rate = updates.flatRate;
    if (updates.eventCost !== undefined) dbUpdates.event_cost = updates.eventCost;

    // ============================================
    // RIDESHARE/DELIVERY FIELDS
    // ============================================
    if (updates.tripCount !== undefined) dbUpdates.trip_count = updates.tripCount;
    if (updates.totalMiles !== undefined) dbUpdates.total_miles = updates.totalMiles;
    if (updates.tipsInApp !== undefined) dbUpdates.tips_in_app = updates.tipsInApp;
    if (updates.surgePeakEarnings !== undefined) dbUpdates.surge_peak_earnings = updates.surgePeakEarnings;
    if (updates.waitTimeMinutes !== undefined) dbUpdates.wait_time_minutes = updates.waitTimeMinutes;
    if (updates.deadheadMiles !== undefined) dbUpdates.deadhead_miles = updates.deadheadMiles;
    if (updates.platformName !== undefined) dbUpdates.platform_name = updates.platformName;
    if (updates.bonusesIncentives !== undefined) dbUpdates.bonuses_incentives = updates.bonusesIncentives;

    // ============================================
    // SALON/SPA FIELDS
    // ============================================
    if (updates.servicesCount !== undefined) dbUpdates.services_count = updates.servicesCount;
    if (updates.retailSales !== undefined) dbUpdates.retail_sales = updates.retailSales;
    if (updates.productCommissionPercent !== undefined) dbUpdates.product_commission_percent = updates.productCommissionPercent;
    if (updates.productCommission !== undefined) dbUpdates.product_commission = updates.productCommission;
    if (updates.rebookingCount !== undefined) dbUpdates.rebooking_count = updates.rebookingCount;

    // ============================================
    // HOSPITALITY FIELDS
    // ============================================
    if (updates.roomServiceTips !== undefined) dbUpdates.room_service_tips = updates.roomServiceTips;
    if (updates.valetParkingTips !== undefined) dbUpdates.valet_parking_tips = updates.valetParkingTips;
    if (updates.minibarSales !== undefined) dbUpdates.minibar_sales = updates.minibarSales;
    if (updates.conciergeTips !== undefined) dbUpdates.concierge_tips = updates.conciergeTips;
    if (updates.bellhopTips !== undefined) dbUpdates.bellhop_tips = updates.bellhopTips;
    if (updates.housekeepingTips !== undefined) dbUpdates.housekeeping_tips = updates.housekeepingTips;
    if (updates.banquetTips !== undefined) dbUpdates.banquet_tips = updates.banquetTips;
    if (updates.spaTips !== undefined) dbUpdates.spa_tips = updates.spaTips;
    if (updates.poolTips !== undefined) dbUpdates.pool_tips = updates.poolTips;
    if (updates.frontDeskTips !== undefined) dbUpdates.front_desk_tips = updates.frontDeskTips;
    if (updates.hotelRoomNumber !== undefined) dbUpdates.hotel_room_number = updates.hotelRoomNumber;

    // ============================================
    // FITNESS FIELDS
    // ============================================
    if (updates.classCount !== undefined) dbUpdates.class_count = updates.classCount;
    if (updates.personalTrainingSessions !== undefined) dbUpdates.personal_training_sessions = updates.personalTrainingSessions;
    if (updates.membershipSalesCommission !== undefined) dbUpdates.membership_sales_commission = updates.membershipSalesCommission;
    if (updates.supplementSales !== undefined) dbUpdates.supplement_sales = updates.supplementSales;

    // ============================================
    // HEALTHCARE FIELDS
    // ============================================
    if (updates.proceduresAssisted !== undefined) dbUpdates.procedures_assisted = updates.proceduresAssisted;
    if (updates.overtimeHoursWorked !== undefined) dbUpdates.overtime_hours_worked = updates.overtimeHoursWorked;
    if (updates.onCallHours !== undefined) dbUpdates.on_call_hours = updates.onCallHours;
    if (updates.patientCount !== undefined) dbUpdates.patient_count = updates.patientCount;

    // ============================================
    // CONSTRUCTION FIELDS
    // ============================================
    if (updates.perDiemAmount !== undefined) dbUpdates.per_diem_amount = updates.perDiemAmount;
    if (updates.toolAllowance !== undefined) dbUpdates.tool_allowance = updates.toolAllowance;
    if (updates.hazardPay !== undefined) dbUpdates.hazard_pay = updates.hazardPay;
    if (updates.piecesCompleted !== undefined) dbUpdates.pieces_completed = updates.piecesCompleted;
    if (updates.pieceRate !== undefined) dbUpdates.piece_rate = updates.pieceRate;

    // ============================================
    // FREELANCER FIELDS
    // ============================================
    if (updates.invoiceNumber !== undefined) dbUpdates.invoice_number = updates.invoiceNumber;
    if (updates.retainerAmount !== undefined) dbUpdates.retainer_amount = updates.retainerAmount;
    if (updates.milestonePayment !== undefined) dbUpdates.milestone_payment = updates.milestonePayment;

    // Always ensure hourly rate is set when updating hours or tips
    // Pull from job if shift has no hourly_rate or it's 0
    if ((updates.hoursWorked !== undefined || updates.cashTips !== undefined || updates.creditTips !== undefined) && 
        (!existingShift.hourly_rate || existingShift.hourly_rate === 0) && 
        !updates.hourlyRate) {
      const jobHourlyRate = existingShift.jobs?.hourly_rate || 0;
      if (jobHourlyRate > 0) {
        dbUpdates.hourly_rate = jobHourlyRate;
        console.log(`Setting hourly rate from job: ${jobHourlyRate} for shift on ${existingShift.date}`);
      }
    }

    // Update shift with ONLY valid columns
    const { data, error } = await this.supabase
      .from("shifts")
      .update(dbUpdates)
      .eq("id", existingShift.id)
      .select()
      .single();

    if (error) throw error;

    // Calculate totals for response (not stored in DB)
    const cashTips = data.cash_tips || 0;
    const creditTips = data.credit_tips || 0;
    const hourlyRate = data.hourly_rate || 0;
    const hoursWorked = data.hours_worked || 0;
    const totalTips = cashTips + creditTips;
    const totalIncome = (hourlyRate * hoursWorked) + totalTips;

    return {
      success: true,
      shift: data,
      before: existingShift,
      after: { ...data, total_income: totalIncome },
    };
  }

  private async deleteShift(args: any) {
    const { date, confirmed } = args;

    if (!confirmed) {
      // Return shift details for confirmation
      const { data: shift } = await this.supabase
        .from("shifts")
        .select("*")
        .eq("user_id", this.userId)
        .eq("date", date)
        .single();

      if (!shift) throw new Error(`No shift found on ${date}`);

      // Calculate total for display
      const totalTips = (shift.cash_tips || 0) + (shift.credit_tips || 0);
      const hourlyWages = (shift.hourly_rate || 0) * (shift.hours_worked || 0);
      const totalIncome = hourlyWages + totalTips;

      return {
        needsConfirmation: true,
        shift: shift,
        message: `Are you sure you want to delete the shift from ${date}? You earned $${totalIncome.toFixed(2)} that day.`,
      };
    }

    // Delete the shift
    const { error } = await this.supabase
      .from("shifts")
      .delete()
      .eq("user_id", this.userId)
      .eq("date", date);

    if (error) throw error;

    return {
      success: true,
      message: `Shift from ${date} deleted successfully.`,
    };
  }

  private async bulkEditShifts(args: any) {
    const { startDate, endDate, jobId, jobName, updates, confirmed } = args;

    // Build query to find matching shifts
    let queryBuilder = this.supabase
      .from("shifts")
      .select("*, jobs(name)")
      .eq("user_id", this.userId);

    // Apply date range filter
    if (startDate) {
      queryBuilder = queryBuilder.gte("date", startDate);
    }
    if (endDate) {
      queryBuilder = queryBuilder.lte("date", endDate);
    }

    // Apply job filter by ID or name
    if (jobId) {
      queryBuilder = queryBuilder.eq("job_id", jobId);
    } else if (jobName) {
      // Find job by name first
      const { data: jobs } = await this.supabase
        .from("jobs")
        .select("id, name")
        .eq("user_id", this.userId)
        .ilike("name", `%${jobName}%`);
      
      if (jobs && jobs.length > 0) {
        queryBuilder = queryBuilder.eq("job_id", jobs[0].id);
      }
    }

    const { data: shifts, error: findError } = await queryBuilder.order("date", { ascending: true });

    if (findError) throw findError;

    if (!shifts || shifts.length === 0) {
      return {
        success: false,
        count: 0,
        message: "No shifts found matching those criteria.",
      };
    }

    // If not confirmed, return a PREVIEW (don't actually update)
    if (!confirmed) {
      const dateRange = shifts.length > 0 
        ? `${shifts[0].date} to ${shifts[shifts.length - 1].date}`
        : "N/A";
      
      // Build a description of what will change
      const changeDescriptions = [];
      if (updates.cashTips !== undefined) changeDescriptions.push(`cash tips to $${updates.cashTips}`);
      if (updates.creditTips !== undefined) changeDescriptions.push(`credit tips to $${updates.creditTips}`);
      if (updates.hourlyRate !== undefined) changeDescriptions.push(`hourly rate to $${updates.hourlyRate}`);
      if (updates.hoursWorked !== undefined) changeDescriptions.push(`hours worked to ${updates.hoursWorked}`);
      if (updates.overtimeHours !== undefined) changeDescriptions.push(`overtime hours to ${updates.overtimeHours}`);
      if (updates.startTime !== undefined) changeDescriptions.push(`start time to ${updates.startTime}`);
      if (updates.endTime !== undefined) changeDescriptions.push(`end time to ${updates.endTime}`);
      if (updates.notes !== undefined) changeDescriptions.push(`notes to "${updates.notes}"`);
      if (updates.eventName !== undefined) changeDescriptions.push(`event name to "${updates.eventName}"`);
      if (updates.guestCount !== undefined) changeDescriptions.push(`guest count to ${updates.guestCount}`);
      if (updates.location !== undefined) changeDescriptions.push(`location to "${updates.location}"`);
      if (updates.clientName !== undefined) changeDescriptions.push(`client name to "${updates.clientName}"`);
      if (updates.projectName !== undefined) changeDescriptions.push(`project name to "${updates.projectName}"`);
      if (updates.hostess !== undefined) changeDescriptions.push(`hostess to "${updates.hostess}"`);
      if (updates.salesAmount !== undefined) changeDescriptions.push(`sales amount to $${updates.salesAmount}`);
      if (updates.tipoutPercent !== undefined) changeDescriptions.push(`tipout % to ${updates.tipoutPercent}%`);
      if (updates.additionalTipout !== undefined) changeDescriptions.push(`additional tipout to $${updates.additionalTipout}`);
      if (updates.additionalTipoutNote !== undefined) changeDescriptions.push(`tipout note to "${updates.additionalTipoutNote}"`);
      if (updates.commission !== undefined) changeDescriptions.push(`commission to $${updates.commission}`);
      if (updates.mileage !== undefined) changeDescriptions.push(`mileage to ${updates.mileage} miles`);
      if (updates.flatRate !== undefined) changeDescriptions.push(`flat rate to $${updates.flatRate}`);
      if (updates.eventCost !== undefined) changeDescriptions.push(`event cost to $${updates.eventCost}`);
      // Industry-specific preview descriptions
      if (updates.tripCount !== undefined) changeDescriptions.push(`trip count to ${updates.tripCount}`);
      if (updates.totalMiles !== undefined) changeDescriptions.push(`total miles to ${updates.totalMiles}`);
      if (updates.tipsInApp !== undefined) changeDescriptions.push(`in-app tips to $${updates.tipsInApp}`);
      if (updates.servicesCount !== undefined) changeDescriptions.push(`services count to ${updates.servicesCount}`);
      if (updates.classCount !== undefined) changeDescriptions.push(`class count to ${updates.classCount}`);
      if (updates.patientCount !== undefined) changeDescriptions.push(`patient count to ${updates.patientCount}`);
      if (updates.piecesCompleted !== undefined) changeDescriptions.push(`pieces completed to ${updates.piecesCompleted}`);

      return {
        needsConfirmation: true,
        count: shifts.length,
        dateRange: dateRange,
        changes: changeDescriptions.join(", "),
        message: `I found ${shifts.length} shifts from ${dateRange}. I'll update ${changeDescriptions.join(", ")}. Should I proceed?`,
        shiftDates: shifts.slice(0, 5).map((s: any) => s.date), // Show first 5 dates as preview
      };
    }

    // CONFIRMED - Actually update all shifts
    // Convert camelCase updates to snake_case
    const dbUpdates: any = {};
    
    // Core fields
    if (updates.cashTips !== undefined) dbUpdates.cash_tips = updates.cashTips;
    if (updates.creditTips !== undefined) dbUpdates.credit_tips = updates.creditTips;
    if (updates.hourlyRate !== undefined) dbUpdates.hourly_rate = updates.hourlyRate;
    if (updates.hoursWorked !== undefined) dbUpdates.hours_worked = updates.hoursWorked;
    if (updates.overtimeHours !== undefined) dbUpdates.overtime_hours = updates.overtimeHours;
    if (updates.startTime !== undefined) dbUpdates.start_time = updates.startTime;
    if (updates.endTime !== undefined) dbUpdates.end_time = updates.endTime;
    if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
    if (updates.eventName !== undefined) dbUpdates.event_name = updates.eventName;
    if (updates.guestCount !== undefined) dbUpdates.guest_count = updates.guestCount;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.clientName !== undefined) dbUpdates.client_name = updates.clientName;
    if (updates.projectName !== undefined) dbUpdates.project_name = updates.projectName;
    if (updates.hostess !== undefined) dbUpdates.hostess = updates.hostess;
    if (updates.salesAmount !== undefined) dbUpdates.sales_amount = updates.salesAmount;
    if (updates.tipoutPercent !== undefined) dbUpdates.tipout_percent = updates.tipoutPercent;
    if (updates.additionalTipout !== undefined) dbUpdates.additional_tipout = updates.additionalTipout;
    if (updates.additionalTipoutNote !== undefined) dbUpdates.additional_tipout_note = updates.additionalTipoutNote;
    if (updates.commission !== undefined) dbUpdates.commission = updates.commission;
    if (updates.mileage !== undefined) dbUpdates.mileage = updates.mileage;
    if (updates.flatRate !== undefined) dbUpdates.flat_rate = updates.flatRate;
    if (updates.eventCost !== undefined) dbUpdates.event_cost = updates.eventCost;
    
    // Industry-specific fields
    if (updates.tripCount !== undefined) dbUpdates.trip_count = updates.tripCount;
    if (updates.totalMiles !== undefined) dbUpdates.total_miles = updates.totalMiles;
    if (updates.tipsInApp !== undefined) dbUpdates.tips_in_app = updates.tipsInApp;
    if (updates.surgePeakEarnings !== undefined) dbUpdates.surge_peak_earnings = updates.surgePeakEarnings;
    if (updates.waitTimeMinutes !== undefined) dbUpdates.wait_time_minutes = updates.waitTimeMinutes;
    if (updates.deadheadMiles !== undefined) dbUpdates.deadhead_miles = updates.deadheadMiles;
    if (updates.platformName !== undefined) dbUpdates.platform_name = updates.platformName;
    if (updates.bonusesIncentives !== undefined) dbUpdates.bonuses_incentives = updates.bonusesIncentives;
    if (updates.servicesCount !== undefined) dbUpdates.services_count = updates.servicesCount;
    if (updates.retailSales !== undefined) dbUpdates.retail_sales = updates.retailSales;
    if (updates.productCommissionPercent !== undefined) dbUpdates.product_commission_percent = updates.productCommissionPercent;
    if (updates.productCommission !== undefined) dbUpdates.product_commission = updates.productCommission;
    if (updates.rebookingCount !== undefined) dbUpdates.rebooking_count = updates.rebookingCount;
    if (updates.roomServiceTips !== undefined) dbUpdates.room_service_tips = updates.roomServiceTips;
    if (updates.valetParkingTips !== undefined) dbUpdates.valet_parking_tips = updates.valetParkingTips;
    if (updates.minibarSales !== undefined) dbUpdates.minibar_sales = updates.minibarSales;
    if (updates.conciergeTips !== undefined) dbUpdates.concierge_tips = updates.conciergeTips;
    if (updates.bellhopTips !== undefined) dbUpdates.bellhop_tips = updates.bellhopTips;
    if (updates.housekeepingTips !== undefined) dbUpdates.housekeeping_tips = updates.housekeepingTips;
    if (updates.banquetTips !== undefined) dbUpdates.banquet_tips = updates.banquetTips;
    if (updates.spaTips !== undefined) dbUpdates.spa_tips = updates.spaTips;
    if (updates.poolTips !== undefined) dbUpdates.pool_tips = updates.poolTips;
    if (updates.frontDeskTips !== undefined) dbUpdates.front_desk_tips = updates.frontDeskTips;
    if (updates.hotelRoomNumber !== undefined) dbUpdates.hotel_room_number = updates.hotelRoomNumber;
    if (updates.classCount !== undefined) dbUpdates.class_count = updates.classCount;
    if (updates.personalTrainingSessions !== undefined) dbUpdates.personal_training_sessions = updates.personalTrainingSessions;
    if (updates.membershipSalesCommission !== undefined) dbUpdates.membership_sales_commission = updates.membershipSalesCommission;
    if (updates.supplementSales !== undefined) dbUpdates.supplement_sales = updates.supplementSales;
    if (updates.proceduresAssisted !== undefined) dbUpdates.procedures_assisted = updates.proceduresAssisted;
    if (updates.overtimeHoursWorked !== undefined) dbUpdates.overtime_hours_worked = updates.overtimeHoursWorked;
    if (updates.onCallHours !== undefined) dbUpdates.on_call_hours = updates.onCallHours;
    if (updates.patientCount !== undefined) dbUpdates.patient_count = updates.patientCount;
    if (updates.perDiemAmount !== undefined) dbUpdates.per_diem_amount = updates.perDiemAmount;
    if (updates.toolAllowance !== undefined) dbUpdates.tool_allowance = updates.toolAllowance;
    if (updates.hazardPay !== undefined) dbUpdates.hazard_pay = updates.hazardPay;
    if (updates.piecesCompleted !== undefined) dbUpdates.pieces_completed = updates.piecesCompleted;
    if (updates.pieceRate !== undefined) dbUpdates.piece_rate = updates.pieceRate;
    if (updates.invoiceNumber !== undefined) dbUpdates.invoice_number = updates.invoiceNumber;
    if (updates.retainerAmount !== undefined) dbUpdates.retainer_amount = updates.retainerAmount;
    if (updates.milestonePayment !== undefined) dbUpdates.milestone_payment = updates.milestonePayment;

    // When updating ANY earnings-related field (tips, hours), ensure hourly_rate is set from job
    // This requires individual updates to set correct hourly_rate per shift
    const needsHourlyRateCheck = (
      updates.hoursWorked !== undefined || 
      updates.cashTips !== undefined || 
      updates.creditTips !== undefined
    ) && updates.hourlyRate === undefined;

    if (needsHourlyRateCheck) {
      // Get all unique job IDs from the shifts
      const jobIds = [...new Set(shifts.map((s: any) => s.job_id).filter(Boolean))];
      
      // Fetch job hourly rates
      const { data: jobs } = await this.supabase
        .from("jobs")
        .select("id, hourly_rate")
        .in("id", jobIds);
      
      const jobRates: Record<string, number> = {};
      if (jobs) {
        jobs.forEach((j: any) => {
          if (j.hourly_rate && j.hourly_rate > 0) {
            jobRates[j.id] = j.hourly_rate;
          }
        });
      }

      // Update each shift individually with its job's hourly rate
      let updatedCount = 0;
      let hourlyRateAppliedCount = 0;
      let appliedHourlyRate = 0;
      
      for (const shift of shifts) {
        const shiftUpdate = { ...dbUpdates };
        // If shift has no hourly_rate (0 or null), get it from the job
        if ((!shift.hourly_rate || shift.hourly_rate === 0) && shift.job_id && jobRates[shift.job_id]) {
          shiftUpdate.hourly_rate = jobRates[shift.job_id];
          appliedHourlyRate = jobRates[shift.job_id];
          hourlyRateAppliedCount++;
        }
        
        const { error } = await this.supabase
          .from("shifts")
          .update(shiftUpdate)
          .eq("id", shift.id);
        
        if (!error) updatedCount++;
      }

      // Build informative message about what was done
      let message = `✅ Updated ${updatedCount} shifts successfully!`;
      if (hourlyRateAppliedCount > 0) {
        message += ` Also applied hourly rate of $${appliedHourlyRate}/hr from your job to ${hourlyRateAppliedCount} shifts that were missing it.`;
      }

      return {
        success: true,
        count: updatedCount,
        hourlyRateApplied: hourlyRateAppliedCount > 0,
        hourlyRate: appliedHourlyRate,
        message: message,
      };
    }

    // Standard bulk update (no hourly rate logic needed)
    const shiftIds = shifts.map((s: any) => s.id);
    const { error } = await this.supabase
      .from("shifts")
      .update(dbUpdates)
      .in("id", shiftIds);

    if (error) throw error;

    return {
      success: true,
      count: shifts.length,
      message: `✅ Updated ${shifts.length} shifts successfully!`,
    };
  }

  private async bulkDeleteShifts(args: any) {
    const { query, confirmed } = args;

    if (!confirmed) {
      throw new Error("Bulk deletes MUST be confirmed. Set confirmed=true only after user approval.");
    }

    // Build query (same as bulk edit)
    let queryBuilder = this.supabase
      .from("shifts")
      .select("*")
      .eq("user_id", this.userId);

    if (query.dateRange) {
      queryBuilder = queryBuilder
        .gte("date", query.dateRange.start)
        .lte("date", query.dateRange.end);
    }

    if (query.jobId) {
      queryBuilder = queryBuilder.eq("job_id", query.jobId);
    }

    const { data: shifts, error: findError } = await queryBuilder;
    if (findError) throw findError;

    // Calculate total income that will be lost
    let totalIncomeLost = 0;
    for (const s of shifts) {
      const tips = (s.cash_tips || 0) + (s.credit_tips || 0);
      const wages = (s.hourly_rate || 0) * (s.hours_worked || 0);
      totalIncomeLost += tips + wages;
    }

    // Delete shifts
    const shiftIds = shifts.map((s: any) => s.id);
    const { error } = await this.supabase.from("shifts").delete().in("id", shiftIds);

    if (error) throw error;

    return {
      success: true,
      count: shifts.length,
      totalIncomeLost: totalIncomeLost,
      message: `Deleted ${shifts.length} shifts (total income: $${totalIncomeLost.toFixed(2)}).`,
    };
  }

  private async searchShifts(args: any) {
    const { query } = args;

    let queryBuilder = this.supabase
      .from("shifts")
      .select("*")
      .eq("user_id", this.userId);

    if (query.dateRange) {
      queryBuilder = queryBuilder
        .gte("date", query.dateRange.start)
        .lte("date", query.dateRange.end);
    }

    if (query.jobId) {
      queryBuilder = queryBuilder.eq("job_id", query.jobId);
    }

    if (query.eventName) {
      queryBuilder = queryBuilder.ilike("event_name", `%${query.eventName}%`);
    }

    if (query.minAmount) {
      // Calculate total on the fly (can't filter by computed column)
      // We'll filter after fetch
    }

    if (query.maxAmount) {
      // Same - filter after fetch
    }

    if (query.hasNotes !== undefined) {
      if (query.hasNotes) {
        queryBuilder = queryBuilder.not("notes", "is", null);
      } else {
        queryBuilder = queryBuilder.is("notes", null);
      }
    }

    const { data: shifts, error } = await queryBuilder.order("date", { ascending: false });

    if (error) throw error;

    // Post-filter by amount if needed
    let filteredShifts = shifts;
    if (query.minAmount || query.maxAmount) {
      filteredShifts = shifts.filter((s: any) => {
        const tips = (s.cash_tips || 0) + (s.credit_tips || 0);
        const wages = (s.hourly_rate || 0) * (s.hours_worked || 0);
        const total = tips + wages;
        
        if (query.minAmount && total < query.minAmount) return false;
        if (query.maxAmount && total > query.maxAmount) return false;
        return true;
      });
    }

    return {
      success: true,
      count: filteredShifts.length,
      shifts: filteredShifts,
    };
  }

  private async getShiftDetails(args: any) {
    const { date, jobId } = args;

    let query = this.supabase
      .from("shifts")
      .select("*")
      .eq("user_id", this.userId)
      .eq("date", date);

    if (jobId) {
      query = query.eq("job_id", jobId);
    }

    const { data: shift, error } = await query.single();

    if (error || !shift) {
      throw new Error(`No shift found on ${date}`);
    }

    return {
      success: true,
      shift: shift,
    };
  }

  private async attachPhotoToShift(args: any) {
    const { shiftDate, photoId } = args;

    // TODO: Implement photo attachment logic
    // This requires photos table structure

    return {
      success: true,
      message: "Photo attachment feature coming soon",
    };
  }

  private async removePhotoFromShift(args: any) {
    const { shiftDate, photoId } = args;

    // TODO: Implement photo removal logic

    return {
      success: true,
      message: "Photo removal feature coming soon",
    };
  }

  private async getShiftPhotos(args: any) {
    const { shiftDate } = args;

    // TODO: Query photos table

    return {
      success: true,
      photos: [],
      message: "Photo retrieval feature coming soon",
    };
  }

  private async calculateShiftTotal(args: any) {
    const { shiftDate } = args;

    const { data: shift, error } = await this.supabase
      .from("shifts")
      .select("*")
      .eq("user_id", this.userId)
      .eq("date", shiftDate)
      .single();

    if (error || !shift) {
      throw new Error(`No shift found on ${shiftDate}`);
    }

    // Recalculate
    const totalTips = (shift.cash_tips || 0) + (shift.credit_tips || 0);
    const netTips = totalTips - (shift.tip_outs || 0);
    const hourlyWages = (shift.hourly_rate || 0) * (shift.hours_worked || 0);
    const totalIncome = hourlyWages + netTips;

    return {
      success: true,
      totalIncome: totalIncome,
      breakdown: {
        cashTips: shift.cash_tips,
        creditTips: shift.credit_tips,
        tipOuts: shift.tip_outs,
        netTips: netTips,
        hourlyWages: hourlyWages,
        totalIncome: totalIncome,
      },
    };
  }

  private async duplicateShift(args: any) {
    const { sourceDate, targetDate, copyPhotos = false } = args;

    // Get source shift
    const { data: sourceShift, error: findError } = await this.supabase
      .from("shifts")
      .select("*")
      .eq("user_id", this.userId)
      .eq("date", sourceDate)
      .single();

    if (findError || !sourceShift) {
      throw new Error(`No shift found on ${sourceDate}`);
    }

    // Create duplicate with new date (remove id and timestamps)
    const { id, created_at, updated_at, ...shiftData } = sourceShift;
    
    const { data: newShift, error: insertError } = await this.supabase
      .from("shifts")
      .insert({
        ...shiftData,
        date: targetDate,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return {
      success: true,
      message: `Duplicated shift from ${sourceDate} to ${targetDate}`,
      newShift: newShift,
    };
  }
}
