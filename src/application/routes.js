import { Router } from "express";
import userController from "./controllers/user.controller.js";
import serviceController from "./controllers/service.controller.js";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";
import orderDetailController from "./controllers/orderDetail.controller.js";
import contactController from "./controllers/contact.controller.js";
import uploadController from "./controllers/uploadFile.controller.js";
import changepasswordController from "./controllers/changepassword.controller.js";
import forgotpasswordController from './controllers/forgotpassword.controller.js';
import resetpasswordController from "./controllers/resetpassword.controller.js";
import employeeCodeController from "./controllers/employeeCode.controller.js";
import feedbackController from "./controllers/feedback.controller.js";

const router = Router();

//Authentication
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/loginEmployee", authController.login1);

//Chanege Password Authentication No OTP
router.put("/changePassword/:id", changepasswordController.changePassword);

//Forgot Password Authentication
router.post("/forgotpassword", forgotpasswordController.forgotPassword);

//Reset Password Authentication
router.put("/resetpassword", resetpasswordController.resetPassword);

//ForgotPassword App
router.post("/forgotPasswordApp", authController.forgotPasswordApp);

//ChangPassword App OTP
router.post("/changePasswordForgotApp", authController.changePasswordForgotApp);

//Resend Otp
router.post("/resendOTP", authController.resendOTP);

// User management
router.get("/users", userController.searchUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getDetailUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.put("/users/customer/:id", userController.updateInformationCustomer); //new router update information for customer

//Search History Employee
router.get("/services/searchOrderDetailServices", serviceController.searchOrderDetailsServices);

// Services management
router.get("/services/search", serviceController.searchServices); // new router search services
router.get("/category", serviceController.getCategory);
router.get("/category/:category", serviceController.getServiceByCategory);
router.get("/services", serviceController.getListServices);
router.post("/services", serviceController.addService);
router.get("/services/:services_id", serviceController.getDetailService);
router.put("/services", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);
// router.get("/services/search", serviceController.searchServices);

// Order management
router.get("/order", orderController.getListOrder); // get list order 

router.get("/order_total/:id", orderController.getOrderTotalPrice);


router.post("/order/addOrder", orderController.addOrder);

// add order_details
router.post("/order/addOrder_details", orderController.addOrderDetails);

router.get("/order/:id", orderController.getDetailOrder);

// get detail order and orders from user_id
router.get("/order_id/:id", orderController.getDetailOrderByUserId);

router.put("/order", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);

// Order Details management
router.get("/order_details", orderDetailController.getListOrderDetail);

router.get("/order_details/:id", orderDetailController.getOrderDetailById);

//Update Status_ID Orders
router.put('/orders/:order_id/update-status', serviceController.updateOrderStatus);

//Getlist Order By EmployeeCode
router.get("/orders/employee/:employeeCode", orderController.getListOrderByEmployeeCode);

// Schudle WorkDate
router.get('/orders/:workDate/:employeeCode', orderController.getListOrderByDateController);

router.get("/employee_debt_history", employeeCodeController.getListDebtHistory);

router.get("/employee_and_Receipt", employeeCodeController.getListEmployeeReceipt);
router.get("/employee_and_Receipt/:id", employeeCodeController.getListEmployeeReceiptId);
router.post("/add_receipt", employeeCodeController.AddEmployeeDebt);


// New router for getStatusIdByEmployeeCodeController
router.get("/employee/status/:employeeCode", orderController.getStatusIdByEmployeeCodeController);

// Contact management
router.get("/contact", contactController.getListContact);
router.get("/contact/:id", contactController.getDetailContact);
router.post("/contact", contactController.addContact);
router.put("/contact", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);

//feedback
router.post("/feedback", feedbackController.addFeedback);
router.get("/feedback/search", feedbackController.searchFeedbacks);
router.get("/feedback/:id", feedbackController.getFeedbackDetail);
router.put("/feedback/:id", feedbackController.updateFeedback);
router.delete("/feedback/:id", feedbackController.deleteFeedback);
router.get("/feedbacks/all", feedbackController.getAllFeedbacks);

// upload file
router.post(
  "/upload",
  uploadController.uploadImage,
  uploadController.addServices
);
router.put(
  "/upload",
  uploadController.uploadImage,
  uploadController.editService
);

export default router;
