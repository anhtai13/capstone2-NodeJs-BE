import orderService from "../services/order.service.js";

const getListOrder = (req, res) => {
  orderService.getListOrder("No Data in database", (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const getOrderTotalPrice = (req, res) => {
  const { id } = req.params;
  orderService.getOrderTotalPrice(id, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

// const addOrder = (req, res) => {
//   const newOrder = req.body;
//   orderService.addOrder(newOrder, (err, result) => {
//     if (err) {
//       res.status(500).send({
//         errMessage: err.message,
//       });
//     } else {
//       res.status(200).send(result);
//     }
//   });
// };

const addOrder = (req, res) => {
  const newOrder = req.body;
  orderService.addOrder(newOrder, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};


const addOrderDetails = (req, res) => {
  const newOrderDetails = req.body;
  orderService.addOrderDetails(newOrderDetails, (err, result) => {
    if (err) {
      res.status(500).send({
        errMessage: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};


const getDetailOrder = (req, res) => {
  const { id } = req.params;
  orderService.getDetailOrder({ id }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};

const getDetailOrderByUserId = (req, res) => {
  const { id } = req.params;
  orderService.getDetailOrderByUserId({ user_id: id }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      res.status(200).send(result);
    }
  });
};


const updateOrder = (req, res) => {
  const orderUpdate = req.body;
  orderService.updateOrder(orderUpdate, (err, result) => {
    if (err) {
      res.status(500).send({
        errData: err.data,
        error: err.message,
      });
    } else {
      res.status(202).send("Success");
    }
  });
};

const deleteOrder = (req, res) => {
  const { id } = req.params;

  orderService.deleteOrder({ id }, (err, result) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      res.status(204).send("Success");
    }
  });
};

export default {
  getListOrder,
  addOrder,
  getDetailOrder,
  updateOrder,
  deleteOrder,
  getOrderTotalPrice,
  getDetailOrderByUserId,
  addOrderDetails,
};
