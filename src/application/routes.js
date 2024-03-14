import { Router } from "express";
import userController from "./controllers/user.controller.js";
import serviceController from "./controllers/service.controller.js";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";
import orderDetailController from "./controllers/orderDetail.controller.js";
import contactController from "./controllers/contact.controller.js";

const router = Router();

//Authentication
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// User management
router.get("/users", userController.searchUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getDetailUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Services management
router.get("/category", serviceController.getCategory);
router.get("/category/:category", serviceController.getServiceByCategory);
router.get("/services", serviceController.getListServices);
router.post("/services", serviceController.addService);
router.get("/services/:services_id", serviceController.getDetailService);
router.put("/services", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// Order management
router.get("/order", orderController.getListOrder);
router.get("/order_total/:id", orderController.getOrderTotalPrice);
router.post("/order", orderController.addOrder);
router.get("/order/:id", orderController.getDetailOrder);
router.get("/order_id/:id", orderController.getDetailOrderById);
router.put("/order", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);

// Order Details management
router.post("/order_details", orderDetailController.getListOrderDetail);
router.get("/order_details/:id", orderDetailController.getOrderDetailById);

// Contact management
router.get("/contact", contactController.getListContact);
router.get("/contact/:id", contactController.getDetailContact);
router.post("/contact", contactController.addContact);
router.put("/contact", contactController.updateContact);
router.delete("/contact/:id", contactController.deleteContact);
export default router;
