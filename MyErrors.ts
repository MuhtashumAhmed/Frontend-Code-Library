export const MyErrors = {
  error_occurred: "An unexpected error occurred",
  validation_failed: "Validation failed",
  resource_already_exists: "Resource already exists",
  internal_server_error: "Internal server error",
  operation_success: "Operation completed successfully",
  resource_listed_success: "Resources listed successfully",
  resource_updated_success: "Resource updated successfully",
  resource_deleted_success: "Resource deleted successfully",
  resource_created_success: "Resource created successfully",
  success: "Success",
  email_required: "Email address is required",
  email_required_for_superuser: "Email is required for superuser",
  password_required_for_normal_auth:
    "Password is required for normal authentication",
  password_min_length_error: "Password must meet minimum length requirement",
  email_already_exists_error: "Email already exists",
  user_not_found: "User with this email not exist.",
  user_already_verified: "User already verified",
  otp_sent_success: "OTP sent successfully",
  otp_generation_fail: "Failed to generate OTP",
  email_dispatch_fail: "Failed to send email",
  incorrect_parameters: "Incorrect parameters provided",
  password_reset_success: "Password reset successful",
  account_temporarily_locked: "Account temporarily locked",
  invalid_or_expired_otp: "Invalid or expired OTP",
  email_verified_success: "Email verified successfully",
  user_not_verified: "User not verified",
  authorization_header_missing: "Authorization header missing",
  authorization_header_invalid_format: "Invalid authorization header format",
  invalid_token_payload: "Invalid token payload",
  invalid_credentials: "Invalid credentials",
  login_success: "Login successful",
  unavailable_dates_retrieved_success:
    "Unavailable dates retrieved successfully",
  available_and_booked_slots_retrieved_success:
    "Available and booked slots retrieved successfully",
  subscription_created_success: "Subscription created successfully",
  booking_created_success: "Booking created successfully",
  conference_rooms_retrieved_success: "Conference rooms retrieved successfully",
  payment_confirmation_submitted_success:
    "Payment confirmation submitted successfully",
  start_date_before_or_equal_end_date:
    "Start date must be before or equal to end date",
  conference_room_not_found: "Conference room not found",
  no_conference_rooms_found: "No conference rooms found",
  conference_room_not_available: "Conference room not available",
  cannot_book_past_dates: "Cannot book past dates",
  invalid_price_id: "Invalid price ID",
  inactive_plan_for_price: "Plan is inactive for this price",
  invalid_or_inactive_addon_price_ids: "Invalid or inactive addon price IDs",
  payment_proof_required_bank_transfer_zelle:
    "Payment proof required for bank transfer or Zelle",
  cheque_arrival_date_required: "Cheque arrival date required",
  booking_start_date_before_or_equal_end_date:
    "Booking start date must be before or equal to end date",
  booking_slots_required_for_hourly:
    "Booking slots required for hourly booking",
  booking_slots_same_length_required: "All booking slots must be same length",
  slot_end_time_greater_than_start_time:
    "Slot end time must be greater than start time",
  booking_slots_cannot_overlap: "Booking slots cannot overlap",
  hourly_bookings_same_start_end_date:
    "Hourly bookings must have same start and end date",
  selected_date_reserved_full_day: "Selected date is reserved full day",
  selected_slot_already_booked: "Selected slot already booked",
  booking_slots_only_for_hourly:
    "Booking slots only allowed for hourly bookings",
  full_day_range_already_booked: "Full day range already booked",
  full_day_unavailable_when_hourly_exists:
    "Full day unavailable when hourly bookings exist",
  invalid_conference_room_id: "Invalid conference room ID",
  booking_request_received_pending_review:
    "Booking request received, pending review",
  new_booking_request_submitted: "New booking request submitted",
  subscription_id_not_found: "Subscription ID not found",
  booking_id_not_found: "Booking ID not found",
  subscription_or_booking_id_required:
    "Either subscription ID or booking ID is required",
  only_one_of_subscription_or_booking_id:
    "Provide only one of subscription ID or booking ID",
  payment_confirmation_already_exists_subscription:
    "Payment confirmation already exists for this subscription",
  payment_confirmation_already_exists_booking:
    "Payment confirmation already exists for this booking",
  payment_received_under_review: "Payment received, under review",
  new_payment_confirmation_submitted: "New payment confirmation submitted",
  inquiry_thank_you: "Thank you for your inquiry",
  tour_schedule_thank_you: "Thank you for scheduling a tour",
  coworking_inquiry_thank_you: "Thank you for your coworking inquiry",
  private_room_quote_thank_you: "Thank you for requesting a private room quote",
  new_inquiry_from_name: "New inquiry received",
  time_wrong_format: "Invalid time format",
  account_already_exists: "Account already exists",
};